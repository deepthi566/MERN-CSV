import express from "express";
import multer from "multer";
import { parse } from "csv-parse/sync";
import Agent from "../model/Agent.js";
import ListItem from "../model/ListItem.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Memory storage for file upload
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const allowed = [
      "text/csv",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];
    if (
      !allowed.includes(file.mimetype) &&
      !file.originalname.match(/\.(csv|xlsx|xls)$/i)
    ) {
      return cb(new Error("Only csv, xlsx, or xls files allowed"));
    }
    cb(null, true);
  },
});

// POST /api/upload - upload CSV and distribute tasks
router.post("/", auth, upload.single("file"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ msg: "No file uploaded" });

    const content = req.file.buffer.toString("utf8");
    const records = parse(content, { columns: true, skip_empty_lines: true });

    const expected = ["FirstName", "Phone", "Notes"];
    const header = Object.keys(records[0] || {});
    for (const col of expected) {
      if (!header.includes(col))
        return res.status(400).json({ msg: `Missing column: ${col}` });
    }

    // Clear previous ListItems
    await ListItem.deleteMany({});

    // Fetch first 5 agents
    const agents = await Agent.find();
    if (agents.length < 5)
      return res.status(400).json({ msg: "At least 5 agents required" });
    const selectedAgents = agents.slice(0, 5);

    // Round-robin distribution
    let agentIndex = 0;
    const savedItems = [];

    for (const r of records) {
      const item = new ListItem({
        firstName: r.FirstName,
        phone: String(r.Phone),
        notes: r.Notes,
        uploadedBy: req.user.id,
        assignedTo: selectedAgents[agentIndex]._id,
      });
      await item.save();
      savedItems.push(item);
      agentIndex = (agentIndex + 1) % selectedAgents.length;
    }

    res.json({
      msg: "Uploaded and distributed successfully",
      totalItems: savedItems.length,
    });
  } catch (err) {
    if (err.message.includes("Only csv"))
      return res.status(400).json({ msg: err.message });
    console.error(err);
    res.status(500).json({ msg: "Server error: " + err.message });
  }
});

// GET /api/upload/distributed - fetch tasks grouped by agent
router.get("/distributed", auth, async (req, res) => {
  try {
    const agents = await Agent.find().limit(5);
    const result = {};

    for (let agent of agents) {
      const items = await ListItem.find({ assignedTo: agent._id });
      result[agent._id] = { agent, items };
    }

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

export default router;

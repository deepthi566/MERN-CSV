import express from "express";
import bcrypt from "bcryptjs";
import Agent from "../model/Agent.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Add agent
router.post("/", auth, async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;
    let agent = await Agent.findOne({ email });
    if (agent) return res.status(400).json({ msg: "Agent already exists" });

    const hashed = await bcrypt.hash(password, 10);
    agent = new Agent({ name, email, mobile, password: hashed });
    await agent.save();
    res.json(agent);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// Get all agents
router.get("/", auth, async (req, res) => {
  try {
    const agents = await Agent.find().select("-password");
    res.json(agents);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

export default router;

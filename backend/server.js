import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import agentRoutes from "./routes/agents.js";
import uploadRoutes from "./routes/upload.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Optional: serve uploaded files if using disk storage
// import path from "path";
// app.use("/uploads", express.static(path.join(path.resolve(), "uploads")));

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ MongoDB connected!");
    app.listen(process.env.PORT || 5000, () =>
      console.log(`Server running on port ${process.env.PORT || 5000}`)
    );
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/agents", agentRoutes);
app.use("/api/upload", uploadRoutes);

app.get("/", (req, res) => res.send("API is running..."));

import mongoose from "mongoose";

const ListItemSchema = new mongoose.Schema({
  firstName: String,
  phone: String,
  notes: String,
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Agent",
    default: null,
  },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

export default mongoose.model("ListItem", ListItemSchema);

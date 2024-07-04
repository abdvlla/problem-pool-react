import mongoose from "mongoose";

const staffSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

export const Staff = mongoose.model("Staff", staffSchema);

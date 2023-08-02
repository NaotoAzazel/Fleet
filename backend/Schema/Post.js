import mongoose from "mongoose";

const Post = new mongoose.Schema({
  name: { type: String, required: true },
  takeBy: { type: String },
  color: { type: String, required: true },
  plate: { type: String, required: true },
  image: { type: String },
}, { timestamps: true });

export default mongoose.model("Post", Post);
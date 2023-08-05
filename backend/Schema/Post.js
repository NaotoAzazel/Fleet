import mongoose from "mongoose";

const Post = new mongoose.Schema({
  name: { type: String, required: true },
  takeBy: { type: String, required: true },
  color: { type: String, required: true },
  plate: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String },
}, { timestamps: true });

export default mongoose.model("Post", Post);
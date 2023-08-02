import Router from "express";
import Post from "./Schema/Post.js";

const router = new Router();

router.post("/transport", async(req, res) => {
  const { name, takeBy, plate, color, image } = req.body;
  const post = await Post.create({ name, takeBy, plate, color, image });
  res.status(200).json(post);
});
router.get("/transports");
router.get("/transport/:id");
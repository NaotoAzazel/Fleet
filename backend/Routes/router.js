import Router from "express";
import PostController from "../PostController/PostController.js";

const router = new Router();

router.post("/transport", PostController.create);
router.get("/transports", PostController.getAll);
router.get("/transport/:id", PostController.getOne);
router.put("/transport/", PostController.update);
router.get("/categories/", PostController.getCategories);
router.get("/colors/", PostController.getColors);

export default router;
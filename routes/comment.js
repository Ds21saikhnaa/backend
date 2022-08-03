import { Router } from "express";
import { protect } from "../middleware/protect";
import {newComment, getComments} from "../controller/comments";
const commentRouter = Router();
commentRouter.use(protect);
commentRouter.route("/").get(getComments);
commentRouter.route("/:id/newcomment").post(newComment);

export default commentRouter;

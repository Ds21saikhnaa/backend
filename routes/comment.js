import { Router } from "express";
import { protect } from "../middleware/protect";
import {newComment, getComments, updateComment, deleteComment} from "../controller/comments";
const commentRouter = Router();
commentRouter.use(protect);
commentRouter.route("/:id").get(getComments);
commentRouter.route("/:id/newcomment").post(newComment);
commentRouter.route("/:id/updateComment").put(updateComment);
commentRouter.route("/:id/deleteComment").delete(deleteComment);

export default commentRouter;

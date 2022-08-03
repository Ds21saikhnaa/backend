import { Router } from "express";
import { getPosts, newPost, uploadPhoto } from "../controller/posts";
import { protect } from "../middleware/protect";
const postsRouter = Router();
postsRouter.use(protect);
postsRouter.route("/").get(getPosts);
postsRouter.route('/new').post(newPost);
postsRouter.route('/:id/photo').put(uploadPhoto);

export default postsRouter;
import { Router } from "express";
import { getPosts, newPost, uploadPhoto,deletePost, updatePost } from "../controller/posts";
import { protect } from "../middleware/protect";
const postsRouter = Router();
postsRouter.use(protect);
postsRouter.route("/").get(getPosts);
postsRouter.route('/new').post(newPost);
postsRouter.route('/:id/photo').put(uploadPhoto);
postsRouter.route('/:id/deletePost').delete(deletePost);
postsRouter.route('/:id/updatePost').put(updatePost);

export default postsRouter;
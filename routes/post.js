import { Router } from "express";
import { getPosts, newPost } from "../controller/posts";
import { protect } from "../middleware/protect";
const postsRouter = Router();
postsRouter.use(protect);
postsRouter.route("/").get(getPosts);
postsRouter.route('/new').post(newPost);

export default postsRouter;
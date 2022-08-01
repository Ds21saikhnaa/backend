import { Router } from "express";
import { getPosts, newPost } from "../controller/posts";
const postsRouter = Router();

postsRouter.route("/").get(getPosts);
postsRouter.route('/new').post(newPost);

export default postsRouter;
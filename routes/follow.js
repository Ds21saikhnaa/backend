import { Router } from "express";
import { protect } from "../middleware/protect";
import { follow, following } from "../controller/follow";
const followRouter = Router();

followRouter.use(protect);
followRouter.route("/").post(follow);
followRouter.route("/list").post(following);

export default followRouter;
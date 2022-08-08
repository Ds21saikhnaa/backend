import { Router } from "express";
import { protect } from "../middleware/protect.js";
import {userRegister, userLogin, deleteUser, getUsers} from "../controller/users.js";
const usersRouter = Router();
usersRouter.route('/register').post(userRegister);
usersRouter.route('/login').post(userLogin);
usersRouter.route("/:id/deleteaccount").post(deleteUser); 
usersRouter.route('/').get(protect,getUsers);
export default usersRouter;
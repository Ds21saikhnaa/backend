import { Router } from "express";
import {userRegister, userLogin, getBla, deleteUser} from "../controller/users.js";
const usersRouter = Router();
usersRouter.route('/').get(getBla);
usersRouter.route('/register').post(userRegister);
usersRouter.route('/login').post(userLogin);
usersRouter.route("/:id/deleteaccount").post(deleteUser); 
export default usersRouter;
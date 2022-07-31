import { Router } from "express";
// , getUser, getUsers, updateUser, deleteUser, createUser, forgotPassword, resetPassword
import {userRegister, userLogin} from "../controller/users.js";
const usersRouter = Router();

usersRouter.route('/register').post(userRegister);
usersRouter.route('/login').post(userLogin);
  
  
// usersRouter.patch('/profile/:id', async(req, res) => {
//     const id = req.params.id;
//     console.log(req.body);
//     const user = await User.findByIdAndUpdate(id,req.body);
//     res.send({
//         create: user,
//     });
// });
export default usersRouter;
import asyncHandler from "express-async-handler";
import { User } from "../models/User.js";
import { MyError } from "../utils/myError.js";
//register
export const userRegister = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);
  const token = user.getJsonWebToken();
  res.status(200).json({
    success: true,
    user: user,
    token,
  });
});

//login
export const userLogin = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  //orolt shalgana
  if (!email || !password) {
    throw new MyError("email bolon nuuts ugee damjiilna uu!", 404);
  }
  //tuhain hereglegchig haina
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new MyError("email bolon nuuts ugee zow oruulna uu!", 401);
  }
  const pass = await user.checkPassword(password);

  if (!pass) {
    throw new MyError("email bolon nuuts ugee zow oruulna uu!", 401);
  }
  res.status(200).json({
    success: true,
    token: user.getJsonWebToken(),
    user: user,
  });
});

//buh user-iig awah api
export const getUsers = asyncHandler(async (req, res, next) => {
  const user = await User.find();
  console.log(user);
  // const token = user.getJsonWebToken();
  res.status(200).json({
    success: true,
    user: user,
  });
});

//delete user account
export const deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    throw new MyError("iim hereglegch oldsongui!", 401);
  }
  user.remove();
  res.status(200).json({
    success: true,
  });
});

//user profile image hiine
export const proImageUpload = () => {};

import asyncHandler from "express-async-handler"
import { Post } from "../models/Post";
import { MyError } from "../utils/myError.js";

export const newPost = asyncHandler(async( req, res, next) => {
    const post = await Post.create(req.body);
    res.status(200).json({
        success: true,
        post: post,
    });
});

export const getPosts = asyncHandler(async( req, res, next) => {
    const post = await Post.find();
    res.status(200).json({
        success: true,
        post: post,
    });
});
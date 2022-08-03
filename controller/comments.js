import asyncHandler from "express-async-handler";
import { MyError } from "../utils/myError.js";
import { Comment, Post } from "../models/Post.js";

export const newComment = asyncHandler(async( req, res, next) => {
    const post = await Post.findById(req.params.id);
    if(!post){
        throw new MyError("iim post bhgui bn!", 404);
    }
    const result = await post.comments.push(req.body);
    await post.save()
    res.status(200).json({
        success: true,
        result
    });
});

export const getComments = asyncHandler(async(req, res, next) => {
    const comments = await Comment.find({});
    res.status(200).json({
        success: true,
        comments
    })
})
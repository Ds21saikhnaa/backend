import asyncHandler from "express-async-handler";
import { MyError } from "../utils/myError.js";
import { Comment, Post } from "../models/Post.js";

//getComment
export const getComments = asyncHandler(async(req, res, next) => {
    const post = await Post.findById(req.params.id);
    if(!post){
        throw new MyError("iim post bhgui bn!", 404);
    };

    const comments = await post.comments;
    res.status(200).json({
        success: true,
        comments
    });
});

//newComment 
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


//update comment
export const updateComment = asyncHandler(async(req, res, next) => {
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

//update comment
export const deleteComment = asyncHandler(async(req, res, next) => {
    // const post = await Post.findById(req.params.id);
    // if(!post){
    //     throw new MyError("iim post bhgui bn!", 404);
    // }
    const result = await Post.comments.id(req.params.id).remove();
    await result.save()
    res.status(200).json({
        success: true,
        result
    });
});
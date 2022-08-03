import asyncHandler from "express-async-handler"
import { Post } from "../models/Post";
import { MyError } from "../utils/myError.js";
import path from "path";

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

export const uploadPhoto = asyncHandler(async( req, res, next) => {
    const post = await Post.findById(req.params.id);
    if(!post){
        throw new MyError("iim post bhgui bn!", 404);
    }

    const file = req.files.file;
    if(!file.mimetype.startsWith("image")){
        throw new MyError(`ta zurag upload hiine uu!`, 400);
    }
    
    if(file.size > process.env.MAX_UPLOAD_FILE_SIZE){
        throw new MyError(`tanii zuragni hemjee hetersen bn!`, 400);
    }

    file.name = `photo_${req.params.id}${path.parse(file.name).ext}`;

    file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, err => {
        if(err){
            throw new MyError(`file huulahad aldaa garlaa!`, 400);
        }
        post.image = file.name;
        post.save();
        res.status(200).json({
            success: true,
            data: file.name,
        })
    })
});

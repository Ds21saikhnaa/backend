import asyncHandler from "express-async-handler"
import { Post } from "../models/Post";
import { Follow } from "../models/Follow";
import { TimeLine } from "../models/TimeLine";
import { MyError } from "../utils/myError.js";
import path from "path";
import { time } from "console";
//getPost 
export const getPosts = asyncHandler(async( req, res, next) => {
    const post = await Post.find().populate("createUser").lean();
    res.status(200).json({
        success: true,
        count: post.length,
        post: post,
    });
});
//new post
export const newPost = asyncHandler(async( req, res, next) => {
    const userId = req.userId;
    const post = await Post.create({...req.body, createUser:userId});
    const followers = await Follow.find({
        follower: userId,
      }).lean();
      followers.forEach(async (user) => {
        TimeLine.create({
            follower: user._id,
            following: userId,
            post: post._id,
        //   following: user._id,
        //   follower: userId,
        //   post: post._id,
        });
      });
    res.status(200).json({
        success: true,
       post: post
    });
});
//getTimeLine
export const getTimeline = async (req, res) => {
    const userId = req.userId;
    const timelines = await TimeLine.find({
      following: userId,
    })
      .populate("following")
      .populate("post")
      .lean();

      res.status(200).send({
        success: true,
        count: timelines.length,
        data: timelines,
      });
    };
//delete post
export const deletePost = asyncHandler(async(req, res, next) => {
    const post = await Post.findById(req.params.id);
    if(!post){
        throw new MyError("iim post bhgui bn!", 404);
    }
    post.remove();
    res.status(200).json({
        success: true
    });
});

//update post
export const updatePost = asyncHandler(async(req,res,next) => {
    const post = await Post.findById(req.params.id);
    if(!post){
        throw new MyError("iim post bhgui bn!", 404);
    }
    for(let attr in req.body){
        post[attr] = req.body[attr];
    }
    await post.save();
    res.status(200).json({
        success: true,
        data: post
    })
})
//upload photo and video
export const uploadPhoto = asyncHandler(async( req, res, next) => {
    const post = await Post.findById(req.params.id);

    if(!post){
        throw new MyError("iim post bhgui bn!", 404);
    }

    const file = req.files.file
    if(!file.length){
        const type = file.mimetype.split("/")[0];
        if(!file.mimetype.startsWith("image") && !file.mimetype.startsWith("video")){
            throw new MyError(`ta zurag upload hiine uu!`, 400);
        }
        
        if(file.size > process.env.MAX_UPLOAD_FILE_SIZE){
            throw new MyError(`tanii zuragni hemjee hetersen bn!`, 400);
        }

        file.name = `${type}_${req.params.id}${path.parse(file.name).ext}`;

        await file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async(err) => {
            if(err){
                throw new MyError(`file huulahad aldaa garlaa!`, 400);
            }
        });
        post.image = file.name;
        post.photoUrl = `http://localhost:8000/${file.name}`;
    }
    else{
            for (const property in file) {
                const files = file[property];
            if(!files.mimetype.startsWith("image") && !files.mimetype.startsWith("video")){
                throw new MyError(`ta zurag upload hiine uu!`, 400);
            }
            
            if(files.size > process.env.MAX_UPLOAD_FILE_SIZE){
                throw new MyError(`tanii zuragni hemjee hetersen bn!`, 400);
            }
        
            const type = files.mimetype.split("/")[0];
            files.name = `${type}_${req.params.id}${property}${path.parse(files.name).ext}`;
            await files.mv(`${process.env.FILE_UPLOAD_PATH}/${files.name}`, async(err) => {
                if(err){
                    throw new MyError(`file huulahad aldaa garlaa!`, 400);
                }
            })
                await post.image.push(files.name);
                await post.photoUrl.push(`http://localhost:8000/${files.name}`);
            }
    }
    await post.save();
        res.status(200).json({
            success: true,
            file: post.image,
            url: post.photoUrl
        })
});

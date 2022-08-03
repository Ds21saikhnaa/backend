import mongoose from "mongoose";
const { Schema } = mongoose;

const commentSchema = new Schema(
    {
    comment: {
        type: String,
        maxlength: [250, "comment-iin urt deed tal n 250 temdegt bh ystoi."],
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        ref:"User",
        required: true
    }
    },{ timestamps: true })
const PostSchema = new Schema({
    image: {
        type: String,
    },
    description: {
        type: String
    },
    createUser:{
        type: mongoose.Schema.ObjectId,
        ref:"User",
        required: true
    },
    comments: {
        type:[commentSchema],
        default: []
    }
},{ timestamps: true }
);

export const Post = mongoose.model("Post", PostSchema);
export const Comment = mongoose.model("Comment", commentSchema);
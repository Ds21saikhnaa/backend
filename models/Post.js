import mongoose from "mongoose";
const { Schema } = mongoose;
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
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

export const Post = mongoose.model("Book", PostSchema);
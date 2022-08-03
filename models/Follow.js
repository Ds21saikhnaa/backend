import mongoose from "mongoose";
const { Schema } = mongoose;

const followSchema = new Schema(
    {
        follower: {
            type: mongoose.Schema.ObjectId,
            ref:"User",
            required: true
        },
        following: {
            type: mongoose.Schema.ObjectId,
            ref:"User",
            required: true
        }
    },
    {
        timestamps: true,
    }
);

export const Follow = mongoose.model("Follow", followSchema);
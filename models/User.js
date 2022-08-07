import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
        type:String,
        required: [true, "user name-ee oruulna uu!!!"],
    },
    email: {
        type: String,
        required: [true, "hereglegchiin email zaawal oruulna uu!"],
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "email hayg buruu bn!"]
    },
    password:{
        type:String,
        minlength: 4,
        required: [true, "nuuts ugee oruulna uu!"],
        select: false
    },
    phone: Number,
    gender: String,
    photo :{
        type: String,
        default: "no-photo.jpg",
    },
    location: String,
    bio: String,
    followers:{
        type: Number,
        default: 0
    },
    following:{
        type: Number,
        default: 0
    },
    posts:{
        type: Number,
        default: 0
    },
},{timestamps: true}
);

UserSchema.pre("save", async function(next) {
    // if(!this.isModified("password")) next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.pre("remove",async function (next){
    await this.model("Post").deleteMany({createUser: this._id})
    next();
});

UserSchema.methods.getJsonWebToken = function(){
    const token = jwt.sign({id: this._id, role: this.name}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRESIN
    });
    return token;
};

UserSchema.methods.checkPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}

export const User = mongoose.model("User", UserSchema);
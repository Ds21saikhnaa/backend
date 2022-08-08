import fs from "fs";
import mongoose from "mongoose";
import colors from "colors";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from 'url';
// import {Post} from "./models/Post";
// import {User} from "./models/User.js";
// import {Follow} from "./models/Follow.js";
dotenv.config({path: "./config/config.env"});

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
      //useCreateIndex: true,
    //useFindAndModify: false,
    useUnifiedTopology: true,
});
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const user = JSON.parse(
    fs.readFileSync(__dirname + "/data/user.js", "utf-8")
);


const post = JSON.parse(
    fs.readFileSync(__dirname + "/data/post.js", "utf-8")
);

const follow = JSON.parse(
    fs.readFileSync(__dirname + "/data/follow.js", "utf-8")
);

// const comment = JSON.parse(
//     fs.readFileSync(__dirname + "/data/follow.js", "utf-8")
// );

const read = async() => {
    try{
        console.log("import is done...".green.inverse);
    }catch (err){
        console.log(err);
    }
}
// const importData = async() => {
//     try{
//         await User.create(user);
//         await Post.create(post);
//         await Follow.create(follow);
//         console.log("import is done...".green.inverse);
//     }catch (err){
//         console.log(err);
//     }
// };
// const deleteData = async() => {
//     try{
//         await User.deleteMany(user);
//         await Post.deleteMany(post);
//         await Follow.deleteMany(follow);
//         console.log("delete is done...".green.inverse);
//     }catch (err){
//         console.log(err.red.inverse);
//     }
// };

// if(process.argv[2] === "-i") importData();
// else if(process.argv[2] === "-d") deleteData();
console.log(post);
if(process.argv[2] === "-i") read();
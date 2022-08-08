import express from 'express';
import  dotenv from "dotenv";
import fileUpload from 'express-fileupload';
import {connectDB} from "./config/db.js";
import path from 'path';
import usersRouter from './routes/user';
import postsRouter from './routes/post'; 
import commentRouter from './routes/comment'; 
import followRouter from './routes/follow.js';
import colors from "colors";
import { errorHandler } from './middleware/errorHandler.js';

//tohirgoog duudah
const app = express();
dotenv.config({path: './config/config.env'});
connectDB();

app.use(express.json());
app.use(fileUpload());
app.use(express.static('./public/uploads'));
app.use("/api/v1/users/",usersRouter);
app.use("/api/v1/post/", postsRouter);
app.use("/api/v1/comment/", commentRouter);
app.use("/api/v1/follow/", followRouter);
app.use(errorHandler);


app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`.underline.yellow.bold)
});
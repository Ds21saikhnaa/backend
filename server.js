import express from 'express';
import  dotenv from "dotenv";
import {connectDB} from "./config/db.js";
import usersRouter from './routes/user';
import postsRouter from './routes/post'; 
import colors from "colors";
import { errorHandler } from './middleware/errorHandler.js';

//tohirgoog duudah
const app = express();
dotenv.config({path: './config/config.env'});
connectDB();

app.use(express.json());
app.use("/api/v1/users/",usersRouter);
app.use("/api/v1/post/", postsRouter);
app.use(errorHandler);


app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`.underline.yellow.bold)
});
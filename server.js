const express = require('express');
const app = express();
const dotenv = require("dotenv");
const connectDB = require('./config/db');
const mongoose = require("mongoose");
const MONGODB_URI="mongodb+srv://dashmandalsaikhanbileg:amazon@testamazon.4lbhbua.mongodb.net/?retryWrites=true&w=majority";
const User = require("./models/User");

//tohirgoog duudah
dotenv.config({path: './config/config.env'});

connectDB();
mongoose.connect(MONGODB_URI);

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("Connected");
})

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.post('/profile', async(req, res) => {
    const user = new User({
        ...req.body
    }).save();
    // const user = await User.create(req.body)
    res.send({
        create: user,
    });
});


app.patch('/profile/:id', async(req, res) => {
  const id = req.params.id;
  console.log(req.body);
  const user = await User.findByIdAndUpdate(id,req.body);
  res.send({
      create: user,
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
});
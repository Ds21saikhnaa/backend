const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    name: String,
    email: String,
    phone: Number,
    gender: String,
    image: String,
    createdAt: {type: Date, default: Date.now},
    location: String,
})

const User = mongoose.model("users", userSchema);
module.exports = User;
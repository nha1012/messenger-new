import mongoose from "mongoose";
let userModel = new mongoose.Schema({
  name : String,
  old:Number,
  role:{
    type:String,
    default:"null"
  }
})
module.exports = mongoose.model("user", userModel);
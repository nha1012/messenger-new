import mongoose from 'mongoose'
let notificationSchema= new mongoose.Schema({
  sender:{
    id:String,
    userName:String,
    avatar:String
  },
  receiver:{
    id:String,
    userName:String,
    avatar:String
  },
  type:String,
  content:String,
  isread:{type:Boolean,default:false},
  createdAt:{type:Number,default:Date.now}
})
module.exports = mongoose.model('notificationSchema', notificationSchema);
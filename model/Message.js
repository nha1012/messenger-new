import mongoose from 'mongoose';
let messageSchema = new mongoose.Schema({
  sender:{id:String,userName:String,avatar:String},
  receiver:{id:String,userName:String,avater:String},
  text:String,
  file:{date:Buffer,contentType:Buffer,fileName:String},
  createdAt:{type:Number,default:Date.now},
  updatedAt:{type:Number,default:null},
  deletedAt:{type:Number,default:null}
})
module.exports = mongoose.model('message',messageSchema);
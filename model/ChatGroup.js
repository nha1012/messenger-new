import mongoose from 'mongoose'
mongoose.set('useFindAndModify', false);
let chatGroup = new mongoose.Schema({
  name:String,
  userAmount:{type:Number,min:3},
  messagesAmount:{type:Number, default:0},
  userId:String,
  member:[{userId:String}],
  createdAt:{type:Number,default:Date.now},
  updatedAt:{type:Number,default:null},
  deletedAt:{type:Number,default:null}
})
module.exports = mongoose.model('chatGroup',chatGroup)
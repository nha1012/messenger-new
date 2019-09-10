import mongoose from 'mongoose';
mongoose.set('useFindAndModify', false);
let messageSchema = new mongoose.Schema({
  senderId:String,
  receiverId:String,
  conversationType: String,
  messageType:String,
  sender:{id:String,userName:String,avatar:String},
  receiver:{id:String,userName:String,avater:String},
  text:String,
  file:{date:Buffer,contentType:Buffer,fileName:String},
  createdAt:{type:Number,default:Date.now},
  updatedAt:{type:Number,default:null},
  deletedAt:{type:Number,default:null}
})
messageSchema.statics={
  findMessages(senderId,receiverId){
    return this.find({
      $or:[
        {
          $and:[
            {'senderId':senderId},
            {'receiverId':receiverId}
          ]
        },
        {
          $and:[
            {'receiverId':senderId},
            {'senderId':receiverId}
          ]
        }
      ]
    }).exec()
  }
}
const MESSAGE_CONVERSATION_TYPES={
  PERSONAL:"personal",
  GROUP:"group"
}
const MESSAGE_TYPES={
  TEXT:"text",
  IMAGE:"image",
  FILE:"file"
}
module.exports = {
  model:mongoose.model('message',messageSchema),
  conversationTypes:MESSAGE_CONVERSATION_TYPES,
  messageTypes:MESSAGE_TYPES
};
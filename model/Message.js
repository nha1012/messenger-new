import mongoose from 'mongoose';
mongoose.set('useFindAndModify', false);
let messageSchema = new mongoose.Schema({
  senderId:String,
  receiverId:String,
  conversationType: String,
  messageType:String,
  sender:{id:String,name:String,avatar:String},
  receiver:{id:String,name:String,avatar:String},
  text:String,
  isRead:{type:Boolean,default:false},
  file:{date:Buffer,contentType:Buffer,fileName:String},
  createdAt:{type:Number,default:Date.now()},
  updatedAt:{type:Number,default:null},
  deletedAt:{type:Number,default:null}
})
messageSchema.statics={
  createNewMessageText(item){
     return this.create(item);
    },
    findMessagesUser(senderId,receiverId,limit){
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
    }).sort({ 'createdAt': -1 }).limit(limit).exec()
  },
  findMessagesGroup(receiverId,limit){
    return this.find( 
        {'receiverId':receiverId}
      ).sort({ 'createdAt': -1 }).limit(limit).exec()
  },
  markAllIsReadUser(id){
    return this.updateMany({'senderId':id,'conversationType':MESSAGE_CONVERSATION_TYPES.PERSONAL },{'isRead':true}).exec()
  }
  ,markAllIsReadGroup(id){
    return this.updateMany({'receiverId':id,'conversationType':MESSAGE_CONVERSATION_TYPES.GROUP},{'isRead':true}).exec()
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
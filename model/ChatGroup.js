import mongoose from 'mongoose'
mongoose.set('useFindAndModify', false);
let chatGroup = new mongoose.Schema({
  name:String,
  userAmount:{type:Number,min:3},
  messagesAmount:{type:Number, default:0},
  userId:String,
  member:[{userId:String}],
  createdAt:{type:Number,default:Date.now()},
  updatedAt:{type:Number,default:Date.now()},
  deletedAt:{type:Number,default:null}
})
chatGroup.statics={
  createChatGroup(item){
    return this.create(item)
  },
  findGroupByIdUser(idUser){
    return this.find({
      'member':{$elemMatch:{'userId':idUser}}
    }).exec()
  },
  findGroupById(id){
    return this.findById(id).exec()
  }
  ,afterAddNewMessage(id){
    return this.findByIdAndUpdate(id,
      {'updatedAt':Date.now()}
    ).exec()
  }
}
module.exports = mongoose.model('chatGroup',chatGroup)
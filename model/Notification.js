import mongoose from 'mongoose'
mongoose.set('useFindAndModify', false);
let notificationSchema= new mongoose.Schema({
  senderId:String,
  receiverId:String,
  type:String,
  isread:{type:Boolean,default:false},
  createdAt:{type:Number,default:Date.now}
})
notificationSchema.statics={
  createNewnotification(item){
    this.create(item);
  },
  removeNotification(senderId, receiverId,type){
    this.findOneAndRemove({'senderId':senderId, 'receiverId': receiverId,'type':type}).exec()
  }
}
let typesNotication={
  add_contact: "add_contact"
}
module.exports = {
  model:mongoose.model('notificationSchema', notificationSchema),
  typesNotication:typesNotication
};
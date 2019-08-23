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
    return this.create(item);
  },
  removeNotification(senderId, receiverId,type){
    return this.findOneAndRemove({'senderId':senderId, 'receiverId': receiverId,'type':type}).exec()
  },
  findNotificationsForUserById(idUser){
    return this.find({'receiverId':idUser}).exec()
  }
}
const typesNotication={
  add_contact: "add_contact"
}
const contentNotification={
  getContent:(typeNotification,isRead,senderId,senderAvatar,senderUserName)=>{
    if(typeNotification==typesNotication.add_contact){
      if(isRead==false){
        return `<span class="isread" data-uid="${senderId}">
              <img class="avatar-small" src="${senderAvatar}"> 
              <strong>${senderUserName}</strong> đã gửi cho bạn một lời mời kết bạn!
              </span><br><br><br>`
      }
        return `<span data-uid="${senderId}">
              <img class="avatar-small" src="${senderAvatar}"> 
              <strong>${senderUserName}</strong> đã gửi cho bạn một lời mời kết bạn!
              </span><br><br><br>`
    }
    
  }
}
module.exports = {
  model:mongoose.model('notificationSchema', notificationSchema),
  typesNotication:typesNotication,
  content: contentNotification
};
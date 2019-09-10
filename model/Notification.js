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
  findNotificationsForUserById(idUser,limit){
    return this.find({'receiverId':idUser}).sort({"createdAt":-1}).limit(limit).exec()
  },
  findAllNotificationsForUserById(idUser){
    return this.find({'receiverId':idUser}).sort({'createdAt':-1}).exec()
  },
  countNotifUnread(idUser){
    return this.countDocuments({
      $and:[
        {'receiverId':idUser},
        {'isread':false}
      ]
    }).exec()
  },
  findAllNotificationAndMarkReaded(idUser){
    return this.updateMany({'receiverId':idUser,'isread':false},{'isread':true}).exec()
  },
  findAndRemoveAllNotif(id){
    return this.remove({'receiverId':id}).exec()
  }
}
const typesNotication={
  add_contact: "add_contact",
  received_friend:'received_friend'
}
const contentNotification={
  getContent:(typeNotification,isRead,senderId,senderAvatar,senderUserName)=>{
    if(typeNotification==typesNotication.add_contact){
      if(isRead==false){
        return `<div class="isread" data-uid="${senderId}">
              <img class="avatar-small" src="${senderAvatar}"> 
              <strong>${senderUserName}</strong> đã gửi cho bạn một lời mời kết bạn!
              </div>`
      }
        return `<div data-uid="${senderId}">
              <img class="avatar-small" src="${senderAvatar}"> 
              <strong>${senderUserName}</strong> đã gửi cho bạn một lời mời kết bạn!
              </div>`
    }
    if(typeNotification==typesNotication.received_friend){
      if(isRead==false){
        return `<div class="isread" data-uid="${senderId}">
              <img class="avatar-small" src="${senderAvatar}"> 
              <strong>${senderUserName}</strong> đã chấp nhận lời mời kết bạn của bạn!
              </div>`
      }
        return `<div data-uid="${senderId}">
              <img class="avatar-small" src="${senderAvatar}"> 
              <strong>${senderUserName}</strong> đã chấp nhận lời mời kết bạn của bạn!
              </div>`
    }
    
  }
}
module.exports = {
  model:mongoose.model('notificationSchema', notificationSchema),
  typesNotication:typesNotication,
  content: contentNotification
};
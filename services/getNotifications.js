import notificationModel from '../model/Notification'
import userModel from '../model/User'
let getNotifications= (userId,limit=10)=>{
  return new Promise(async(resolve,reject)=>{
    try {
      let notifications = await notificationModel.model.findNotificationsForUserById(userId,limit)
      let getNotifications = notifications.map(async(notification)=>{
        let sender= await userModel.findByIdUser(notification.senderId)
        return notificationModel.content.getContent(notification.type,notification.isread,sender._id,sender.avatar,sender.userName);
      })
      resolve(await Promise.all(getNotifications))
    } catch (error) {
      reject(error)
    }
  })
}
let getAllNotifications=(userId)=>{
  return new Promise(async(resolve,reject)=>{
    try {
      let allNotifications = await notificationModel.model.findAllNotificationsForUserById(userId)
      let gettAllNotifications= allNotifications.map(async notification=>{
        let sender= await userModel.findByIdUser(notification.senderId)
        return notificationModel.content.getContent(notification.type,notification.isread,sender._id,sender.avatar,sender.userName);
      })
      resolve(await Promise.all(gettAllNotifications))
    } catch (error) {
      reject(error)
    }
  })
}
let countUnread=(userId)=>{
  return new Promise(async(resolve,reject)=>{
    try {
      let countUnRead= await notificationModel.model.countNotifUnread(userId)
      resolve(countUnRead)
    } catch (error) {
      reject(error)
    }
  })
}
module.exports = {
  getNotifications:getNotifications,
  getAllNotifications:getAllNotifications,
  countUnread:countUnread
}
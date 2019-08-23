import notificationModel from '../model/Notification'
import userModel from '../model/User'
let getNotifications= (userId,limit=10)=>{
  return new Promise(async(resolve,reject)=>{
    try {
      let notifications = await notificationModel.model.findNotificationsForUserById(userId)
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
module.exports = getNotifications
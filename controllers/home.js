import userModel from '../model/User'
import contactModel from '../model/Contact'
import notificationModel from '../model/Notification'
import getNotifications from '../services/getNotifications'
import getContacts from '../services/getContact'
import readMoreContact from '../services/readMoreContact'
import mongoose from 'mongoose'
import removeReceiveds from '../services/removeReceived'
import acceptReceiveds from '../services/acceptReceived'
import removeFriends from '../services/removeFriend'
import getFriendInMessages from '../services/getFriendInMessage'
import addNewMessageTextEmojis from '../services/addNewMessageTextEmoji'
import {bufferToBase64} from "../bufferToBase64"
import convertTimeMessages from '../helper/convertTimeMessages'
import markAllMessageIsRead from '../services/markAllMessagesIsRead'
import groupModel from '../model/ChatGroup'
let homeRouter =  async (req,res)=>{
    //get 10 notif
    let notifications = await getNotifications.getNotifications(req.user._id)
    //get all notif
    let allNotifications = await getNotifications.getAllNotifications(req.user._id)
    //get count unread
    let countUnread = await getNotifications.countUnread(req.user._id)
    //get 10 friend
    let allFriend = await getContacts.getFriend(req.user._id)
    let countAllFriend = allFriend.length
    //get 10 user wait accept
    let waitAccept = await getContacts.getReciever(req.user._id)    
    let countWaitAccept = waitAccept.length
    //get 10 sender
    let sender = await getContacts.getSender(req.user._id)
    let countSender = sender.length
    //get 10 user to message
    let getFriends = await getFriendInMessages(req.user._id)
    return  res.render('./master',  {
      user:req.user,
      notifications:notifications,
      countUnread:countUnread,
      allNotifications:allNotifications,
      allFriend:allFriend,
      countAllFriend:countAllFriend,
      waitAccept:waitAccept,
      countWaitAccept:countWaitAccept,
      sender:sender,
      countSender:countSender,
      getFriends:getFriends,
      bufferToBase64:bufferToBase64,
      convertTimeMessages:convertTimeMessages
    })
}
let findUser =async (req,res)=>{
  let contactedArray = [req.user._id] 
  let allContact= await contactModel.findContacted(req.user._id)
    allContact.forEach(element => {
      if(element.userId==req.user._id){
        contactedArray.push(mongoose.Types.ObjectId(element.contactId))
      }else{
        contactedArray.push(mongoose.Types.ObjectId(element.userId))
      }
    });
  await userModel.findUserByName(req.body.name, contactedArray)
  .then(result=>{
    return res.status(200).send(result)
  })
  .catch(err=>{
    console.log(err);
    return res.status(500)
  })
 
  }
//add new a contact and notification
let addContact = async(req,res)=>{
  let checkContact = await contactModel.checkContact(req.user._id,req.body.id)
  if(checkContact){
     return res.status(500).send('Đã kết bạn rồi!!')
  }
  let item ={
    userId:req.user._id,
    contactId : req.body.id
  }
  let notification = {
    senderId : req.user._id,
    receiverId: req.body.id,
    type: notificationModel.typesNotication.add_contact
  }
  const user = await userModel.findByIdUser(req.body.id)
  let users = {
    id:user._id,
    avatar:user.avatar,
    address:user.address,
    userName:user.userName
  }
  await contactModel.createNewContact(item)
  .then(()=>{
    notificationModel.model.createNewnotification(notification);
    res.status(200).send(users)
  })
  .catch(()=>{
    res.status(500).send('Lỗi')
  })
}
//remove a contact and notification
let removeContact= async (req,res)=>{
  let check =await contactModel.checkContact(req.user._id, req.body.id)  
  if(!check){
    return res.status(500).send("Looxi")
  }
  contactModel.findAndRemoveContactSender( req.body.id,req.user._id)
      .then(()=>{
        notificationModel.model.removeNotification(req.user._id, req.body.id, notificationModel.typesNotication.add_contact)
        res.status(200).send("Đã xóa thành công")
      })
      .catch(()=>{
       res.status(500).send("Có lỗi")
      })
}
let readMoreContacts= async(req,res)=>{
  await readMoreContact(req.user._id,10,+req.body.skip)
  .then(result=>{
    return res.status(200).send(result)
  })
  .catch(err=> res.status(500).send(err))
}
let removeReceived= async(req,res)=>{
  await removeReceiveds(req.body.id,req.user._id)
  .then(result=>{
    return res.status(200).send("Ddax xoa")
  })
  .catch(err=>{
    return res.status(500)
  })
}
let acceptReceived = async (req,res)=>{
  let item = {
    senderId : req.user._id,
    receiverId: req.body.id,
    type: notificationModel.typesNotication.received_friend
  }
  let user= await userModel.findByIdUser(req.body.id)
  let users = {
    id:user._id,
    avatar:user.avatar,
    address:user.address,
    userName:user.userName
  }
  await acceptReceiveds(req.user._id,req.body.id)
  .then( async result=>{
    notificationModel.model.createNewnotification(item);
    return res.status(200).send(users)
  }
  )
  .catch(err=>{
    return res.status(500).send(err)
  })
}
let removeFriend= async(req,res)=>{
  await removeFriends(req.user._id,req.body.id)
  .then(result=>{
    return res.status(200).send('da xoa')
  })
  .catch(err=>res.status(500))
}
let removeAllNotif=async (req,res)=>{
  await notificationModel.model.findAndRemoveAllNotif(req.user._id)
  .then(result=>{
    return  res.status(200).send(result)
  }
   
  )
}
let addNewMessageTextEmoji= async(req,res)=>{
  let message = await addNewMessageTextEmojis(req,res)
  .then(async result=>{
    if(req.body.isGroup=="true"){
      await groupModel.afterAddNewMessage(req.body.targetId) 
    }else{
      await contactModel.afterAddMessage(req.user._id,req.body.targetId)
    }
    return  res.status(200).send(message)
  })
  .catch(err=>{
    return  res.status(500).send(err)
  })
}
let markAllMessageIsReads = async(req,res)=>{
  await markAllMessageIsRead(req,res)
  .then(result=>{
    return res.status(200)
  })
  .catch(err=>{
    console.log(err);
    return res.status(500)
  })
}
module.exports = {
  homeRouter:homeRouter,
  findUser:findUser,
  addContact:addContact,
  removeContact:removeContact,
  readMoreContacts:readMoreContacts,
  removeReceived:removeReceived,
  acceptReceived:acceptReceived,
  removeFriend:removeFriend,
  removeAllNotif:removeAllNotif,
  addNewMessageTextEmoji:addNewMessageTextEmoji,
  markAllMessageIsReads: markAllMessageIsReads
 
}
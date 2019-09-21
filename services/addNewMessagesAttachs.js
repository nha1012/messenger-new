import fsExtra from 'fs-extra'
import messageModel from '../model/Message'
import groupModel from "../model/ChatGroup"
import userModel from "../model/User"
let addNewMessagesAttachs = (req,res)=>{
  return new Promise(async(resolve,reject)=>{
    try {
        if(req.body.isGroup=="true"){
          let getGroupChat = await  groupModel.findGroupById(req.body.targetId)
          let attachBuffer =await fsExtra.readFile(req.file.path)
          let attachContentType= req.file.mimetype
          let attachName= req.file.originalname
          let item = {
            senderId :req.user._id,
            receiverId:req.body.targetId,
            conversationType: messageModel.conversationTypes.GROUP,
            messageType:messageModel.messageTypes.FILE,
            sender:{id:req.user._id,name:req.user.userName,avatar:req.user.avatar},
            receiver:{id:getGroupChat._id,name:getGroupChat.name,avatar:"group-avatar-trungquandev.png"},
            file:{data:attachBuffer,contentType:attachContentType,fileName:attachName},
            createdAt:Date.now()
          }
          let newMessage= await messageModel.model.createNewMessage(item)        
          resolve(newMessage)
        }else{
          let getUserChat = await  userModel.findByIdUser(req.body.targetId)
          let attachBuffer = await fsExtra.readFile(req.file.path)
          let attachContentType= req.file.mimetype
          let attachName= req.file.originalname
          let item = {
            senderId:req.user._id,
            receiverId:req.body.targetId,
            conversationType: messageModel.conversationTypes.PERSONAL,
            messageType:messageModel.messageTypes.FILE,
            sender:{id:req.user._id,name:req.user.userName,avatar:req.user.avatar},
            receiver:{id:getUserChat._id,name:getUserChat.name,avatar:getUserChat.avatar},
            file:{data:attachBuffer,contentType:attachContentType,fileName:attachName},
            createdAt:Date.now()
          }
          let newMessage = await messageModel.model.createNewMessage(item)
          resolve(newMessage)
        }
    } catch (error) {
      reject(error)
    }
  })
}
module.exports = addNewMessagesAttachs
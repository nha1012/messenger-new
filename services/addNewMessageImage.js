import fsExtra from 'fs-extra'
import messageModel from '../model/Message'
import groupModel from "../model/ChatGroup"
import userModel from "../model/User"
let addNewMessageImage = (req,res)=>{
  return new Promise(async(resolve,reject)=>{
    try {
        if(req.body.isGroup=="true"){
          let getGroupChat = await  groupModel.findGroupById(req.body.targetId)
          let imagesBuffer =await fsExtra.readFile(req.file.path)
          let imageContentType= req.file.mimetype
          let imageName= req.file.originalname
          let item = {
            senderId :req.user._id,
            receiverId:req.body.targetId,
            conversationType: messageModel.conversationTypes.GROUP,
            messageType:messageModel.messageTypes.IMAGE,
            sender:{id:req.user._id,name:req.user.userName,avatar:req.user.avatar},
            receiver:{id:getGroupChat._id,name:getGroupChat.name,avatar:"group-avatar-trungquandev.png"},
            file:{data:imagesBuffer,contentType:imageContentType,fileName:imageName},
            createdAt:Date.now()
          }
          let newMessage= await messageModel.model.createNewMessageText(item)         
          resolve(newMessage)
        }else{
          let getUserChat = await  userModel.findByIdUser(req.body.targetId)
          let imagesBuffer = await fsExtra.readFile(req.file.path)
          let imageContentType= req.file.mimetype
          let imageName= req.file.originalname
          let item = {
            senderId:req.user._id,
            receiverId:req.body.targetId,
            conversationType: messageModel.conversationTypes.PERSONAL,
            messageType:messageModel.messageTypes.IMAGE,
            sender:{id:req.user._id,name:req.user.userName,avatar:req.user.avatar},
            receiver:{id:getUserChat._id,name:getUserChat.name,avatar:getUserChat.avatar},
            file:{data:imagesBuffer,contentType:imageContentType,fileName:imageName},
            createdAt:Date.now()
          }
          let newMessage = await messageModel.model.createNewMessageText(item)
          resolve(newMessage)
        }
    } catch (error) {
      reject(error)
    }
  })
}
module.exports = addNewMessageImage
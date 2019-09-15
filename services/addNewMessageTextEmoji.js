import messageModel from '../model/Message'
let addNewMessageTextEmoji = (req,res)=>{
  return new Promise(async(resolve,reject)=>{
    try {
      if(req.body.message.length>0){
        if(req.body.isGroup=="true"){
          let getGroupChat = await  messageModel.model.findMessagesGroup(req.body.targetId)
          let item = {
            senderId:req.user._id,
            receiverId:req.body.targetId,
            conversationType: messageModel.conversationTypes.GROUP,
            messageType:messageModel.messageTypes.TEXT,
            sender:{id:req.user._id,name:req.user.userName,avatar:req.user.avatar},
            receiver:{id:getGroupChat._id,name:getGroupChat.name,avatar:"group-avatar-trungquandev.png"},
            text:req.body.message,
            createdAt:Date.now()
          }
          let newMessage= await messageModel.model.createNewMessageText(item)         
          resolve(newMessage)
        }else{
          let getUserChat = await  messageModel.model.findMessagesUser(req.user._id,req.body.targetId)
          let item = {
            senderId:req.user._id,
            receiverId:req.body.targetId,
            conversationType: messageModel.conversationTypes.PERSONAL,
            messageType:messageModel.messageTypes.TEXT,
            sender:{id:req.user._id,name:req.user.userName,avatar:req.user.avatar},
            receiver:{id:getUserChat._id,name:getUserChat.name,avatar:getUserChat.avatar},
            text:req.body.message,
            createdAt:Date.now()
          }
          let newMessage = await messageModel.model.createNewMessageText(item)
          resolve(newMessage)
        }
      }
    } catch (error) {
      reject(error)
    }
  })
}
module.exports = addNewMessageTextEmoji
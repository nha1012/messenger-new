import contactModel from '../model/Contact'
import userModel from '../model/User'
import groupChatModel from '../model/ChatGroup'
import messageModel from '../model/Message'
let getFriendInMessage = (idUser, limit= 10)=>{
  let users=[]
  return new Promise(async(resolve,reject)=>{
    try {
      let allContacsFriend = await contactModel.getFriend(idUser, limit)
      let allFriend = allContacsFriend.map(async item=>{
        if(idUser==item.contactId){
           let user = await userModel.findByIdUser(item.userId)
           return {
             id: user._id,
             avatar:user.avatar,
             userName:user.userName,
             updatedAt : item.updatedAt
           }
        }
        else{
          let user = await userModel.findByIdUser(item.contactId)
          return {
            id: user._id,
            avatar:user.avatar,
            userName:user.userName,
            updatedAt : item.updatedAt
          }
        }
      })
      allFriend = await Promise.all(allFriend)
      let groupChat = await groupChatModel.findGroupByIdUser(idUser)
      groupChat = await Promise.all(groupChat)
      let allGroupChat = groupChat.map(group=>{
        return {
          messagesAmount: group.messagesAmount,
          deletedAt: group.deletedAt,
          id: group._id,
          updatedAt: group.updatedAt,
          name: group.name,
          userAmount: group.userAmount,
          userId: group.userId,
          member: group.member,
          createdAt: group.createdAt,
        } 
        })
        allGroupChat = await Promise.all(allGroupChat)
      let allArrayUserAndGroup = await allFriend.concat(allGroupChat)
         
      let allArrayUserAndGroupPromise =  allArrayUserAndGroup.map(async item=>{
          var message = await messageModel.model.findMessages(idUser, item.id)
          item.message = message
          return item       
      })     
      resolve(await Promise.all(allArrayUserAndGroupPromise) )      
    } catch (error) {
      reject(error)
    }
  })
}
module.exports = getFriendInMessage
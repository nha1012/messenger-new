import contactModel from '../model/Contact'
import userModel from '../model/User'
let limit =10;
//get 10 friend
let getFriend=(idUser)=>{
  return new Promise( async(resolve,reject)=>{
    try {
      let allContacsFriend = await contactModel.getFriend(idUser, limit)
      let allFriend = allContacsFriend.map(async item=>{
        if(idUser==item.contactId){
          return await userModel.findByIdUser(item.userId)
        }
        else{
          return await userModel.findByIdUser(item.contactId)
        }
      })
      resolve(await Promise.all(allFriend))
    } catch (error) {
      reject(error)
    }
  })
}
//get 10 sender
let getReciever=(userId)=>{
  return new Promise(async(resolve,reject)=>{
    try {
      let allUserWaitAccept = await contactModel.getWaitAccept(userId, limit)
      let allContactUser = allUserWaitAccept.map(async user=> await userModel.findByIdUser(user.contactId))
      resolve(await Promise.all(allContactUser))
    } catch (error) {
      reject(error)
    }
  })
}
//get 10 reciever
let getSender=(userId)=>{
  return new Promise(async(resolve,reject)=>{
    try {
      let allSenderContact = await contactModel.getSender(userId, limit)
      let allUserSender = allSenderContact.map(async user=>await userModel.findByIdUser(user.userId))
      resolve(await Promise.all(allUserSender))
    } catch (error) {
      reject(error)
    }
  })
}
module.exports={
  getFriend:getFriend,
  getReciever:getReciever,
  getSender:getSender
}
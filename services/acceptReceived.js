import contactModel from '../model/Contact'
let accepReceived = (userId,contactId)=>{
  return new Promise(async(resolve,reject)=>{
    try {
      resolve(await contactModel.findAndUpdateToFriend(userId,contactId))
    } catch (error) {
      reject(error)
    }
  })
}
module.exports = accepReceived
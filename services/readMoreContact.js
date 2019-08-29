import contactModel from '../model/Contact'
import userModel from '../model/User'
let readMoreContact = (userId, limit,skip)=>{
  return new Promise(async(resolve,reject)=>{
    try {
      let allContactFriend = await contactModel.getNextFriend(userId,limit,skip)
      let friends= allContactFriend.map(async item=> await userModel.findByIdUser(userId||item.contactId))
      resolve(await Promise.all(friends))
    } catch (error) {
      reject(error)
    }
    
  })
}
module.exports = readMoreContact
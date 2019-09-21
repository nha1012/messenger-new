import userModel from '../model/User'
import contactModel from '../model/Contact'

let findToCreateGroup = async(req,res)=>{
  let arrUser= []
  let contactIsFriend = await contactModel.getFriend(req.user._id)
  contactIsFriend.forEach(element => {
    if (element.userId==req.user._id) {
      arrUser.push(element.contactId)
    }else{
      arrUser.push(element.userId)
    }
  });
  return new Promise(async(resolve,reject)=>{
    try {
      let users = await userModel.findUserByNameToCreateGroup(req.body.userName,arrUser)
      resolve(users)
    } catch (error) { 
      reject(error)
    }
  })
}
module.exports = findToCreateGroup
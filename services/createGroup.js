import groupModel from "../model/ChatGroup"
let createGroup = (arrayUser,groupName,userAmount,userId)=>{
 return new Promise(async(resovle,reject)=>{
  try {
    arrayUser.unshift({'userId':`${userId}`})
    let item ={
      name:groupName,
      userAmount:userAmount,
      userId:userId,
      member:arrayUser,
      createdAt:Date.now(),
      updatedAt:Date.now()
    }
    let addNewGroup = await groupModel.createNewGroup(item)
    resovle(addNewGroup)
  } catch (error) {
    reject(error)
  }
 })
}
module.exports = createGroup
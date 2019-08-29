import contactModel from '../model/Contact'
let removeReceived = (idContact,idUser)=>{
  return new Promise(async(resolve,reject)=>{
    try {
      resolve(await contactModel.findAndRemoveByIdContact(idContact,idUser))
    } catch (error) {
      reject(error)
    }
  })
}
module.exports = removeReceived
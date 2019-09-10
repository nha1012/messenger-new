import contactModel from '../model/Contact'
let removeFriend= async(idUser,idContact)=>{
 return await contactModel.findAndRemoveFriend(idUser,idContact)
}
module.exports = removeFriend
import userModel from '../model/User'
import contactModel from '../model/Contact'
import notificationModel from '../model/Notification'
let contacts=[]
let homeRouter =  (req,res)=>{
    return  res.render('./master',  {user:req.user, contacts : contacts})
}
let findUser = (req,res)=>{
      userModel.findUserByName(req.body.name)
      .then(result=>{
        result.forEach(element => {
            contacts.push(element)
        })
        return res.status(200).send('Tìm thấy')
      })
      .catch(err=>{
        return res.status(500)
      })
      contacts=[]
  }
//add new a contact and notification
let addContact = async(req,res)=>{

  let checkContact = await contactModel.checkContact(req.user._id,req.body.id)
  if(checkContact){
     return res.status(500).send('Đã kết bạn rồi!!')
  }
  let item ={
    userId:req.user._id,
    contactId : req.body.id
  }
  let notification = {
    senderId : req.user._id,
    receiverId: req.body.id,
    type: notificationModel.typesNotication.add_contact
  }
  await contactModel.createNewContact(item)
  .then(()=>{
    notificationModel.model.createNewnotification(notification);
    res.status(200).send('Đã thêm thành công')
  })
  .catch(()=>{
    res.status(500).send('Lỗi')
  })
}
//remove a contact and notification
let removeContact= async (req,res)=>{
  let check =await contactModel.checkContact(req.user._id, req.body.id)  
  if(!check){
    return res.status(500).send("Looxi")
  }
  contactModel.findAndRemoveById(req.user._id)
      .then(()=>{
        notificationModel.model.removeNotification(req.user._id, req.body.id, notificationModel.typesNotication.add_contact)
        res.status(200).send("Đã xóa thành công")
      })
      .catch(()=>{
       res.status(500).send("Có lỗi")
      })
}
module.exports = {
  homeRouter:homeRouter,
  findUser:findUser,
  addContact:addContact,
  removeContact:removeContact
}
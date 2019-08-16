import userModel from '../model/User'
import contactModel from '../model/Contact'
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
let addContact = async(req,res)=>{
  let checkContact = await contactModel.checkContact(req.user._id,req.body.id)
  if(checkContact){
     return res.status(500).send('Đã kết bạn rồi!!')
  }
  let item ={
    userId:req.user._id,
    contactId : req.body.id
  }
  contactModel.createNewContact(item)
  .then(()=>{
    res.status(200).send('Đã thêm thành công')
  })
  .catch(()=>{
    res.status(500).send('Lỗi')
  })
}
let removeContact= async (req,res)=>{
  let check =await contactModel.checkContact(req.user._id, req.body.id)  
  if(!check){
    return res.status(500).send("Looxi")
  }
  contactModel.findAndRemoveById(req.user._id)
      .then(()=>{
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
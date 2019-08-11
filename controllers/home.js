import userModel from '../model/User'
import contactModel from '../model/Contact'
let contacts=[]
let homeRouter =  (req,res)=>{
    return  res.render('./master',  {user:req.user, contacts : contacts})
}
let findUser = (req,res)=>{
  if(req.body.name===null){
    return res.status(500).send('Nhập đã r tìm ')
  }
  userModel.findUserByName(req.body.name)
  .then(result=>{
    result.forEach(element => {
      contacts.push(element)
    });
    return res.status(200).send('Tìm thấy')
  })
  .catch(err=>{
    return res.status(500)
  })
  contacts=[]
}
let addContact = (req,res)=>{
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
module.exports = {
  homeRouter:homeRouter,
  findUser:findUser,
  addContact:addContact
}
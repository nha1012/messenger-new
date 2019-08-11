import multer from 'multer'
import uuidv4 from 'uuid/v4'
import userModel from '../model/User'
import fs from 'fs'
const { check, validationResult } = require('express-validator');
let storageAvatar = multer.diskStorage({
  destination : (req,file,callback)=>{
    callback(null,'./public/images/users')
  },
  filename:(req,file,callback)=>{
    let math=['image/jpg','image/png','image/jpeg']
    if(math.indexOf(file.mimetype)===-1){
      alertify.error('Kieu file khong hop le (jpg,png)',7)
      return callback('Kieu file khong hop le (jpg,png)',null)
    }
    let avatarName = `${uuidv4()}-${file.originalname}`
    callback(null,avatarName)
  }
}) 
let avatarUploadFile = multer({
  storage: storageAvatar,
  limits: {fileSize: 1048576}
}).single('avatar')
let updateAvatar = (req,res)=>{
  avatarUploadFile(req,res,(error)=>{
   if(error){
    return res.status(500).send('File qua lon')
   }
   let item = {
     avatar: `/images/users/${req.file.filename}`,
     isUpdateAvatar: true
   }
  
  userModel.findAndUpdateUser(req._id, item )
  let pathImageOld= `./public${req.user.avatar}`  
  try {
    if(req.user.isUpdateAvatar!=false){
       fs.unlinkSync(pathImageOld)
    }
  } catch(err) {
    console.error(err)
  }
  return res.status(200).send('Đã upload Avatar thành công')
  }
  )}
let updateInfo = (req,res)=>{  
  userModel.findAndUpdateUserById(req._id, req.body)
  .then( result=>{
     res.status(200).send("Đã cập nhật thành công.")
  }
  )
  .catch(err=>{
    res.status(500).send('Không cập nhật được.')
  }
  )
}
let updatePassword = (req,res)=>{
  if(req.body.passwordold == req.user.local.password){
    userModel.findAndUpdatePassword(req._id, req.body.passwordnew)
    .then(sesult=>{
      return res.status(200).send('Đã cập nhật mật khẩu thành công.')
    })
    .catch(err=>{
      console.log(err);
      return res.status(500).send('Vui lòng liên hệ lại với chúng tôi, có lỗi server')
    })
  } else{
    res.status(500).send('Mật khẩu bạn nhập k đúng.')
  }
  
}
module.exports = {
  updateAvatar:updateAvatar,
  updateInfo:updateInfo,
  updatePassword:updatePassword
}
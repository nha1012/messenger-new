import userSchema from '../model/User'
import uuidv4 from'uuid/v4'
import mailerConfig from './../config/mailer'
let createUser =  (email,gender,password,req)=>{
    let userItem={
    userName: email.split('@')[0],
    gender:gender,
    local:{
      email:email,
      password:password,
      verifytoken: uuidv4()
    }
  }
  let user =  userSchema.createNewUser(userItem)
  try {
    let arraySuccess = ['Chúng tôi đã gửi email xắc thực tài khoản cho bạn, hãy kiểm tra lại nhé!!']
    req.flash('success', arraySuccess)
    mailerConfig.tranSporter.sendMail(mailerConfig.mailOptions(email,'Đây là email xác thực tài khoản.','http://localhost:3000/verify/'+ userItem.local.verifytoken))
  } catch (error) {
    let arrayErrors=['Đã có lỗi xảy ra, vui lòng tạo lại tài khoản, hoặc liên hệ với tôi (Nhã nguyễn) ']
    req.flash('errors', arrayErrors)
    userSchema.findAndRemoveUser(user._id)
  }
}
module.exports = createUser
const { check, validationResult } = require('express-validator');
import createUser from '../services/createUser'
import userSchema from '../model/User'
let loginRegisterRouter = async (req,res)=>{
  if(req.isAuthenticated()){
     return res.redirect('/')
  }
  return res.render('./loginRegister',{errors:req.flash('errors'),success:req.flash('success')})
}
let postRegister = (req , res)=>{  
  const errors = validationResult(req)
  let arrayError =[]
  let arraySuccess=["Đã tạo thành công"]
  if(!errors.isEmpty()){
    errors.errors.forEach(element => {
      arrayError.push(element.msg)
    });
    req.flash('errors', arrayError)
   return res.redirect('/login-register');
    
  } 
  userSchema.findByEmail(req.body.email).then((result)=>{
    if(result!=null){
      arrayError.push('Email đã được sử dụng!!')
      req.flash('errors', arrayError)
      return res.redirect('/login-register');
    }
    req.flash('success', arraySuccess)
    createUser(req.body.email,req.body.gender,req.body.password,req) 
    return res.redirect('/login-register')
  });
    
}
module.exports = {
  loginRegisterRouter:loginRegisterRouter, 
  postRegister:postRegister}  
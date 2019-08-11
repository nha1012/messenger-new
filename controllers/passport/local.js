import userModel from '../../model/User'
import passport from 'passport'
let localStrategy = require('passport-local').Strategy;
let initPassportLocal=()=>{
  let arrayError=[]
  passport.use(new localStrategy({
    usernameField:'email',
    passwordField:'password',
    passReqToCallback:true
  },(req,email,password,done)=>{
  userModel.findByEmail(email)
  .then(user=>{
    if( user.local.password !=password){
      arrayError.push('Tài khoản hoặc mật khẩu không chính xác')
      return done(null,false,req.flash('errors', arrayError))
    }
    if (user.local.isactive==false){
      arrayError.push('Tài khoản chưa được xác thực')
      return done(null,false,req.flash('errors', arrayError))
    }
    return done(null,user)
  })
  .catch(err=>{
    console.log(err);
    arrayError.push('Lỗi')
    return done(null,false, req.flash('errors', arrayError))
  })
  }))
  passport.serializeUser((user,done)=>{
    done(null, user._id)
  })
  passport.deserializeUser((id,done)=>{
    userModel.findById(id)
    .then(user=>{
      return done(null,user)
    })
    .catch(err=>{
      console.log(err);
      return done(null,false)
    })
  })
}
module.exports = initPassportLocal
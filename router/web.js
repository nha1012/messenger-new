import express from 'express';
//iport file from controller
import homeRouter from '../controllers/home'
import auth from '../controllers/loginRegister'
import checkRegister from '../validator/checkRegister'
import userModel from '../model/User'
import initPassportLocal from'../controllers/passport/local'
import initPassportFacebook from'../controllers/passport/facebook'
import passport from 'passport'
import authLogout from '../controllers/logout'
import isLogin from '../controllers/islogin'
import updateUser from '../controllers/userupdate'
import markAllReaded from '../services/markAllReaded'
//init all from passportJS
initPassportLocal();
initPassportFacebook();
let router = express.Router();
let arrayErrors=[]
let routerWeb = (app)=>{
  router.get('/',isLogin, homeRouter.homeRouter)
  router.get('/login-register'  , auth.loginRegisterRouter)
  router.post('/register', checkRegister.checkRegister, auth.postRegister )
  router.get('/verify/:token',(req,res)=>{
  const arraySuccess = ['Đã xác thực!!']
    if (userModel.findAndUpdateUser(req.params.token).then()!=null) {
      req.flash('success', arraySuccess)
      res.redirect('/login-register')
      return
    }
    else{
      arrayErrors.push('Verifytoken không tồn tại')
      req.flash('errors', arrayErrors)
      res.redirect('/login-register')
      return
    }
  }),
  router.post('/login', passport.authenticate('local',{
    successRedirect:'/',
    failureRedirect:'/login-register',
    successFlash:true,
    failureFlash:true
  })),
  router.get('/logout',isLogin, authLogout),
  router.get('/auth/facebook', passport.authenticate('facebook',{scope:['email']}));
  router.get('/auth/facebook/callback',passport.authenticate('facebook',{
    successRedirect:'/',
    failureRedirect:'/login-register'
  })),
  router.put('/user/update-avatar', isLogin,updateUser.updateAvatar),
  router.put('/user/update-info', isLogin,updateUser.updateInfo),
  router.put('/user/update-password', isLogin,updateUser.updatePassword),
  router.post('/user/find-contacts',isLogin, homeRouter.findUser),
  router.put('/user/add-contact', isLogin, homeRouter.addContact),
  router.post('/contact/delete-contact',isLogin, homeRouter.removeContact),
  router.get('/notification/mark-all-readed',isLogin, markAllReaded),
  router.post('/contact/read-more',isLogin, homeRouter.readMoreContacts),
  router.delete('/contact/remove-received',isLogin, homeRouter.removeReceived),
  router.post('/contact/accept-received',isLogin, homeRouter.acceptReceived),
  app.use('/',router)
}
module.exports = routerWeb;
import express from 'express';
//iport file from controller
import homeRouter from '../controllers/home'
import auth from '../controllers/loginRegister'

let router = express.Router();
let routerWeb = (app)=>{
  router.get('/', homeRouter)
  router.get('/login-register' , auth.loginRegisterRouter)
  router.post('/register', auth.postRegister )
  
  app.use('/',router)
}
module.exports = routerWeb;
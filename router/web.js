import express from 'express';
//iport file from controller
import homeRouter from '../controllers/home'
import loginRegiterRouter from '../controllers/loginRegister'

let router = express.Router();
let routerWeb = (app)=>{
  router.get('/', homeRouter)
  router.get('/login-register' , loginRegiterRouter)
  app.use('/',router)
}
module.exports = routerWeb;
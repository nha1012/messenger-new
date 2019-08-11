import express from 'express'//import express
import connectDb from './config/connectDB'//import conncet mongodb
import configEjs from './config/viewEngine'//import view engine ejs
import routerWeb from './router/web'//import router for web
import passport from 'passport'
import bodyParser from 'body-parser'
import flash from 'connect-flash'
import session from 'express-session'

connectDb();
//khai bao app su dung express
let app = express();
//cau hinh bodypaser
app.use(bodyParser.urlencoded({extended:true}))
//cau hinh connectFlash
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: false,
  cookie: { maxAge  : 86400000 }
}))
//use view engine
configEjs(app)
app.use(flash());
//router for web
app.use(passport.initialize())
app.use(passport.session())
//cau hinh passport duoi flash va tren router

routerWeb(app)

//lang nghe cong 3000
app.listen(3000,'localhost',()=>(
  console.log("Server is running on host 3000")
))
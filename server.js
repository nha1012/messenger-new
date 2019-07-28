import express from 'express'//import express
import connectDb from './config/connectDB'//import conncet mongodb
import configEjs from './config/viewEngine'//import view engine ejs
import routerWeb from './router/web'//import router for web
import passportLocal from 'passport-local'
import bodyParser from 'body-parser'

//cau hinh cho pass port
import passportConfig  from './config/passPortLocal'
//ket noi voi csdl mongodb voi host 27017
connectDb();
//khai bao app su dung express
let app = express();
app.use(bodyParser.urlencoded({extended:true}))
//use view engine
configEjs(app)
//router for web
routerWeb(app)
//cau hinh passport
passportConfig(app)
//cau hinh body parser
// app.use(bodyParser.urlencoded({ extended: false }));
//lang nghe cong 3000
app.listen(3000,'localhost',()=>(
  console.log("Server is running on host 3000")
))

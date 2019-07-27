import express from 'express'//import express
import connectDb from './config/connectDB'//import conncet mongodb
import configEjs from './config/viewEngine'//import view engine ejs
import routerWeb from './router/web'//import router for web
//ket noi voi csdl mongodb voi host 27017
connectDb();
//khai bao app su dung express
let app = express();
//use view engine
configEjs(app)
//router for web
routerWeb(app)
//lang nghe cong 3000
app.listen(3000,'localhost',()=>(
  console.log("Server is running on host 3000")
))

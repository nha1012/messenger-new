import express from 'express'//import express
import connectDb from './config/connectDB'//import conncet mongodb
import configEjs from './config/viewEngine'//import view engine ejs
import routerWeb from './router/web'//import router for web
import passport from 'passport'
import bodyParser from 'body-parser'
import flash from 'connect-flash'
import http from 'http'
// import socketio from 'socket.io'
import initSocket from './socket/index'
import passportSocketio from 'passport.socketio'
import cookieParser from 'cookie-parser'
import configSession from './config/session'
//khai bao app su dung express
const app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
server.listen(process.env.PORT || 5000,()=>(
  console.log("Server is running on host messenger-nhadev.herokuapp.com")
))

connectDb();


//cau hinh bodypaser
app.use(bodyParser.urlencoded({extended:true}))
//cau hinh session
configSession.config(app)
//use view engine
configEjs(app)
app.use(flash());
//use cokie parser
// app.use(cookieParser())
//config passport socketio

//router for web
app.use(passport.initialize())
app.use(passport.session())
//cau hinh passport duoi flash va tren router


io.use(passportSocketio.authorize({
  cookieParser: cookieParser,       // the same middleware you registrer in express
  key: 'express.sid',       // the name of the cookie where express/connect stores its session_id
  secret: 'keyboard cat',   // the session_secret to parse the cookie
  store: configSession.store
}));

routerWeb(app)
//init socket io
initSocket(io);
//lang nghe cong 3000

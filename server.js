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
server.listen(3000,'localhost',()=>(
  console.log("Server is running on host 3000")
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


// io.use(passportSocketio.authorize({
//   cookieParser: cookieParser,       // the same middleware you registrer in express
//   key: 'express.sid',       // the name of the cookie where express/connect stores its session_id
//   secret: 'keyboard cat',   // the session_secret to parse the cookie
//   store: configSession.store
// }));

routerWeb(app)
//init socket io
// initSocket(io)
io.on("connection", function(socket)
	{
		socket.on("disconnect", function()
			{
			});
         //server lắng nghe dữ liệu từ client
    io.emit("sent-data", "server sent data");
		socket.on("Client-sent-data", function(data)
			{
        console.log(data);
				//sau khi lắng nghe dữ liệu, server phát lại dữ liệu này đến các client khác
        io.emit("Server-sent-data", "server data");
			});
	});
//lang nghe cong 3000

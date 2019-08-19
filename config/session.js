import session from 'express-session'
let mongoDBStore = require('connect-mongodb-session')(session);

let store = new mongoDBStore({
  // uri: URI
})
let config=(app)=>{
app.use(session({
  key: 'express.sid', 
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: false,
  cookie: { maxAge  : 86400000 }
}))
}


module.exports = {
  config:config,
  store:store
}
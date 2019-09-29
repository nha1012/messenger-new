import session from 'express-session'
let mongoDBStore = require('connect-mongodb-session')(session);
let store = new mongoDBStore({
  uri: 'mongodb://ukn4k49wkryxzlsbw8nj:GRU4za8ohkNyebzftlor@bdbailrwhi0yqq8-mongodb.services.clever-cloud.com:27017/bdbailrwhi0yqq8'
})
let configDb=(app)=>{
app.use(session({
  key: 'express.sid', 
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: false,
  cookie: { maxAge  : 86400000 },
  store:store
}))
}


module.exports = {
  config:configDb,
  store:store
}

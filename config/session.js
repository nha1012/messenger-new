import session from 'express-session'
let store = new (require("connect-mongo")(session))({
  url: "mongodb://localhost:27017/messenger"
})
let config=(app)=>{
app.use(session({
  key: 'express.sid', 
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: false,
  cookie: { maxAge  : 86400000 },
  store: store
}))
}

module.exports = {
  config:config,
  store:store
}
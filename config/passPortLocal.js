import session from 'express-session'
import passport from 'passport'
let passportConfig =(app)=>{
  app.use(session({
    secret : "secret",
    saveUninitialized: true,
    resave: true
  }))
  
  app.use(passport.initialize());
  app.use(passport.session());
}
module.exports = passportConfig
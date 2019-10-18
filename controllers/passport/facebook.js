import userModel from '../../model/User'
import passport from 'passport'
import uuidv4  from 'uuid/v4'
let facebookStrategy = require('passport-facebook').Strategy;
let arraySuccess=[]
let initFacebookStrategy = ()=>{
  passport.use(new facebookStrategy({
    clientID: '503217393775100',
    clientSecret: '463442ae5b388a8ccf001cd17b05a9c9',
    callbackURL: "https://messenger-nhadev.herokuapp.com/auth/facebook/callback",
    passReqToCallback:true,
    profileFields: ['id', 'displayName', 'photos', 'email','gender']
  }, async(req,accessToken,refreshToken,profile,done)=> {
  let user = await  userModel.findByUidFacebook(profile.id)
      if(user){
        return done(null,user)
      }
    let userItem={
      userName: profile.displayName,
      gender:profile.gender,
      facebook:{
        uid: profile.id,
        token: uuidv4(),
        email:profile.emails[0].value
      },
      local:{
        isactive:true
      }
    }
    let userNew = await userModel.createNewUser(userItem)
      return done(null,userNew)
  }
  ))
  passport.serializeUser((user,done)=>{
    done(null, user._id)
  })
  passport.deserializeUser((id,done)=>{
    userModel.findByIdUser(id)
    .then(user=>{
      return done(null,user)
    })
    .catch(err=>{
      return done(null,false)
    })
  })
}
module.exports = initFacebookStrategy;

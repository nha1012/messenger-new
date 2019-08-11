let isLogin =(req,res,next)=>{
  if(req.isAuthenticated()){
   return next()
  }
  return res.redirect('/login-register')
}
module.exports = isLogin
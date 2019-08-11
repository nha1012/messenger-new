let logOut=(req,res)=>{
  req.logout()
  res.redirect('/login-register')
}
module.exports = logOut
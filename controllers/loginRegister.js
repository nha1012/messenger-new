let loginRegisterRouter = (req,res)=>{
  res.render('./loginRegister')
}
let postRegister = (req,res)=>{
  console.log(req.body);
}
module.exports = {
  loginRegisterRouter:loginRegisterRouter, 
  postRegister:postRegister}
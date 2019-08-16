import contact from './contact/addcontact'
let initSocket =(io)=>{
  contact(io)
}
module.exports = initSocket
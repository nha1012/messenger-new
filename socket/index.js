import addContact from './contact/addcontact'
import removeContact from './contact/removeContact'
let initSocket =(io)=>{
  addContact(io)
  removeContact(io)
}
module.exports = initSocket
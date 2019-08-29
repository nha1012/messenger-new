import addContact from './contact/addcontact'
import removeContact from './contact/removeContact'
import receivedContact from './contact/receivedContact'
let initSocket =(io)=>{
  addContact(io)
  removeContact(io)
  receivedContact(io)
}
module.exports = initSocket
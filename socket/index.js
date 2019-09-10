import addContact from './contact/addcontact'
import removeContact from './contact/removeContact'
import receivedContact from './contact/receivedContact'
import removeFriend from './contact/removeFriend'
let initSocket =(io)=>{
  addContact(io)
  removeContact(io)
  receivedContact(io)
  removeFriend(io)
}
module.exports = initSocket
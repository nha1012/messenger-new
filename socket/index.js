import addContact from './contact/addcontact'
import removeContact from './contact/removeContact'
import receivedContact from './contact/receivedContact'
import removeFriend from './contact/removeFriend'
import sendMessagesTextEmoji from "./message/sendMessagesTextEmoji"
let initSocket =(io)=>{
  addContact(io)
  removeContact(io)
  receivedContact(io)
  removeFriend(io)
  sendMessagesTextEmoji(io)
}
module.exports = initSocket
import addContact from './contact/addcontact'
import removeContact from './contact/removeContact'
import receivedContact from './contact/receivedContact'
import removeFriend from './contact/removeFriend'
import sendMessagesTextEmoji from "./message/sendMessagesTextEmoji"
import typingOn from './message/typingOn'
import typingOff from './message/typingOff'
let initSocket =(io)=>{
  addContact(io)
  removeContact(io)
  receivedContact(io)
  removeFriend(io)
  sendMessagesTextEmoji(io)
  typingOn(io)
  typingOff(io)
}
module.exports = initSocket
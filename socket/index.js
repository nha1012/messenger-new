import addContact from './contact/addcontact'
import removeContact from './contact/removeContact'
import receivedContact from './contact/receivedContact'
import removeFriend from './contact/removeFriend'
import sendMessagesTextEmoji from "./message/sendMessagesTextEmoji"
import sendMessagesImage from "./message/sendMessagesImage"
import sendMessagesAttach from "./message/sendMessagesAttach"
import typingOn from './message/typingOn'
import typingOff from './message/typingOff'
import addNewGroup from './group/addNewGroup'
import userOnline from './userOnline'
let initSocket =(io)=>{
  addContact(io)
  removeContact(io)
  receivedContact(io)
  removeFriend(io)
  sendMessagesTextEmoji(io)
  sendMessagesImage(io)
  sendMessagesAttach(io)
  typingOn(io)
  typingOff(io)
  addNewGroup(io)
  userOnline(io)
}
module.exports = initSocket
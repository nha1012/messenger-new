let typingOn=(divId)=>{
  let data={}
  data.targetId = divId
  if($('.people').find(`li[data-chat=${divId}]`).hasClass('group-chat')){
    data.isGroup=true
  }else{
    data.isGroup=false
  }
  socket.emit('client-typing-on', data)
}
let typingOff=(divId)=>{
  let data={}
  data.targetId = divId
  if($('.people').find(`li[data-chat=${divId}]`).hasClass('group-chat')){
    data.isGroup=true
  }else{
    data.isGroup=false
  }
  socket.emit('client-typing-off', data)
}
$(document).ready(function () {
  socket.on('server-typing-on', function (data) {
    let typing = `<div class="bubble you bubble-typing-gif">
      <img src="/images/chat/typing.gif" alt="">
    </div>`
  let divChat=  $('.right').find(`div.chat[data-chat=${data}]`)

   if(!$(`.chat.${data}`).find('div.bubble-typing-gif').length){
    divChat.append(typing);
     nineScrollRight(data)
   }else{
     return false
   }
  })
  socket.on('server-typing-off',function (data) {
    $(`.chat.${data}`).find('div.bubble-typing-gif').remove()
  })
});
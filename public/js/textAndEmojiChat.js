

function textAndEmojiChat(chatId) {
  
  $(".emojionearea").unbind("keyup").on("keyup", function (element) {
    if(element.which===13){
      let targetId= $(`#write-chat-${chatId}`).data('chat')
      let message = $(`#write-chat-${chatId}`).val()
      if(!targetId.length && !message.length){
        return false
      }
      let data = {
        targetId:targetId,
        message:message,
        isGroup:false
      }
    if( $(`#write-chat-${chatId}`).hasClass('group-chat')){
      data.isGroup = true;
    }
    if(data.message.length>0){
      $.post("/message/add-new-text-emoji", data,
      function (result) {
        socket.emit('client-add-new-messages-text-emoji', data)
        let aMessage= `<div class="bubble me ">${data.message}
        </div>`
        $(`.chat.${targetId}`).append(aMessage)
        $('.emojionearea-editor').text('');
        nineScrollRight(chatId)
        let a =$(".people").find(`li[data-chat=${chatId}]`)
        a.children(".preview").html(message)
        data={}
      }
    );
    }
    }
  })
}
$(document).ready(function () {
  
  socket.on('server-add-new-messages-text-emoji', function (data) {
    console.log(data.isGroup);
    
    if(data.isGroup!=true){
      let message = `<div class="bubble you" data-mess-id="${data.id}">${data.messages}
      </div>`
      $(`.chat.${data.id}`).append(message)
      nineScrollRight(data.id)
    }else{
      let message = `<div class="bubble you" data-mess-id="${data.id}">
      <img class="message-image" src="${data.avatar}" title="${data.name}" alt="">
      ${data.messages}
  </div>`
      $(`.chat.${data.id}`).append(message)
      nineScrollRight(data.id)
    }
  })
});


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
        data ={}
        socket.emit('client-add-new-messages-text-emoji', data)
        let aMessage= `<div class="bubble me ">${data.message}
        </div>`
        $(`.chat.${targetId}`).append(aMessage)
        $('.emojionearea-editor').text('');
        nineScrollRight(chatId)
        let liLeft =$(".people").find(`li[data-chat=${chatId}]`)
        liLeft.children(".preview").html(message)
        liLeft.find('span.time').html("vài giây trước")
        $('.people').prepend(liLeft.parent()[0])
        typingOff(chatId)
      }
    );
      data ={}
    }
    }
  })
}
$(document).ready(function () {
  socket.on('server-add-new-messages-text-emoji', function (data) {
    $(`.chat.${data.userId} `).scroll(function (event) {
     var scroll = $(`.chat.${data.userId} `).scrollTop();     
  });
    if(data.isGroup!=true){
      let leftMenu = `<a href="#${data.userId}" class="room-chat" data-target="#to_${data.userId}">
      <li class="person active un-read" data-chat="${data.userId}">
          <div class="left-avatar">
              <img src="${data.avatar}" alt="">
          </div>
          <span class="name">
                  ${data.userName}
          </span>
          <span class="time">
                          vài giây trước
             </span>
          <span class="preview"><div class="bubble you" data-mess-id="${data.userId}">${data.messages}
      </div></span>
            </li>
        </a>`
      let message = `<div class="bubble you" data-mess-id="${data.userId}">${data.messages}
      </div>`
      $(`.chat.${data.userId}`).append(message)
      let liLeft =$(".people").find(`li[data-chat=${data.userId}]`)
      liLeft.parent().remove()
      $('.people').prepend(leftMenu)
      liLeft.children(".preview").html(message)
      liLeft.find('span.time').html("vài giây trước")
      nineScrollRight(data.userId)
     
    }else{
      let leftMenu = `<a href="#uid${data.idGroup}" class="room-chat
      <" data-target="#to_${data.idGroup}">
    <li class="person group-chat un-read" data-chat="${data.idGroup}">
      <div class="left-avatar">
          <div class="dot"></div>
          <img src="./images/users/group-avatar-trungquandev.png" alt="">
      </div>
      <span class="name group-chat-name">
          Group:${data.name}
      </span>
      <span class="time
      "> 
        vài giây trước
          
      </span>
      <span class="preview"><div class="bubble you" data-mess-id="${data.idGroup}">
    <img class="message-image" src="/images/users/9cb6d053-36c0-4489-a3a8-2a113ff61abe-tải xuống.jpg" title="Admin" alt="">
    ${data.messages}</div></span>
      </li>
    </a>`
        let message = `<div class="bubble you" data-mess-id="${data.idGroup}">
        <img class="message-image" src="${data.avatar}" title="${data.userName}" alt="">
        ${data.messages}</div>`
        $(`.chat.${data.idGroup}`).append(message)
        let a =$(".people").find(`li[data-chat=${data.idGroup}]`)
        a.children(".preview").html(message)
        let liLeft =$(".people").find(`li[data-chat=${data.idGroup}]`)
        liLeft.parent().remove()
        $('.people').prepend(leftMenu)
        nineScrollRight(data.idGroup)

      }
  })
});

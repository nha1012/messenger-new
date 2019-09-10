function textAndEmojiChat(chatId) {
  $(".emojionearea").on("keyup", function (element) {
    if(element.which===13){
      let targetId= $(`#write-chat-${chatId}`).data('chat')
      let message = $(`#write-chat-${chatId}`).val()
      if(!targetId.length && !message.length){
        return false
      }
      let data = {
        targetId:targetId,
        message:message
      }
    if( $(`#write-chat-${chatId}`).hasClass('group-chat')){
      data.isGroup = true;
    }
    $.post("/message/add-new-text-emoji", data,
      function (result) {
        console.log(result);
        
      }
    );
    }
  })
}
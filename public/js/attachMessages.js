let attachMessages = (divId)=>{
  $(`.attach-chat.${divId}`).unbind('change').on('change',function () {
    let fileData =$(this).prop('files')[0]
    let imageFormData = new FormData()
    imageFormData.append('my-attach-chat', fileData)
    imageFormData.append('targetId', divId )
    if($(this).hasClass('group-chat')){
      imageFormData.append('isGroup', true )
    }else{
      imageFormData.append('isGroup', false )
    }
    $.ajax({
      type: "post",
      url: "/message/add-new-attach",
      cache:false,
      data: imageFormData,
      contentType:false,
      processData:false,
      success: function (data) {
        socket.emit('client-add-new-attach-message',data)
        let message = `<div class="bubble me bubble-image-file" data-mess-id="${data.receiverId}">
        <a href="data:${toBase64(data.file.contentType.data)};base64,${toBase64(data.file.data.data)}%>" 
        download="${data.file.fileName}">
          ${data.file.fileName}
        </a>
    </div>`
        $(`.chat.${data.receiverId}`).append(message)
        nineScrollRight(data.receiverId) 
      },
      error:function(err){
        alertify.errors(err.responseText, 7)
      }
    });
  })
}
function toBase64(dataBuffer) {
  let binary = '';
  let bytes = new Uint8Array( dataBuffer );
  let len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
      binary += String.fromCharCode( bytes[ i ] );
  }
  return window.btoa( binary );
}
$(document).ready(function () {
  socket.on('server-add-new-attach-message', function (data) {
    let message = `<div class="bubble you bubble-image-file" data-mess-id="${data.senderId}">
      <a href="data:${toBase64(data.file.contentType.data)};base64,${toBase64(data.file.data.data)}%>" 
      download=" ${data.file.fileName}">
        ${data.file.fileName}
      </a>
      </div>`
    $(`.chat.${data.senderId}`).append(message)
    nineScrollRight(data.senderId)
  })
});
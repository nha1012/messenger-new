let imageMessages = (divId)=>{
  $(`#image-chat-${divId}`).unbind('change').on('change',function () {
    let fileData =$(this).prop('files')[0]
    let math=['image/jpg','image/png','image/jpeg']
    let sizeImage = 1048576 //1MB
    if($.inArray(fileData.type, math)=== -1){
      alertify.notify('Kieu file khong hop le (jpg,png)','error',7)
      $(this).val(null)
      return false;
    }
    if(fileData.size>sizeImage){
      alertify.notify('File anh qua lon','error',7)
      $(this).val(null)
      return false;
    }
    let imageFormData = new FormData()
    imageFormData.append('my-image-chat', fileData)
    imageFormData.append('targetId', divId )
    if($(this).hasClass('group-chat')){
      imageFormData.append('isGroup', true )
    }else{
      imageFormData.append('isGroup', false )
    }
    $.ajax({
      type: "post",
      url: "/message/add-new-image",
      cache:false,
      data: imageFormData,
      contentType:false,
      processData:false,
      success: function (data) {
        socket.emit('client-add-new-image-message',data)
        let message = `<div class="bubble me bubble-image-file" data-mess-id="${data.senderId}">
        <a data-fancybox="gallery" href="data:${toBase64(data.file.contentType.data)};base64,${toBase64(data.file.data.data)}">
            <img src="data:${toBase64(data.file.contentType.data)};base64,${toBase64(data.file.data.data)}" class="show-image-chat">
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
  socket.on('server-add-new-image-message', function (data) {
    let message = `<div class="bubble you bubble-image-file" data-mess-id="${data.senderId}">
    <a data-fancybox="gallery" href="data:${toBase64(data.file.contentType.data)};base64,${toBase64(data.file.data.data)}">
        <img src="data:${toBase64(data.file.contentType.data)};base64,${toBase64(data.file.data.data)}" class="show-image-chat">
    </a>
    </div>`
    $(`.chat.${data.senderId}`).append(message)
    nineScrollRight(data.senderId)
  })
});
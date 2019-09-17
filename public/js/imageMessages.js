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
      success: function (response) {
        console.log(response);
      },
      error:function(err){
        alertify.errors(err.responseText, 7)
      }
    });
  })
}
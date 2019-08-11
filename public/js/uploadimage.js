
let userAvatar= null
let userInfo={}
let userInfoOld={}
let srcNew
function updateImage(){
  $("#input-change-avatar").bind('change',function(){
    let fileData = $(this).prop('files')[0]
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
    let imageEditProfile=$('#image-edit-profile')
    imageEditProfile.empty()
    let fileReader= new FileReader();
    fileReader.onload = function(element){
      srcNew = element.target.result
      $('<img/>',{
        "src": element.target.result,
        "class": 'avatar img-circle',
        "id":'preview-image',
        'alt':'avatar'
      }).appendTo(imageEditProfile)
    }
    imageEditProfile.show();
    fileReader.readAsDataURL(fileData);
    let formData = new FormData()
    formData.append('avatar', fileData)
    userAvatar = formData
  })
}
function callUpdateAvatar(){
  $.ajax({
    type: "put",
    url: "/user/update-avatar",
    cache:false,
    data: userAvatar,
    contentType:false,
    processData:false,
    success: function (result) {
      let srcNewImage= $('#preview-image').attr('src')
      $('#avatar-right').attr('src', srcNewImage )
      $("#button-remove").click()
      $("#preview-image").attr('src', srcNew)
      alertify.success(result, 7)
      userAvatar= null
    },
    error:function(err){
      alertify.errors(`Thay đổi avatar không thành công1 ${err.responseText}`, 7)
    }
  });
}
function callUpdateInfo() {
  $.ajax({
    type: "put",
    url: "/user/update-info",
    data: userInfo,
    success: function (result) {
      alertify.success(result, 7)
      userInfoOld = Object.assign(userInfoOld, userInfo)
      userInfo={}
    },
    error:function(err){
      alertify.errors(`Cập nhật không thành công ${err.responseText}`, 7)
    }
  });
}
function update() {
  $("#button-save").bind('click', function(){
    if(userAvatar==null && $.isEmptyObject(userInfo)){
      alertify.error("Phải thay đổi trước khi lưu", 7)
      return
    }
    //call request updata avatar
    if(userAvatar!=null){
       callUpdateAvatar()
    }
    if(!$.isEmptyObject(userInfo)){
      callUpdateInfo()
    }
  })
}
function remove(){
  $("#button-remove").bind('click', function(){

    $("#input-change-name").val(userInfoOld.userName)
    $("#input-change-gender").val(userInfoOld.gender)
    $("#input-change-address").val(userInfoOld.address)
    $("#input-change-phone").val(userInfoOld.phone)
    userAvatar= null
    userInfo={}
  })
  
}
function addUserInfo() {
  $("#input-change-name").bind('change', function(){
    userInfo.userName = $(this).val()
  })
  $("#input-change-male").bind('click', function(){
    userInfo.gender= $(this).val()
  })
  $("#input-change-female").bind('click', function(){
    userInfo.gender=$(this).val()
  })
  $("#input-change-address").bind('change', function(){
    userInfo.address = $(this).val()
  })
  $("#input-change-phone").bind('change', function(){
    userInfo.phone = $(this).val()
  })
  
}
function infoOld(){
  userInfoOld.userName = $("#input-change-name").val()
  userInfoOld.gender = $("#input-change-gender").val()
  userInfoOld.address = $("#input-change-address").val()
  userInfoOld.phone = $("#input-change-phone").val()
}
$(document).ready(function () {
  infoOld()
  updateImage()
  addUserInfo()
  remove()
  update()
});
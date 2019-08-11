let getPassword={}
function changePassword() {
  $('#passwordold').bind('change', function(){
    getPassword.passwordold = $(this).val()
  })
  $('#passwordnew').bind('change',function () {
    getPassword.passwordnew  = $(this).val()
  })
  $('#passwordnewconfirm').bind('change', function () {
    getPassword.passwordconfirm =$(this).val()
  })

}
function callSavePassword() {
  $.ajax({
    type:'put',
    url: "./user/update-password",
    data: getPassword,
    success: function (result) {
      $("#alert-success").css('display', 'block')
      $('#text-span-success').text(result)
    },
    error: function(err){
      $("#alert-error").css('display', 'block')
      $('#text-span-error').text(err.responseText)
    }
  });
}
function savePassword(){
  $("#save-password").bind('click', function () {
    if($.isEmptyObject(getPassword)){
      alertify.error('Phải thay đổi trước khi lưu', 7)
    }
    if(getPassword.passwordnew != getPassword.passwordconfirm){
      $('#text-span-error').text('Nhập lại 2 mật khẩu mới')
      $("#alert-error").css('display', 'block')
    }else {
      $("#alert-error").css('display', 'none')
      callSavePassword()
    }
  })
}
function cancelPassword() {
  getPassword={}
}
$(document).ready(function () {
  changePassword()
  savePassword()
  cancelPassword()
});
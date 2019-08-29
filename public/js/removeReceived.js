$(document).ready(function () {
  let idContacts={}
  $(document).on('click','.user-reject-request-contact-received',function () {
    idContacts.id = $(this).attr('data-uid')
    if(!$.isEmptyObject(idContacts)){
       $.ajax({
        type: "delete",
        url: "/contact/remove-received",
        data: idContacts,
        success: function (response) {
          changeDown('count-request-contact-received')
          $('#request-contact-received').find(`li[data-uid=${idContacts.id}]`).remove()
          $(this).remove()
          alertify.success('Đã xóa thành công.') 
          idContacts={}
          
        }
    });  
    }else{
      alertify.error('Lỗi.')
    }
      
  })
});
$(document).ready(function () {
  $('.remove-all-notif').on('click', function () {
    let isNotif=$(".all-notif").find('div')
    if(isNotif.length>0){
      $.ajax({
      type: "delete",
      data: "data",
      url: "/notif/remove-all",
      success: function (response) {
        alertify.success("Đã xóa thành công.",7)
        $(".all-notif div").remove()
      }
    });
    }else{
      alertify.error("không có thông báo.",7)
    }
    
    })
});
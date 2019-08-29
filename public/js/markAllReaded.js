function markAllReaded(){
  $(".mark-all-readed").bind('click', function () {
    let unread = $('.noti_content').find('div.isread')    
    if(+unread.length>0){
      $.ajax({
      type: "get",
      url: "/notification/mark-all-readed",
      success: function (response) {
        $(".noti_counter").html('0');
        $('.isread').removeClass('isread');
      }
    });
    }else{
      alertify.error("Không có thông báo chưa đọc.",7)
    }
    
  })
}
$(document).ready(function () {
  markAllReaded()
});
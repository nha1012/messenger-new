let name = {}
let dataId={}
let contactId={}
let waitUser=+$(".span-wait-accept").text()
function callFindUser() {
  $.ajax({
    type: "put",
    url: "/user/find-contacts",
    data: name,
    success: function (result) {
      callLoad()
    },
    error:function(err){
    }
  });
}
function callLoad(){
  $("#contact-list").load('/ #contact-list' )
}
function find() {
  $("#find-contact").bind('click', function(e){
    e.preventDefault()
    if($.isEmptyObject(name)){
      return alertify.error("Nhập tên rồi mới tìm!!", 7)
     }
    callFindUser()
  })

}
function searchContact() {
  $("#input-search-user").bind('change', function(){
    name.name = $(this).val()
  })
}
function getIdContact() {

  $("#contact-list").on('click', '.user-add-new-contact', function(e){
    dataId.id = $(this).attr("data-uid");
    callAjaxPutId(this)

  })
}

function callAjaxPutId(target){
  $.ajax({
    type: "put",
    url: "user/add-contact",
    data: dataId,
    success: function (result) {  
      socket.emit("Client-sent-data", "Hello world");
      socket.on("Server-sent-data", function(data)
      {
      // let notify=`<span data-uid="${data.id}">
      //   <img class="avatar-small" src="${data.avatar}"> 
      //   <strong>${data.userName}</strong> đã gửi cho bạn một lời mời kết bạn!
      //   </span><br><br><br>`
        console.log(data);
        // $(".noti_content").prepend(notify);
      });
      

      $(".span-wait-accept").text(waitUser)
      $(target).next().css({'display':'block'})
      $(target).css({'display':'none'})
      alertify.success(result, 7)

    },
    error: function(){
      alertify.error("Lỗi", 7)
    }
  });  
}
function callRemoveContact(target) {
  $.ajax({
    type: "delete",
    url: "/contact/delete-contact",
    data: contactId,
    success: function (response) {
      $(".span-wait-accept").text(waitUser)
      $(target).prev().css('display','block')
      $(target).css('display','none')
      alertify.success(response,7)
    },
    error: function(){
      console.log('that bai');
    }
  });
}
function removeContact() {
  $("#contact-list").on('click','.user-remove-request-contact', function(){
     contactId.id = $(this).attr("data-uid");
    callRemoveContact(this)
  })
}
$(document).ready(function () {
  
  searchContact()
  find()
  getIdContact()
  removeContact()
});
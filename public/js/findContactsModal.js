let name = {}
let dataId={}
let contactId={}
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
    
  socket.on("server-add-new-contact", function(data)
  {
  let notify=`<span data-uid="${data.id}">
    <img class="avatar-small" src="${data.avatar}"> 
    <strong>${data.userName}</strong> đã gửi cho bạn một lời mời kết bạn!
    </span><br><br><br>`

  let info =` 
      <li class="_contactList" data-uid="${data.id}">
      <div class="contactPanel">
      <div class="user-avatar">
          <img src="${data.avatar}">
      </div>
      <div class="user-name">
          <p>
              ${data.userName}
          </p>
      </div>
      <br>
      <div class="user-address">
          <span>&nbsp; ${data.address}.</span>
      </div>
      <div class="user-acccept-contact-received" data-uid="${data.id}">
          Chấp nhận
      </div>
      <div class="user-reject-request-contact-received action-danger" data-uid="${data.id}">
          Xóa yêu cầu
      </div>
    </div></li>`
    $("#request-contact-received .contactList").prepend(info)
    $(".noti_content").prepend(notify);
    changeUp('count-request-contact-received')
    changeUp('noti_counter')
    changeUp('noti_contact_counter')
  });
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
      socket.emit("client-add-new-contact", dataId);
      $(target).css({'display':'none'})
      $(target).next().css({'display':'block'})
      alertify.success(result, 7)
      changeUp('span-wait-accept')
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
      socket.emit('client-remove-contact', contactId)
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
  socket.on("server-remove-contact", function(data){
    changeDown('count-request-contact-received')
    changeDown('noti_counter')
    changeDown('noti_contact_counter')
    $(".noti_content").find(`span[data-uid= ${data.id}]`).remove()
  })
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
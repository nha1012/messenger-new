let name = {}
let dataId={}
let contactId={}
function callFindUser() {
  $.post("/user/find-contacts",{name : name.name},
    function(element) {
      $(".contactList.find-user li").remove()
      element.forEach(result => {
        let user =`
      <li class="_contactList" data-uid="${result._id}">
      <div class="contactPanel">
          <div class="user-avatar">
              <img src="${result.avatar}" alt="">
          </div>
          <div class="user-name">
              <p>
              ${result.userName}
              </p>
          </div>
          <br>
          <div class="user-address">
                  <span>&nbsp${result.address}</span>
              </div>
          <div class="user-add-new-contact" data-uid="${result._id}">
              Thêm vào danh sách liên lạc
          </div>
          <div class="user-remove-request-contact sent action-danger" data-uid="${result._id}">
              Hủy yêu cầu
          </div>
      </div>
</li>    
      `
    $(".contactList.find-user").append(user);
      });
    },
  );
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
  let notify=`<div class="isread" data-uid="${data._id}">
  <img class="avatar-small" src="${data.avatar}"> 
  <strong>${data.userName}</strong> đã gửi cho bạn một lời mời kết bạn!
  </div>`
  let info =` <li class="_contactList" data-uid="${data.id}">
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
  $(document).on('click', '.user-add-new-contact', function(e){
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
      let user = `<li class="_contactList" data-uid="${result.user.id}">
      <div class="contactPanel">
          <div class="user-avatar">
              <img src="${result.user.avatar}" alt="">
          </div>
          <div class="user-name">
              <p>
                  nguyenphucnha111
              </p>
          </div>
          <br>
          <div class="user-address">
                  <span>${result.user.address};</span>
              </div>
          <div class="user-remove-request-contact action-danger contact-important" data-uid="${result.user.id}" style="display: block;">
              Hủy yêu cầu
          </div>
      </div>
</li>`
      $("#request-contact-sent .contactList").prepend(user)
      socket.emit("client-add-new-contact", dataId);
      $(target).css({'display':'none'})
      $(target).next().css({'display':'block'})
      alertify.success(result.message, 7)
      $('.require').remove()
      changeUp('span-wait-accept')
    },
    error: function(){
      alertify.error("Lỗi", 7)
    }
  });  
}
function callRemoveContact(target) {
  if(!$.isEmptyObject(contactId)){
    $.ajax({
      type: "post",
      url: "/contact/delete-contact",
      data: contactId,
      success: function (response) {
        socket.emit('client-remove-contact', contactId)
        $(target).prev().css('display','block')
        $(target).css('display','none')
        $(target).parent().parent().remove()
        $('#request-contact-sent').find(`li[data-uid=${contactId.id}]`).remove()
        $('#contact-list').find(`li[data-uid=${contactId.id}]`).remove()
        changeDown('span-wait-accept')
        alertify.success(response,7)
        contactId={}
      },
      error: function(){
        alertify.error("Khong xoa duoc",7)
      }
    });
  }

}
function removeContact() {
  socket.on("server-remove-contact", function(data){
    changeDown('count-request-contact-received')
    changeDown('noti_counter')
    changeDown('noti_contact_counter')
    $(".noti_content").find(`span[data-uid= ${data.id}]`).remove()
  })
  $(document).on('click','.user-remove-request-contact', function(){
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
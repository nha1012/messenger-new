let idReceived ={}
function callAjax() {
  $.ajax({
    type: "post",
    url: "/contact/accept-received",
    data: idReceived,
    success: function (user) {
      socket.emit('client-received-contact', idReceived)
      let users = `<li class="_contactList" data-uid="${user.id}">
      <div class="contactPanel">
          <div class="user-avatar">
              <img src="${user.avatar}">
          </div>
          <div class="user-name">
              <p>
              ${user.userName}
              </p>
          </div>
          <br>
          <div class="user-address">
              <span>&nbsp; ${user.address}.</span>
          </div>
          <div class="user-talk" data-uid="${user.id}">
              Trò chuyện
          </div>
          <div class="user-remove-contact action-danger" data-uid="${user.id}">
              Xóa liên hệ
          </div>
      </div>
    </li>`
      $(".list-friend").prepend(users);
      $('#list-received').find(`li[data-uid=${idReceived.id}]`).remove()
      changeUp('count-contacts')
      changeDown('count-request-contact-received')
      alertify.success('Đã thành bạn bè.')
    }
  });
}
$(document).ready(function () {
  socket.on('server-received-contact', function(data){
    let notif = `<div class="isread" data-uid="${data.id}">
    <img class="avatar-small" src="${data.avatar}"> 
    <strong>${data.userName}</strong> đã chấp nhận lời mời kết bạn của bạn!
    </div>`
    let user =`<li class="_contactList" data-uid="${data.id}">
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
        <div class="user-talk" data-uid="${data.id}">
            Trò chuyện
        </div>
        <div class="user-remove-contact action-danger" data-uid="${data.id}">
            Xóa liên hệ
        </div>
    </div>
  </li>`
  $('.list-friend').prepend(user)
  $('.noti_content').prepend(notif)
  changeUp('count-contacts')
  })
  $(document).on('click', '.user-acccept-contact-received', function () {
    idReceived.id = $(this).attr('data-uid')
    callAjax();
  })
});
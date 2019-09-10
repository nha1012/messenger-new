
let idFriend ={}
function removeFriend(target) {
  idFriend.id = $(target).data('uid')
  $.ajax({
    type: "delete",
    url: "/contact/remove-friend",
    data: idFriend,
    success: function (result) {
      socket.emit('client-remove-friend', idFriend)
      $(target).parent().remove()
      changeDown('count-contacts')
    }
  });
}

$(document).ready(function () {
  socket.on('server-remove-friend', function (data) {
    $('.list-friend').find(`li[data-uid=${data.id}]`).remove()
    changeDown('count-contacts')
  })
  $(document).on('click', '.user-remove-friend', function () {
    removeFriend(this)
  })
});
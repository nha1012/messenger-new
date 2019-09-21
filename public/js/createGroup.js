let dataUser={}
let dataGroup = {name:"",arrUser:[]}
let getDataUser = ()=>{
  $('#btn-search-friend-to-add-group-chat').unbind('change').on('change', function (event) {
    dataUser.userName= $(this).val()
  })
}
let callSearchFriend=()=>{
  $('.search-friend-to-create-group').unbind('click').on('click', function () {
    $.post("/group/find-to-create-group", dataUser,
    function (data) {
        dataUser={}
        $("#group-chat-friends").empty();
        data.forEach(element => {
          let user = `<div data-uid="${element._id}">
          <li data-uid="${element._id}">
              <div class="contactPanel">
                  <div class="user-avatar">
                      <img src="${element.avatar}" alt="">
                  </div>
                  <div class="user-name">
                      <p>
                      ${element.userName}
                      </p>
                  </div>
                  <br>
                  <div class="user-address">
                      <span>&nbsp; ${element.address}</span>
                  </div>
                  <div class="add-user" data-uid="${element._id}">
                      Thêm vào nhóm
                  </div>
              </div>
          </li>
      </div>`
      $("#group-chat-friends").append(user)
        });
      }
    );
  })
}
let getNameGroup=()=>{
  $('#name-group-chat').on('change', function () {
    dataGroup.name = $(this).val()
  })
}
let callCreateGroup=()=>{
  getNameGroup()
  $("#create-group-chat").unbind('click').on('click', function () {
    let friendsAdd = $('#friends-added').find('li')
    if (friendsAdd.length<2) {
      alertify.error('Nhóm phải có trên 2 người bao gồm bạn.',7)
      return false
    }
    if (dataGroup.name.length<5 || dataGroup.name.length>30) {
      alertify.error('Tên nhóm phải lớn hơn 4 ký tự và không quá 30 ký tự.',7)
      return false
    }
    dataGroup.userAmount= friendsAdd.length+1
    $.each(friendsAdd, function (indexInArray, valueOfElement) { 
      dataGroup.arrUser.push({"userId":$(valueOfElement).data('uid')})
    });
    $.post("/group/create-group", dataGroup,
      function (data) {
        socket.emit('client-add-new-group', data)
        alertify.success("Đã tạo nhóm thành công.", 7)
        $("#groupChatModal").click()
        let groupLeft = `<a href="#${data._id}" class="room-chat
        <" data-target="#to_${data._id}">
        <li class="person group-chat" data-chat="${data._id}">
            <div class="left-avatar">
  
                <img src="./images/users/group-avatar-trungquandev.png" alt="">
            </div>
            <span class="name group-chat-name">
                Group:${data.name}
            </span>
            <span class="time
            "> </span>
            <span class="preview"></span>
        </li>
    </a>`
    let groupRight = `<div class="right tab-pane " data-chat="" id="to_${data._id}">
    <div class="top">
        <span>To: <span class="name">         
        ${data.name}
 
       
    </span></span></div>  
    <div class="content-chat">
        <div class="chat ${data._id}" data-chat="${data._id}" tabindex="6" style="overflow-y: hidden; outline: none;">
        </div>
    </div>
    <div class="write" data-chat="${data._id}">
    <input type="text" class="write-chat group-chat" id="write-chat-${data._id}" data-chat="${data._id}">
    <div class="icons">
        <a href="#" class="icon-chat" data-chat="<%= conver.id%>"><i class="fa fa-smile-o"></i></a>
        <label for="image-chat-${data._id}">
            <input type="file" id="image-chat-<%= conver.id%>" name="my-image-chat " class="image-chat group-chat" data-chat="${data._id}">
            <i class="fa fa-photo"></i>
        </label>
        <label for="attach-chat">
            <input type="file" id="attach-chat" name="my-attach-chat" class="attach-chat ${data._id} group-chat" data-chat="${data._id}">
            <i class="fa fa-paperclip"></i>
        </label>
        <a href="#streamModal" id="video-chat" class="video-chat" data-chat="${data._id}" data-toggle="modal">
            <i class="fa fa-video-camera"></i>
        </a>
        <input type="hidden" id="peer-id" value="">
    </div>
</div>
</div>`
        $(".people").prepend(groupLeft)
        $("#screen-chat").prepend(groupRight)
        $('ul.people').find("a")[0].click()

      }
    );
  })
}
$(document).ready(function () {
  socket.on('server-add-new-group',function (data) {
    alertify.success(`Có người đã thêm bạn vào nhóm ${data.name}.`, 7)
    $("#groupChatModal").click()
    let groupLeft = `<a href="#${data._id}" class="room-chat
    <" data-target="#to_${data._id}">
    <li class="person group-chat" data-chat="${data._id}">
        <div class="left-avatar">
            <img src="./images/users/group-avatar-trungquandev.png" alt="">
        </div>
        <span class="name group-chat-name">
            Group:${data.name}
        </span>
        <span class="time
        "> </span>
        <span class="preview"></span>
    </li>
</a>`
let groupRight = `<div class="right tab-pane " data-chat="" id="to_${data._id}">
<div class="top">
    <span>To: <span class="name">         
    ${data.name}
</span></span></div>  
<div class="content-chat">
    <div class="chat ${data._id}" data-chat="${data._id}" tabindex="6" style="overflow-y: hidden; outline: none;">
    </div>
</div>
<div class="write" data-chat="${data._id}">
<input type="text" class="write-chat group-chat" id="write-chat-${data._id}" data-chat="${data._id}">
<div class="icons">
    <a href="#" class="icon-chat" data-chat="<%= conver.id%>"><i class="fa fa-smile-o"></i></a>
    <label for="image-chat-${data._id}">
        <input type="file" id="image-chat-<%= conver.id%>" name="my-image-chat " class="image-chat group-chat" data-chat="${data._id}">
        <i class="fa fa-photo"></i>
    </label>
    <label for="attach-chat">
        <input type="file" id="attach-chat" name="my-attach-chat" class="attach-chat ${data._id} group-chat" data-chat="${data._id}">
        <i class="fa fa-paperclip"></i>
    </label>
    <a href="#streamModal" id="video-chat" class="video-chat" data-chat="${data._id}" data-toggle="modal">
        <i class="fa fa-video-camera"></i>
    </a>
    <input type="hidden" id="peer-id" value="">
</div>
</div>
</div>`
    $(".people").prepend(groupLeft)
    $("#screen-chat").prepend(groupRight)
    $('ul.people').find("a")[0].click()

  })
  getDataUser()
  callSearchFriend()
  callCreateGroup()
});
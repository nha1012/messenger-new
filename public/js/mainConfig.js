/**
 * Created by https://trungquandev.com's author on 25/02/2018.
 */
let socket = io();
function nineScrollLeft() {
  $('.left').niceScroll({
    smoothscroll: true,
    horizrailenabled: false,
    cursorcolor: '#ECECEC',
    cursorwidth: '7px',
    scrollspeed: 50
  });
}

function nineScrollRight(chatId) {
  $(".chat").niceScroll({
    smoothscroll: true,
    horizrailenabled: false,
    cursorcolor: '#ECECEC',
    cursorwidth: '7px',
    scrollspeed: 50
  });
  $(`.chat.${chatId}`).scrollTop($(`.${chatId}`)[0].scrollHeight);
  $(`.chat.${chatId}`).getNiceScroll().resize()
}

function enableEmojioneArea(chatId) {
  $(`#write-chat-${chatId}`).emojioneArea({
    standalone: false,
    pickerPosition: 'top',
    filtersPosition: 'bottom',
    tones: false,
    autocomplete: false,
    inline: true,
    hidePickerOnBlur: true,
    search: false,
    shortnames: false,
    events: {
      keyup: function(editor, event) {
        $(`#write-chat-${chatId}`).val(this.getText());
        typingOn(chatId)
      },
      click: function () {
        textAndEmojiChat(chatId)
        typingOn(chatId)
      },
      blur:function () {
        typingOff(chatId)
      }
    },
  });
  $('.icon-chat').bind('click', function(event) {
    event.preventDefault();
    $('.emojionearea-button').click();
    $('.emojionearea-editor').focus();
  });
}

function spinLoaded() {
  $('#loader').css('display', 'none');
}

function spinLoading() {
  $('#loader').css('display', 'block');
}

function ajaxLoading() {
  $(document)
    .ajaxStart(function() {
      spinLoading();
    })
    .ajaxStop(function() {
      spinLoaded();
    });
}

function showModalContacts() {
  $('#show-modal-contacts').click(function() {
    $(this).find('.noti_contact_counter').fadeOut('slow');
  });
}

function configNotification() {
  $('#noti_Button').click(function() {
    $('#notifications').fadeToggle('fast', 'linear');
    $('.noti_counter').fadeOut('slow');
    return false;
  });
  $(".main-content").click(function() {
    $('#notifications').fadeOut('fast', 'linear');
  });
}




function addFriendsToGroup() {
  $('ul#group-chat-friends').on('click','div.add-user', function() {
    let uid = $(this).data('uid');
    $(this).remove();
    let html = $('ul#group-chat-friends').find('div[data-uid=' + uid + ']').html();
    let promise = new Promise(function(resolve, reject) {
      $('ul#friends-added').append(html);
      $('#groupChatModal .list-user-added').show();
      resolve(true);
    });
    promise.then(function(success) {
      $('ul#group-chat-friends').find('div[data-uid=' + uid + ']').remove();
    });
  });
}

function cancelCreateGroup() {
  $('#cancel-group-chat').bind('click', function() {
    $('#groupChatModal .list-user-added').hide();
    if ($('ul#friends-added>li').length) {
      $('ul#friends-added>li').each(function(index) {
        $(this).remove();
      });
    }
  });
}
function removeUnRead(target) {
  let data={isGroup:false}
  data.id = $(target).children().attr('data-chat')  
  if ($(target).children().hasClass('group-chat')) {
    data.isGroup=true
  }
  if ($(target).children().hasClass('un-read')==true){
    $.post("/message/mark-readed", data,
        function (result) {
          console.log(result);
        }
      )
      $(target).children().removeClass('un-read')
  }else{
    return false
  }
}
function changeScreenChat(divId) {
  $(".people").unbind("click").on('click','.room-chat', function () {
    divId = $(this).find('li').data("chat")
    $(this).tab("show")
    $(".room-chat").find('li').removeClass('active')
    $(this).find('li').addClass('active')   
    removeUnRead(this)
    // Bật emoji, tham số truyền vào là id của box nhập nội dung tin nhắn
    nineScrollRight(divId)
    enableEmojioneArea(divId);
    imageMessages(divId)
    attachMessages(divId)
    })
  }
$(document).ready(function() {
  changeScreenChat()
  // Hide số thông báo trên đầu icon mở modal contact
  showModalContacts();
  // Bật tắt popup notification
  configNotification();

  // Cấu hình thanh cuộn
  nineScrollLeft();
  // Icon loading khi chạy ajax
  // Hiển thị hình ảnh grid slide trong modal tất cả ảnh, tham số truyền vào là số ảnh được hiển thị trên 1 hàng.
  // Tham số chỉ được phép trong khoảng từ 1 đến 5
  // Thêm người dùng vào danh sách liệt kê trước khi tạo nhóm trò chuyện
  addFriendsToGroup();

  // Action hủy việc tạo nhóm trò chuyện
  cancelCreateGroup();
  $('ul.people').find("a")[0].click()
});

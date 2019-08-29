$(document).ready(function () {
  $('.is-friend').on('click', function () {
    let skip = $('.list-friend').find('li')
    console.log(skip.length);
    $.post("/contact/read-more", {skip:skip.length},
      function (data) {
        if(data.length>0){
          data.forEach(element => {
            let item =`
            <li class="_contactList" data-uid="${element._id}">
            <div class="contactPanel">
                <div class="user-avatar">
                    <img src="${element.avatar}">
                </div>
                <div class="user-name">
                    <p>
                    ${element.userName}
                    </p>
                </div>
                <br>
                <div class="user-address">
                    <span>${element.address}.</span>
                </div>
                <div class="user-talk" data-uid="${element._id}">
                    Trò chuyện
                </div>
                <div class="user-remove-contact action-danger" data-uid="${element._id}">
                    Xóa liên hệ
                </div>
            </div>
          </li>
            `
            $('.list-friend').append(item)
          });
        }else{
          $('a.load-more.is-friend').css('display','none')
        }
    
      }
    );
    
  })

});
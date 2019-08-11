let name = {}
let dataId={}
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
  $("#find-contact").bind('click', function(){
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
  $("#contact-list").on('click', '.user-add-new-contact', function(){
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
      $(target).remove();
      alertify.success(result, 7)
    },
    error: function(){
      alertify.error("Lỗi", 7)
    }
  });  
}
$(document).ready(function () {
  searchContact()
  find()
  getIdContact()
});
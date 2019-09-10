$(document).ready(function () {
  $("#select-type-chat").bind('change', function () {
    let selected = $('option:selected',this)
    $(selected).tab("show")    
    if($(this).val()=="user-chat"){
      $(".create-group-chat").hide()
    }else{
      $(".create-group-chat").show()
    }
  })
});
function changeUp(className){
  let numberNow = +$(`.${className}`).html();
  numberNow +=1
  if(numberNow==0){
    $(`.${className}`).css('display','none')
  }else{
    $(`.${className}`).css('display','block')
    $(`.${className}`).html(numberNow);
  }
  
}
function changeDown(className){
  let numberNow = +$(`.${className}`).html();
  numberNow --
  if(numberNow==0){
    $(`.${className}`).css('display','none')
  }else{
    $(`.${className}`).css('display','block')
    $(`.${className}`).html(numberNow);
  }
}
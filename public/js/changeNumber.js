function changeUp(className){
  let count = $(`.${className}`).find('i')
  let numberNow = +count.html();
  numberNow +=1
  if(numberNow==0){
    count.css('opacity','0')
    
  }else{
    count.css('  opacity','1')
    count.html(numberNow);
  }
  
}
function changeDown(className){
  let count = $(`.${className}`).find('i')
  let numberNow = +count.html() 
  numberNow -=1
  if(numberNow==0){
    count.css(' opacity','0')
  }else{
    count.css('  opacity','1')
    count.html(numberNow);
  }
}
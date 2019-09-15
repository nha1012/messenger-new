import moment from 'moment'
let convertTimeMessages=(time)=>{
  if(!time){
    return ''
  }
  return moment(time).locale('vi').startOf("seconds").fromNow()
}
module.exports = convertTimeMessages
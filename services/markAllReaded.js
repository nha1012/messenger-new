import notificationModel from '../model/Notification'
let markAllReaded=  (req,res)=>{
  notificationModel.model.findAllNotificationAndMarkReaded(req.user._id)
  .then(result=>{
    return res.status(200).send('Đánh dấu thành công');
  })
  .catch(err=>{
    return res.status(200).send(err);
  })
}
module.exports = markAllReaded
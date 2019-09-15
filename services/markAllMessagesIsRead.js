import messageModel from "../model/Message"
let markAllMessagesIsRead= async(req,res)=>{

  if(req.body.isGroup!="true"){
    await messageModel.model.markAllIsReadUser(req.body.id)
  }else{
    await messageModel.model.markAllIsReadGroup(req.body.id)
  }

}
module.exports = markAllMessagesIsRead
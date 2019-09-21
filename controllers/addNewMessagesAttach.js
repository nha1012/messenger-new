import multer from 'multer'
import fs from 'fs'
import addNewAttach from '../services/addNewMessagesAttachs'
import contactModel from '../model/Contact'
import groupModel from '../model/ChatGroup'
let storageMessageAttach = multer.diskStorage({
  destination : (req,file,callback)=>{
    callback(null,'./public/images/chat')
  },
  filename:(req,file,callback)=>{
    let nameImage = `${file.originalname}`
    callback(null,nameImage)
  }
}) 
let attachMessageUpload = multer({
  storage: storageMessageAttach
}).single('my-attach-chat')
let addNewMessagesAttach =async (req,res)=>{
  await attachMessageUpload( req,res,async(err)=>{
    if (err) {
      return res.status(500).send(err)
    }
    let messageImage =await addNewAttach(req,res)
    try {
      if(req.body.isGroup=="true"){
        await groupModel.afterAddNewMessage(req.body.targetId)
        await fs.unlinkSync(req.file.path)
        return res.status(200).send(messageImage)
      }else{
        await contactModel.afterAddMessage(req.user._id,req.body.targetId)
        await fs.unlinkSync(req.file.path)
        return res.status(200).send(messageImage)
      }
    } catch (error) {
      return res.status(500).send(error)
    }
  })
}
module.exports = addNewMessagesAttach
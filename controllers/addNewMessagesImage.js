import multer from 'multer'
import fsExtra from 'fs-extra'
import addNewImage from '../services/addNewMessageImage'
let storageMessageImage = multer.diskStorage({
  destination : (req,file,callback)=>{
    callback(null,'./public/images/chat')
  },
  filename:(req,file,callback)=>{
    let math=['image/jpg','image/png','image/jpeg']
    if(math.indexOf(file.mimetype)===-1){
      alertify.error('Kieu file khong hop le (jpg,png)',7)
      return callback('Kieu file khong hop le (jpg,png)',null)
    }
    let nameImage = `${file.originalname}`
    callback(null,nameImage)
  }
}) 
let imageMessageUpload = multer({
  storage: storageMessageImage,
  limits: {fileSize: 1048576}
}).single('my-image-chat')
let addNewMessagesImage =async (req,res)=>{
  await imageMessageUpload( req,res,async(err)=>{
    if (err) {
      return res.status(500).send(err)
    }
    await addNewImage(req,res)
  })
}
module.exports = addNewMessagesImage
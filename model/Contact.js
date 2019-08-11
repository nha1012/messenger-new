import mongoose from 'mongoose'
mongoose.set('useFindAndModify', false);
let contactSchema = new mongoose.Schema({
  userId:String,
  contactId:String,
  status:{type:Boolean,default:false},
  createdAt:{type:Number,default:Date.now},
  updatedAt:{type:Number,default:null},
  deletedAt:{type:Number,default:null},
}) 
contactSchema.statics= {
  createNewContact(item){
    return this.create(item)
  }
}
module.exports = mongoose.model('contact', contactSchema);
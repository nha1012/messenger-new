import mongoose from "mongoose";
mongoose.set('useFindAndModify', false);
let userSchema = new mongoose.Schema({
  userName : String,
  gender: {type:String, default:"NAM"},
  phone: {type:String,default:null},
  address: {type:String,default:'Không rõ địa chỉ.'},
  avatar: {type:String,default:"/images/users/avatar-default.png"},
  role:{type:String,default:"user"},
  local:{email:String,password:String,isactive:{type:Boolean,default:false},verifytoken:String},
  facebook:{uid:String,token:String,email:{type:String,trim:true}},
  google:{uid:String,token:String,email:{type:String,trim:true}},
  createdAt:{type:Number,default:Date.now},
  updateAt:{type:Number,default:null},
  deleteAt:{type:Number,default:null},
  isUpdateAvatar:{type:Boolean, default:false}
})
userSchema.statics ={
  createNewUser(item){
    return this.create(item);
  },
  findByEmail(email){
    return this.findOne({'local.email':email}).exec()
  },
  findByIdUser(idUser){
    return this.findById(idUser).exec()
  },
  findAndRemoveUser(id){
    return this.findByIdAndRemove(id) },
  findAndUpdateUser(token){
    return this.findOneAndUpdate(
       {'local.verifytoken':token},
       {$set:{'local.isactive':true, 'local.verifytoken':null}},
       {new: true},
       (err,doc)=>{
         if (err) {
           throw err
         }
         mongoose.set('useNewUrlParser', true);
       }
     )
  },
  findByUidFacebook(uid){
    return this.findOne({'facebook.uid':uid}).exec()
  },
  findAndUpdateUserById(id,item){
    return this.findOneAndUpdate(id, item).exec()
  },
  findAndUpdatePassword(id,password){
    return this.findOneAndUpdate(id, {'local.password':password}).exec()
  },
  findUserByName(name,isContact){
    return this.find(
      {
        $and:[
          { 'userName': { $regex: '.*' + name + '.*' }},
          {'_id':{$nin:isContact}}
        ] 
      }
      ).select('-local').exec()
  },
  findByIdUserNoneLocal(idUser){
    return this.findById(idUser).select('-local').exec()
  }
}
module.exports = mongoose.model("user", userSchema);
import mongoose from 'mongoose'
mongoose.set('useFindAndModify', false);
let contactSchema = new mongoose.Schema({
  userId:String,
  contactId:String,
  status:{type:Boolean,default:false},
  createdAt:{type:Number,default:Date.now()},
  updatedAt:{type:Number,default:null},
  deletedAt:{type:Number,default:null},
}) 
contactSchema.statics= {
  createNewContact(item){
    return this.create(item)
  },
  findContactById(id){
    return this.find({userId:id}).exec()
  },
  checkContact(userId,contactId){
    return this.findOne({
      $or:[
        {
          $and:[
            {'userId':userId},
            {'contactId':contactId}
              ]
           },
         { $and:[
            {"userId":contactId},
            {'contactId':userId}
              ]}
      ]
    }).exec()
  },
  findAndRemoveById(id){
    return this.findOneAndRemove({'userId':id}).exec()
  },
  findAndRemoveContactSender(idContact,userId){
    return this.findOneAndRemove(
      {$and:[
        {'userId':userId},
        {'contactId':idContact}
      ]}
    ).exec()
  },
  findAndRemoveByIdContact(contactId,userId){
    return this.findOneAndRemove(
      {$and:[
        {'userId':contactId},
        {'contactId':userId}
      ]}
      ).exec()
  },
  findAndUpdateToFriend(userId,contactId){
    return this.findOneAndUpdate(
      {$and:[
        {'userId':contactId},
        {'contactId':userId}
      ]},
      {'status':true, 'updatedAt':Date.now()}
    ).exec()
  }
  ,
  getFriend(idUser,limit){
    return this.find(
   {   $or : [
        { $and : [
        {'userId':idUser},
        {'status':true}
      ]},
      { $and : [
        {'contactId':idUser},
        {'status':true}
      ]}
      ]}
    ).limit(limit).exec()
  },
  findAndRemoveFriend(idUser,idContact){
    return this.findOneAndRemove(
      {   $or : [
        { $and : [
        {'userId':idUser},
        {'contactId':idContact},
        {'status':true}
      ]},
      { $and : [
        {'contactId':idUser},
        {'userId':idContact},
        {'status':true}
      ]}
      ]}
    ).exec()
  },
  getNextFriend(idUser,limit,skip){
    return this.find(
   {   
    $or : [
        { $and : [
        {'userId':idUser},
        {'status':true}
      ]},
      { $and : [
        {'contactId':idUser},
        {'status':true}
      ]}
      ]}
    ).sort({"createdAt":-1})
    .limit(limit)
    .skip(skip)
    .exec()
  },
  getWaitAccept(userId,limit){
    return this.find({
      $and:[
        {'userId':userId},
        {'status':false}
      ]
    }).sort({'createdAt':-1}).limit(limit).exec()
  },
  getSender(userId,limit){
    return this.find({
      $and:[
        {'contactId':userId},
        {'status':false}
      ]
    }).sort({'createdAt':-1}).limit(limit).exec()
  },
  findContacted(idUser){
    return this.find(
      {   $or : [
        {'userId':idUser},
        {'contactId':idUser},
      ]}
    ).exec()
  },
  afterAddMessage(userId,contactId){
    return this.updateOne(
      {   $or : [
        { $and : [
        {'userId':userId},
        {'contactId':contactId},
      ]},
      { $and : [
        {'contactId':userId},
        {'userId':contactId},
      ]}
      ]},
      {'updatedAt':Date.now()}
    ).exec()
  }
}
module.exports = mongoose.model('contact', contactSchema);
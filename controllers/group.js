import findTocreateGroupService from '../services/findToCreateGroup'
import createGroup from '../services/createGroup'
let findTocreateGroup=async (req,res)=>{
  await findTocreateGroupService(req,res)
  .then(result=>{
    return res.status(200).send(result)
  })
  .catch(err=>{
    return res.status(500).send(err)
  })
}
let createGroups = async (req,res)=>{
  await createGroup(req.body.arrUser,req.body.name,req.body.userAmount,req.user._id)
  .then(result=>{
    return res.status(200).send(result)
  })
  .catch(err=>{
    return res.status(500).send(err)
  })
}
module.exports = {
  findTocreateGroup:findTocreateGroup,
  createGroups:createGroups
}
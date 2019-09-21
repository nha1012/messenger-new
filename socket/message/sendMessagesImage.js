import groupChatModel from '../../model/ChatGroup'
let sendMessagesImage=(io)=>{
  let clients={}
  io.on('connection', function (socket) {
    let currentUserId = socket.request.user._id

    if(clients[currentUserId]){
      clients[currentUserId].push(socket.id)
    } else{
      clients[currentUserId]=[]
      clients[currentUserId]=[socket.id]
    }
    
    socket.on('client-add-new-image-message', function ( contactFromClient){
      if(contactFromClient.conversationType!='group'){
        if( clients[contactFromClient.receiverId]){
        clients[contactFromClient.receiverId].forEach(element => {
          io.to(element).emit('server-add-new-image-message', contactFromClient);
        });
      }
      }else{      
        groupChatModel.findGroupById(contactFromClient.receiverId)
        .then(result=>{
          result.member.forEach(user=>{
              if(user.userId!=socket.request.user._id){
                if(clients[user.userId]){
                   clients[user.userId].forEach(element=>{
                  io.sockets.connected[element].emit('server-add-new-image-message', contactFromClient);
                })
                }               
              }              
          })
        })  
      }
    })
  
    socket.on('disconnect', function () {
      //lam gi khi disconnect
      if(clients[currentUserId]){
         clients[currentUserId]= clients[currentUserId].filter((socketId)=>{
        socketId !==socket.id
      })
      }
      if(clients[currentUserId]){
         if(!clients[currentUserId].length){
        delete clients[currentUserId]
      }
      }
    }) 
       
  })
}
module.exports= sendMessagesImage
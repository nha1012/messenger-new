import groupChatModel from '../../model/ChatGroup'
let typingOff=(io)=>{
  let clients={}
  io.on('connection', function (socket) {
    let currentUserId = socket.request.user._id
    if(clients[currentUserId]){
      clients[currentUserId].push(socket.id)
    } else{
      clients[currentUserId]=[]
      clients[currentUserId]=[socket.id]
    }
    socket.on('client-typing-off', function (contactFromClient){
      if(contactFromClient.isGroup==false){
        if( clients[contactFromClient.targetId]){
        clients[contactFromClient.targetId].forEach(element => {
          io.to(element).emit('server-typing-off',socket.request.user._id);
        });
      }
      }else{      
        groupChatModel.findGroupById(contactFromClient.targetId)
        .then(result=>{
          result.member.forEach(user=>{
              if(user.userId!=socket.request.user._id){
                if(clients[user.userId]){
                   clients[user.userId].forEach(element=>{
                  io.sockets.connected[element].emit('server-typing-off',contactFromClient.targetId);
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
module.exports= typingOff
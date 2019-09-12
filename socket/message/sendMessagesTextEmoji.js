let sendMessageTextEmoji=(io)=>{
  let clients={}
  io.on('connection', function (socket) {
    let currentUser ={
      id:socket.request.user._id,
      avatar: socket.request.user.avatar,
      userName: socket.request.user.userName
    }
    
    let currentUserId = socket.request.user._id

    if(clients[currentUserId]){
      clients[currentUserId].push(socket.id)
    } else{
      clients[currentUserId]=[socket.id]
    }
    
    socket.on('client-add-new-messages-text-emoji', function(contactFromClient){
      currentUser.messages= contactFromClient.message
      currentUser.isGroup = contactFromClient.isGroup
      console.log(contactFromClient.isGroup);
      
      if(contactFromClient.isGroup==false){
        if( clients[contactFromClient.targetId]){
        clients[contactFromClient.targetId].forEach(element => {
          io.to(element).emit('server-add-new-messages-text-emoji', currentUser);
        });
      }
      }else{
        //xu ly o day
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
module.exports= sendMessageTextEmoji
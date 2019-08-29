let receivedContact = (io)=>{
  let clients={}
  io.on('connection', function (socket) {
    let currentUser ={
      id:socket.request.user._id,
      avatar: socket.request.user.avatar,
      userName: socket.request.user.userName,
      address: socket.request.user.address
    }
    
    let currentUserId = socket.request.user._id

    if(clients[currentUserId]){
      clients[currentUserId].push(socket.id)
    } else{
      clients[currentUserId]=[socket.id]
    }
    
    socket.on('client-received-contact', function(contactFromClient){
      if( clients[contactFromClient.id]){
        clients[contactFromClient.id].forEach(element => {
          io.to(element).emit('server-received-contact', currentUser);
        });
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
module.exports = receivedContact
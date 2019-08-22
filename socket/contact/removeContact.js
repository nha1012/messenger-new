let removeContact = (io)=>{
  let clients={}
  io.on('connection', function (socket) {
    //get user
    let currentUser ={
      id:socket.request.user._id
    }
    let currentUserId = socket.request.user._id
    if(clients[currentUserId]){
      clients[currentUserId].push(socket.id)
    } else{
      clients[currentUserId]=[socket.id]
    }
    //get data from client
    socket.on('client-remove-contact', function(contactFromClient){
      if( clients[contactFromClient.id]){
        clients[contactFromClient.id].forEach(element => {
          io.to(element).emit('server-remove-contact', currentUser);
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
      //remove id socket 
      if(clients[currentUserId]){
         if(!clients[currentUserId].length){
        delete clients[currentUserId]
      }
      }
    }) 
       
  })
}
module.exports = removeContact 
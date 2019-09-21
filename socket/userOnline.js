require('events').EventEmitter.defaultMaxListeners = 15;
let userOnline=(io)=>{
  let clients={}
  io.on('connection', function (socket) {
    let currentUserId = socket.request.user._id
    if(clients[currentUserId]){
      clients[currentUserId].push(socket.id)
    } else{
      clients[currentUserId]=[]
      clients[currentUserId]=[socket.id]
    }
    io.emit('server-user-online',Object.keys(clients));
    socket.broadcast.emit('server-user-onlines', socket.request.user._id);
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
      socket.broadcast.emit('server-user-offline', socket.request.user._id);
    }) 
       
  })
}
module.exports= userOnline
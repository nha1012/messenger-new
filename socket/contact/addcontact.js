let addContact = (io)=>{
  let clients={}
  io.on('connection', function (socket) {
    socket.on('client-add-new-contact', function (data) {
      console.log(data);
       socket.broadcast.emit('server-add-new-contact',"data from server");
    });
    socket.on('disconnect', function () {
      console.log("Đã thoát");
  });
  
  });
  // io.on('connection', function (socket) {
  //   // let currentUserId = socket.request.user._id
  //   // if(clients[currentUserId]){
  //   //   clients[currentUserId].push(socket.id)
  //   // } else{
  //   //   clients[currentUserId]=[socket.id]
  //   // }
  //   socket.on('client-add-new-contact', function(contactFromClient){
  //     console.log(contactFromClient);
  //   })
  //   // let currentUser ={
  //   //   id:socket.request.user._id,
  //   //   avatar: socket.request.user.avatar,
  //   //   userName: socket.request.user.userName
  //   // }
  //   // console.log(currentUser);
  //   // socket.emit("server-add-new-contact", );
  //   socket.emit("server-add-new-contact", 'Data from server');
    
  //   // socket.on('disconnect', function () {
  //   //   //lam gi khi disconnect
  //   //   if(clients[currentUserId]){
  //   //      clients[currentUserId]= clients[currentUserId].filter((socketId)=>{
  //   //     socketId !==socket.id
  //   //   })
  //   //   }
  //   //   if(clients[currentUserId]){
  //   //      if(!clients[currentUserId].length){
  //   //     delete clients[currentUserId]
  //   //   }
  //   //   }
  //   // }) 
       
  // })
}
module.exports = addContact
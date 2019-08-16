let addContact = (io)=>{
  io.on('connection', function (socket) {
    socket.on('disconnect', function () {
      //lam gi khi disconnect
    })
    socket.on('client-add-new-contact', function(contactFromClient){
      console.log(contactFromClient);
      console.log('-----------------------');
      console.log(socket.request.user);
      socket.emit("server-add-new-contact", socket.request.user);
    })
  })
}
module.exports = addContact
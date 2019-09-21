import groupChatModel from '../../model/ChatGroup'
let addNewGroup=(io)=>{
  let clients={}
  io.on('connection', function (socket) {
    let currentUserId = socket.request.user._id
    if(clients[currentUserId]){
      clients[currentUserId].push(socket.id)
    } else{
      clients[currentUserId]=[]
      clients[currentUserId]=[socket.id]
    }
    socket.on('client-add-new-group', function (contactFromClient){
        contactFromClient.member.forEach(element=>{
          if(element.userId!=socket.request.user._id){
               if( clients[element.userId]){
                clients[element.userId].forEach(item => {
                  io.to(item).emit('server-add-new-group',contactFromClient);
                });
              }
          }
        })
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
module.exports= addNewGroup
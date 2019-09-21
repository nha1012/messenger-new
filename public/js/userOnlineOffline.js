
  socket.on('server-user-online', function (data) {
    data.forEach(element => {
      $(`.person[data-chat=${element}]`).find('div.dot').addClass('online')
    });
  })
  socket.on('server-user-onlines',function (element) {
    $(`.person[data-chat=${element}]`).find('div.dot').addClass('online')
  })
  socket.on('server-user-offline', function (element) {
    $(`.person[data-chat=${element}]`).find('div.dot').removeClass('online')
  })


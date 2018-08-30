$(function() {
    console.log('Online');
    io.socket.get('/newOrder', function(resData) {
        console.log(resData);
      });
    io.socket.on('onlineorder', (msg) => {
     if (msg.verb === 'created') {
    console.log('Got a secret only Bobs can hear:', msg.address);
  }
});
});

var express = require('express'),
  app = express(),
  server = require('http').createServer(app),
  io = require('socket.io').listen(server);

app.set('port', process.env.PORT || 3000);

if ('development' === app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

var nicknames = [];
io.sockets.on('connection', function (socket) {
  socket.emit('welcome', { text: 'OH HAI! U R CONNECTED!' });
  socket.on('nickname', function(data, callback) {
    console.log('The Server received the following nickname:' + data);
    if(nicknames.indexOf(data) !== -1) {
      callback(false);
    }else {
      callback(true);
      nicknames.push(data);
      socket.nickname = data;
      console.log('Nickname are: ' + nicknames);
      io.sockets.emit('nicknames', nicknames);
    }
  });
  socket.on('disconnect', function() {
    if(!socket.nickname) return;
    if(nicknames.indexOf(socket.nickname) !== -1) {
      nicknames.splice(nicknames.indexOf(socket.nickname),1);
    }
    console.log('Nicknames are ' + nicknames);
    io.sockets.emit('nicknames', nicknames);
  });
  socket.on('user message', function(data) {
    io.sockets.emit('user message', {
      nick: socket.nickname,
      message: data
    })
  });
});

server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

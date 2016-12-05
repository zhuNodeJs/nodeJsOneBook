var http = require('http');
var fs = require('fs');
var server = http.createServer(function(req, res) {
    fs.readFile('./index.html', function(error, data) {
        res.writeHead(200, {'Content-type': 'text/html'});
        res.end(data, 'utf-8');
    });
}).listen(3000,'127.0.0.1');
console.log('The server is running on 127.0.0.1:3000');

var io= require('socket.io').listen(server);

io.sockets.on('connection', function(socket) {
    socket.on('ping', function(data) {
        console.log('CLient ping to Server');
        socket.emit('pong', {text: 'PONG'});
    });
    socket.on('pong', function(data) {
        console.log('the PONG from Client');
    });
    setInterval(function() {
      console.log('Server sending PING to client...');
      socket.emit('ping', {text: 'PING'});
    }, 10000);
});

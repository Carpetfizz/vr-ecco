var config = require('./config');
var shortid = require('shortid');

var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/../public'));
app.set('views', __dirname + '/../views');

app.get('/', function(req, res) {
	var roomID = shortid.generate(); /** @todo Generate bit.ly URL from this */

	res.render('controller', { roomID: roomID });
});

app.get('/client/:roomID', function(req, res) {
	res.render('client', { roomID: req.params.roomID });
});

server.listen(config.port, function(req, res) {
	console.info(`Listening on ${config.port}!`);
});

io.on('connection', function(socket) {
	socket.on('initialize', function(roomID, type) {
		socket.roomID = roomID;
		socket.type = type;
		socket.join(roomID);

		if (socket.type === 'client') {
			socket.broadcast.to(socket.roomID).emit('client:connect');
		}
	});

	socket.on('controller:keyup', function(key) {
		socket.broadcast.to(socket.roomID).emit('controller:keyup', key);
	});

	socket.on('controller:keydown', function(key) {
		socket.broadcast.to(socket.roomID).emit('controller:keydown', key);
	});

	socket.on('controller:mouseupdate', function(x, y, movementX, movementY) {
		socket.broadcast.to(socket.roomID).emit('controller:mouseupdate', x, y, movementX, movementY);
	});

	socket.on('disconnect', function() {
		if (socket.type === 'client') {
			socket.broadcast.to(socket.roomID).emit('client:disconnect');
		}
	});
});

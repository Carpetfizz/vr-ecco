var config = require('./config');
var shortid = require('shortid');

var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/../public'));
app.set('views', __dirname + '/../views');

var rooms = [];

app.get('/', function(req, res) {
	var id = shortid.generate();
	rooms.push(id);
	res.render('ecco', { id: id });
});

server.listen(config.port, function(req, res) {
	console.info(`Listening on ${config.port}!`);
});

io.on('connection', function(socket) {
	socket.on('client:initialize', function(id) {
		socket.room = id;
		socket.join(id);

		socket.broadcast.to(socket.room).emit('client:ready');

		socket.on('controller:keyup', function(key) {
			socket.emit('controller:keyup', key);
		});

		socket.on('controller:keydown', function(key) {
			socket.emit('controller:keydown', key);
		});

		socket.on('controller:mouseupdate', function(x, y) {
			socket.emit('controller:mouseupdate', x, y);
		});
	});

	socket.on('controller:initialize', function(id) {
		socket.room = id;
		socket.join(id);

		socket.on('controller:keyup', function(key) {
			socket.broadcast.to(socket.room).emit('controller:keyup', key);
		});

		socket.on('controller:keydown', function(key) {
			socket.broadcast.to(socket.room).emit('controller:keydown', key);
		});

		socket.on('controller:mouseupdate', function(x, y) {
			socket.broadcast.to(socket.room).emit('controller:mouseupdate', x, y);
		});
	});
});

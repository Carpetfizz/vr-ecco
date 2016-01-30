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

app.get('/', function (req, res) {
	res.render('ecco');
});

server.listen(config.port, function(req, res) {
	console.log(`Listening on ${config.port}!`);
});

io.on('connection', function (socket) {
	console.log(socket);
});

var config = require('./config');
var shortid = require('shortid');

var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

io.on('connection', function(socket) {
	console.log(socket);
});

app.use(express.static(__dirname + '/../public'));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/../views');

app.use('/', (req, res) => {
	res.render('ecco');
});

server.listen(config.port);
console.log(`Listening on port ${config.port}!`);

var shortid = require('shortid');

var express = require('express');
var server = require('http').Server(app);
var app = express();

var io = require('socket.io')(server);

io.on('connection', function(socket) {
	console.log(socket);
});

app.set('view engine', 'ejs');
app.set('views', __dirname + '/../views');

app.use('/', function(req, res) {
	res.render('ecco');
});

app.use(express.static(__dirname + '/../public'));

app.listen(3030);
console.log('Listening!');

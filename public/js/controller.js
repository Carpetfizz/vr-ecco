var canvas = document.getElementsByTagName('canvas')[0];
var ctx = canvas.getContext('2d');

canvas.requestPointerLock = canvas.requestPointerLock || canvas.mozRequestPointerLock || canvas.webkitRequestPointerLock;
document.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock || document.webkitExitPointerLock;

var x = 50;
var y = 50;

document.addEventListener('pointerlockchange', lockChangeAlert, false);
document.addEventListener('mozpointerlockchange', lockChangeAlert, false);
document.addEventListener('webkitpointerlockchange', lockChangeAlert, false);

function lockChangeAlert() {
	if (document.pointerLockElement === canvas || document.mozPointerLockElement === canvas || document.webkitPointerLockElement === canvas) {
		document.addEventListener("mousemove", canvasLoop, false);
	} else {
		document.removeEventListener("mousemove", canvasLoop, false);
	}
}

var tracker = document.createElement('p');
var body = document.querySelector('body');
body.appendChild(tracker);
tracker.style.position = 'absolute';
tracker.style.top = '0';
tracker.style.right = '10px';
tracker.style.backgroundColor = 'white';

function canvasLoop(e) {
	var movementX = e.movementX || e.mozMovementX || e.webkitMovementX || 0;
	var movementY = e.movementY || e.mozMovementY || e.webkitMovementY || 0;

	x += movementX;
	y += movementY;

	socket.emit('controller:mouseupdate', x, y);

	tracker.innerHTML = "X position: " + x + ', Y position: ' + y;

	window.requestAnimationFrame(canvasLoop);
}


////////////////////////////////////////////////////////////////////////////////


var socket = io();

socket.on('connect', function() {
	socket.emit('controller:initialize', roomID);
});

socket.on('client:ready', function() {
	// Show stuff

	// Pointerlock
	canvas.requestPointerLock();
});

canvas.addEventListener('keydown', function(event) {
	var key = String.fromCharCode((event || window.event).which);

	switch(key) {
		case 'E':
		case 'W':
		case 'Q':
		case 'A':
		case 'D':
		case 'S':
			socket.emit('keydown', key);
	}
});

canvas.addEventListener('keyup', function(event) {
	var key = String.fromCharCode((event || window.event).which);

	switch(key) {
		case 'E':
		case 'W':
		case 'Q':
		case 'A':
		case 'D':
		case 'S':
			socket.emit('keyup', key);
	}
});

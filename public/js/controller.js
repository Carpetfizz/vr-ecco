var canvas = document.getElementsByTagName('canvas')[0];
var ctx = canvas.getContext('2d');

canvas.requestPointerLock = canvas.requestPointerLock || canvas.mozRequestPointerLock || canvas.webkitRequestPointerLock;
document.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock || document.webkitExitPointerLock;

canvas.addEventListener('click', function() {
	canvas.requestPointerLock();
});

var x = 50, y = 50;

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

function canvasLoop(e) {
	var movementX = e.movementX || e.mozMovementX || e.webkitMovementX || 0;
	var movementY = e.movementY || e.mozMovementY || e.webkitMovementY || 0;

	x += movementX;
	y += movementY;

	if (movementX > 0 || movementY > 0) {
		controller.emit('controller:mouseupdate', x, y);
	}

	window.requestAnimationFrame(canvasLoop);
}


////////////////////////////////////////////////////////////////////////////////


var controller = io();

controller.on('connect', function() {
	controller.emit('initialize', roomID, 'controller');
});

controller.on('client:ready', function() {
	canvas.height = canvas.width = 200;
});

window.addEventListener('keydown', function(event) {
	var key = String.fromCharCode((event || window.event).which);

	switch(key) {
		case 'E':
		case 'W':
		case 'Q':
		case 'A':
		case 'D':
		case 'S':
			controller.emit('controller:keydown', key);
	}
});

window.addEventListener('keyup', function(event) {
	var key = String.fromCharCode((event || window.event).which);

	switch(key) {
		case 'E':
		case 'W':
		case 'Q':
		case 'A':
		case 'D':
		case 'S':
			controller.emit('controller:keyup', key);
	}
});

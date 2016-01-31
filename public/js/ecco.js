var scene,
	width,
	height,
	camera,
	renderer,
	loader,
	textureLoader,
	clock,
	stereo,
	domElement,
	controls,
	started,
	socket,
	ship;

var Utils = require('../Utils.js');
var Sky = require('../assets/Sky.js');
var GroundTerrain = require('../assets/GroundTerrain.js');
var Ship = require('../assets/Ship/Ship.js');
var StarSystem = require('../assets/StarSystem.js');
var Asteroid = require('../assets/Asteroid.js');
var gameObjects = [];
var keysPressed = {
	'Q': false,
	'E': false,
	'W': false,
	'A': false,
	'S': false,
	'D': false,
	'Z': false,
	'X': false
};

function init() {
	started = true;
	width = window.innerWidth;
	height = window.innerHeight;
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(60, width / height, 1, 11000);
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(width, height);
	renderer.shadowMap.enabled = true;
	clock = new THREE.Clock();
	stereo = new THREE.StereoEffect(renderer);
	stereo.eyeSeparation = 0;
	container = document.getElementById("container");
	domElement = renderer.domElement;
	container.appendChild(domElement);
	loader = new THREE.JSONLoader();
	textureLoader = new THREE.TextureLoader();
	controls = new DeviceOrientationController(camera, domElement);

	setupScene();

	socket = io().on('connect', function() {
		socket.emit('initialize', roomID, 'client');
	}).on('controller:keyup', function(key) {
		keysPressed[key] = false;
	}).on('controller:keydown', function(key) {
		keysPressed[key] = true;
	}).on('controller:mouseupdate', function(x, y, movementX, movementY) {
		ship.onMouseMove(x, y, movementX, movementY);
	});

	if (isMobile) {
		controls.connect();
	}
}

function setupScene() {
	ship = new Ship(loader);

	// scene.add(ship.mesh);
	scene.add(ship.yawObject);
	ship.mesh.add(camera);

	scene.add(new GroundTerrain());
	scene.add(new Sky(textureLoader));

	camera.position.y = ship.mesh.position.y + 1;
	camera.position.z = ship.mesh.position.z - 5;
	camera.rotation.y = Math.PI;
	camera.zoom = 1.2;

	var light = new THREE.PointLight(0xffffff, 1, 100);
	light.position.set(0, ship.mesh.position.y + 1, ship.mesh.position.z - 5);
	scene.add(light);

	var hemiLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
	scene.add(hemiLight);

	gameObjects.push(ship);

	Utils.debugaxis(scene, 100);

	requestAnimationFrame(render);
}

/* RENDER */

function resize() {
	var newWidth = window.innerWidth;
	var newHeight = window.innerHeight;
	camera.aspect = newWidth / newHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(newWidth, newHeight);
	stereo.setSize(newWidth, newHeight);
}

function render() {
	var elapsedSeconds = clock.getElapsedTime();
	requestAnimationFrame(render);
	update(clock.getDelta());

	if (isMobile) {
		stereo.render(scene, camera);
	} else {
		renderer.render(scene, camera);
	}
}

function update(dt) {
	resize();
	controls.update();

	for (var i = 0; i < gameObjects.length; i++) {
		gameObjects[i].update(dt, keysPressed);
	}
	camera.updateProjectionMatrix();
}

init();
render();

var scene,
	width,
	height,
	camera,
	renderer,
	loader,
	clock,
	stereo,
	domElement,
	controls,
	started;

var Utils = require('../Utils.js');
var Cockpit = require('../assets/Cockpit/cockpit.js');
var StarSystem = require('../assets/StarSystem.js');
var Asteroid = require('../assets/Asteroid.js');
var gameObjects = [];

function init() {

	started = true;
	width = window.innerWidth;
	height = window.innerHeight;
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(60, width/height, 1, 2000);
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
	controls = new DeviceOrientationController(camera, domElement); 
	setupScene();

	if(isMobile) {
		controls.connect();
	}
}

function setupScene() {

	var cockpit = new Cockpit(loader);

	scene.add(cockpit);
	cockpit.add(camera);

	camera.position.y = cockpit.position.y + 1;
	camera.position.z = cockpit.position.z - 5;
	camera.rotation.y = Math.PI;
	camera.zoom = 1.2;

	gameObjects.push(cockpit);

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
	
	stereo.render(scene, camera);
	
	//renderer.render(scene, camera);
	/*if(isMobile){
		stereo.render(scene, camera);
	}else{
		renderer.render(scene, camera);
	}*/
}

function update(dt){
	resize();
	controls.update();
	for(var i=0; i<gameObjects.length; i++){
		gameObjects[i].update(dt);
	}
	camera.updateProjectionMatrix();
}

init();
render();
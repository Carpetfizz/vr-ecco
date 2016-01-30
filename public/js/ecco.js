var scene,
	width,
	height,
	camera,
	renderer,
	loader,
	clock,
	stereo,
	domElement,
	started;

var Utils = require('../Utils.js');
var Cockpit = require('../assets/Cockpit/cockpit.js');

function init() {

	started = true;
	width = window.innerWidth;
	height = window.innerHeight;
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera( 75, width/height, 0.1, 1000 );
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(width, height);
	clock = new THREE.Clock();
	stereo = new THREE.StereoEffect(renderer);
	container = document.getElementById("container");
	domElement = renderer.domElement;
	container.appendChild(domElement);
	loader = new THREE.JSONLoader();
	setupScene();
}

function setupScene() {
	scene.add(camera);
	var cockpit = Cockpit(loader);
	cockpit.rotation.y = 0;
	scene.add(cockpit);

	camera.position.z = 5;

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
	if(isMobile){
		stereo.render(scene, camera);
	}else{
		renderer.render(scene, camera);
	}
}

function update(dt){
	resize();
	camera.updateProjectionMatrix();
}

init();
render();
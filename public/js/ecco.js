var scene,
	width,
	height,
	camera,
	renderer,
	loader,
	clock,
	stereo,
	domElement,
	started,
	c;

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

	c = Cockpit(loader);
	scene.add(c);
	camera.position.z = 4

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
	c.rotation.z += 0.01;
	c.rotation.x += 0.01;
}

init();
render();
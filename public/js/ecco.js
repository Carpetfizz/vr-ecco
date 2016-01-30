var scene,
	width,
	height,
	camera,
	renderer,
	clock,
	stereo,
	domElement,
	started;

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
	setupScene();
}

function setupScene() {
	
	var geometry = new THREE.BoxGeometry( 1, 1, 1 );
	var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
	cube = new THREE.Mesh( geometry, material );
	scene.add(cube);
	camera.position.z = 5;

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

	cube.rotation.x += 1;
	cube.rotation.y += 1;
}

init();
render();
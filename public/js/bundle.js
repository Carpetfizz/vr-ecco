(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Utils = {
	/*http://nooshu.com/debug-axes-in-three-js*/
	debugaxis: function(scene, axisLength){
    	//Shorten the vertex function
	    function v(x,y,z){ 
	            return new THREE.Vector3(x,y,z); 
	    }
	    //Create axis (point1, point2, colour)
	    function createAxis(p1, p2, color){
	            var line, lineGeometry = new THREE.Geometry(),
	            lineMat = new THREE.LineBasicMaterial({color: color, linewidth: 1});
	            lineGeometry.vertices.push(p1, p2);
	            line = new THREE.Line(lineGeometry, lineMat);
	            scene.add(line);
	    }

	    createAxis(v(-axisLength, 0, 0), v(axisLength, 0, 0), 0xFF0000);
	    createAxis(v(0, -axisLength, 0), v(0, axisLength, 0), 0x00FF00);
	    createAxis(v(0, 0, -axisLength), v(0, 0, axisLength), 0x0000FF);
	}
}

module.exports = Utils;
},{}],2:[function(require,module,exports){
module.exports={
    "name": "Cube.011Geometry",
    "faces": [33,2,0,1,3,0,1,2,3,33,3,7,6,2,3,4,5,0,33,7,5,4,6,4,6,7,5,33,0,4,5,1,1,7,6,2,33,0,2,6,4,1,0,5,7,33,5,7,3,1,6,4,3,2,33,9,11,10,8,2,3,0,1,33,11,15,14,10,3,4,5,0,33,15,13,12,14,4,6,7,5,33,13,9,8,12,6,2,1,7,33,8,10,14,12,1,0,5,7,33,13,15,11,9,6,4,3,2,33,17,19,18,16,8,3,0,9,33,19,23,22,18,3,4,5,0,33,23,21,20,22,4,10,11,5,33,21,17,16,20,10,8,9,11,33,16,18,22,20,9,0,5,11,33,21,23,19,17,10,4,3,8,33,25,27,26,24,4,6,7,5,33,27,31,30,26,6,2,1,7,33,31,29,28,30,2,3,0,1,33,29,25,24,28,3,4,5,0,33,24,26,30,28,5,7,1,0,33,29,31,27,25,3,2,6,4,33,33,35,34,32,12,13,14,15,33,35,39,38,34,13,16,17,14,33,39,37,36,38,16,18,19,17,33,37,33,32,36,18,12,15,19,33,32,34,38,36,15,14,17,19,33,37,39,35,33,18,16,13,12,33,41,43,42,40,2,3,0,1,33,43,47,46,42,3,4,5,0,33,47,45,44,46,4,6,7,5,33,45,41,40,44,6,2,1,7,33,40,42,46,44,1,0,5,7,33,45,47,43,41,6,4,3,2,33,49,51,50,48,12,13,14,15,33,51,55,54,50,13,16,17,14,33,55,53,52,54,16,18,19,17,33,53,49,48,52,18,12,15,19,33,48,50,54,52,15,14,17,19,33,53,55,51,49,18,16,13,12],
    "normals": [-0.577349,-0.577349,-0.577349,-0.577349,-0.577349,0.577349,-0.577349,0.577349,0.577349,-0.577349,0.577349,-0.577349,0.577349,0.577349,-0.577349,0.577349,-0.577349,-0.577349,0.577349,0.577349,0.577349,0.577349,-0.577349,0.577349,-0.667714,0.731529,0.137791,-0.539232,-0.155889,0.82757,0.667714,0.731529,0.137791,0.539232,-0.155889,0.82757,-0.555376,0.715964,-0.422956,-0.606342,-0.415052,-0.678274,-0.65801,-0.732078,-0.176214,-0.541063,-0.20951,0.814447,0.606342,-0.415052,-0.678274,0.65801,-0.732078,-0.176214,0.555376,0.715964,-0.422956,0.541063,-0.20951,0.814447],
    "uvs": [],
    "vertices": [-1,0.2,-0.8,-1,0.4,-0.8,-1,0.2,-5.1,-1,0.4,-5.1,-0.8,0.2,-0.8,-0.8,0.4,-0.8,-0.8,0.2,-5.1,-0.8,0.4,-5.1,0.8,0.2,-0.8,0.8,0.4,-0.8,0.8,0.2,-5.1,0.8,0.4,-5.1,1,0.2,-0.8,1,0.4,-0.8,1,0.2,-5.1,1,0.4,-5.1,-0.72,0.2,-0,-0.72,0.7,-1.28,-0.72,0.2,-1.6,-0.72,0.7,-1.6,0.72,0.2,-0,0.72,0.7,-1.28,0.72,0.2,-1.6,0.72,0.7,-1.6,-1,0.2,0,-1,-0,0,-1,0.2,-5.1,-1,-0,-5.1,1,0.2,0,1,-0,0,1,0.2,-5.1,1,-0,-5.1,-1,0.2,0,-1,2.9,-4.9,-1,0.2,-0.4,-1,2.5,-4.9,-0.8,0.2,0,-0.8,2.9,-4.9,-0.8,0.2,-0.4,-0.8,2.5,-4.9,-1,0.2,-4.9,-1,2.9,-4.9,-1,0.2,-5.1,-1,2.9,-5.1,1,0.2,-4.9,1,2.9,-4.9,1,0.2,-5.1,1,2.9,-5.1,0.8,0.2,0,0.8,2.9,-4.9,0.8,0.2,-0.4,0.8,2.5,-4.9,1,0.2,0,1,2.9,-4.9,1,0.2,-0.4,1,2.5,-4.9],
    "metadata": {
        "version": 3,
        "generator": "io_three",
        "faces": 42,
        "normals": 20,
        "type": "Geometry",
        "uvs": 0,
        "vertices": 56
    }
}
},{}],3:[function(require,module,exports){
var cockpitJSON = require('./cockpit.blend.json');

function Cockpit(loader){
	
	var cockpitModel = loader.parse(cockpitJSON);
	var cockpitMesh = new THREE.Mesh(cockpitModel.geometry, new THREE.MeshBasicMaterial({color: "gray"}));
	return cockpitMesh;
}

module.exports = Cockpit;
},{"./cockpit.blend.json":2}],4:[function(require,module,exports){
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
},{"../Utils.js":1,"../assets/Cockpit/cockpit.js":3}]},{},[4]);

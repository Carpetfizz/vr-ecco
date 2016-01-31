var shipJSON = require('./ship.blend.json');

var Ship = function Ship(loader) {
	// this.counter = 0;
	this.speed = 0;

	this.model = loader.parse(shipJSON);
	this.mesh = new THREE.Mesh(this.model.geometry, /*new THREE.MeshFaceMaterial(this.model.materials)*/ new THREE.MeshPhongMaterial({ color: 'gray' }));
	this.mesh.castShadow = true;

	this.pitchObject = new THREE.Object3D();
	this.pitchObject.add(this.mesh);

	this.yawObject = new THREE.Object3D();
	this.yawObject.position.y = 10;
	this.yawObject.add(this.pitchObject);
};

Ship.prototype.onMouseMove = function(x, y, movementX, movementY) {
	this.yawObject.rotation.y -= movementX * 0.002;
	this.pitchObject.rotation.x -= movementY * 0.002;

	this.pitchObject.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, this.pitchObject.rotation.x));
};

Ship.prototype.getDirection = function() {
	var direction = new THREE.Vector3(0, 0, -1);
	var rotation = new THREE.Euler(0, 0, 0, 'YXZ');

	return function(v) {
		rotation.set(this.pitchObject.rotation.x, this.yawObject.rotation.y, 0);

		v.copy(direction).applyEuler(rotation);

		return v;
	}.bind(this);
}();

Ship.prototype.update = function(dt, keysPressed) {
	// this.counter++;
	// if (this.counter % 10 === 0) {
	// 	if (keysPressed['W']) {
	// 		this.speeds.speed++;
	// 	} else if (this.speeds.speed > 0) {
	// 		this.speeds.speed--;
	// 	}

	// 	if (keysPressed['S']) {
	// 		this.speeds.speed--;
	// 	} else if (this.speeds.speed < 0) {
	// 		this.speeds.speed++;
	// 	}

	// 	if (keysPressed['D']) {
	// 		this.speeds.roll++;
	// 	} else if (this.speeds.roll > 0) {
	// 		this.speeds.roll--;
	// 	}

	// 	if (keysPressed['A']) {
	// 		this.speeds.roll--;
	// 	} else if (this.speeds.roll < 0) {
	// 		this.speeds.roll++;
	// 	}

	// 	if (keysPressed['Q']) {
	// 		this.speeds.yaw++;
	// 	} else if (this.speeds.yaw > 0) {
	// 		this.speeds.yaw--;
	// 	}

	// 	if (keysPressed['E']) {
	// 		this.speeds.yaw--;
	// 	} else if (this.speeds.yaw < 0) {
	// 		this.speeds.yaw++;
	// 	}

	// 	if (keysPressed['X']) {
	// 		this.speeds.pitch++;
	// 	} else if (this.speeds.pitch > 0) {
	// 		this.speeds.pitch--;
	// 	}

	// 	if (keysPressed['Z']) {
	// 		this.speeds.pitch--;
	// 	} else if (this.speeds.pitch < 0) {
	// 		this.speeds.pitch++;
	// 	}
	// }

	// this.mesh.position.z += this.speeds.speed;
	// this.mesh.rotation.z += this.speeds.roll / 300;
	// this.mesh.rotation.y += this.speeds.yaw / 300;
	// this.mesh.rotation.x += this.speeds.pitch / 300;

	if (keysPressed['W']) {
		this.speed = 2;
	} else if (this.speed > 0) {
		this.speed = 0;
	}

	if (keysPressed['S']) {
		this.speed = 2;
	} else if (this.speed < 0) {
		this.speed = 0;
	}

	console.log(this.pitchObject.rotation.x, this.yawObject.rotation.y);

	this.yawObject.position.x += Math.sin(this.yawObject.rotation.y) * this.speed;
	this.yawObject.position.z += Math.cos(this.yawObject.rotation.y) * this.speed;
	this.yawObject.position.z += this.yawObject.rotation.z * this.speed;
};

module.exports = Ship;

var AIShipJSON = require('./aiship.blend.json');

var AIShip = function AIShip(position, loader) {
	// this.counter = 0;
	this.speed = 0;

	this.model = loader.parse(AIShipJSON);
	this.mesh = new THREE.Mesh(this.model.geometry, new THREE.MeshFaceMaterial(this.model.materials));
	this.mesh.castShadow = true;
	this.mesh.position.set(position);
};

AIShip.prototype.update = function(dt) {
	this.mesh.position.z += 0.1;
};

module.exports = AIShip;

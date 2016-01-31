var shipJSON = require('./ship.blend.json');

function Ship(loader){
	var shipModel = loader.parse(shipJSON);
	var shipMesh = new THREE.Mesh(shipModel.geometry, /*new THREE.MeshFaceMaterial(shipModel.materials)*/ new THREE.MeshPhongMaterial({color: "gray"}));
	shipMesh.castShadow = true;
	shipMesh.update = function(){
		//shipMesh.position.z += 0.1;
	}
	return shipMesh;
}

module.exports = Ship;

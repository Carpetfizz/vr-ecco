var cockpitJSON = require('./cockpit.blend.json');

function Cockpit(loader){

	var cockpitModel = loader.parse(cockpitJSON);
	var cockpitMesh = new THREE.Mesh(cockpitModel.geometry, /*new THREE.MeshFaceMaterial(cockpitModel.materials)*/ new THREE.MeshPhongMaterial({color: "gray"}));
	cockpitMesh.castShadow = true;
	cockpitMesh.update = function(){
		//cockpitMesh.position.z += 0.1;
	}
	return cockpitMesh;
}

module.exports = Cockpit;

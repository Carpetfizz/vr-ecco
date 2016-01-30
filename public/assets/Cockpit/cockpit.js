var cockpitJSON = require('./cockpit.blend.json');

function Cockpit(loader){
	
	var cockpitModel = loader.parse(cockpitJSON);
	var cockpitMesh = new THREE.Mesh(cockpitModel.geometry, new THREE.MeshBasicMaterial({color: "gray"}));
	return cockpitMesh;
}

module.exports = Cockpit;
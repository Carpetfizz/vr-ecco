function Asteroid(radius) {
	var asteroidGeometry = new THREE.SphereGeometry(radius, 32, 32);
	var asteroidMaterial = new THREE.MeshPhongMaterial({color: "brown"});
	var asteroidMesh = new THREE.Mesh(asteroidGeometry, asteroidMaterial);
	return asteroidMesh;
}

module.exports = Asteroid;
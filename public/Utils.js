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
	},
	/* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random */
	getRandomArbitrary: function(min, max) {
  		return Math.random() * (max - min) + min;
	}
}

module.exports = Utils;
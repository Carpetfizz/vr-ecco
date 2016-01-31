function StarSystem() {
  /*
    http://japhr.blogspot.com/2012/09/threejs-particle-stars.html
  */
  var stars = new THREE.Geometry();
  for (var i=0; i<10000; i++) {
    stars.vertices.push(new THREE.Vector3(
      1e3 * Math.random() - 5e2,
      1e3 * Math.random() - 5e2,
      -1e2
    ));
  }
  var star_stuff = new THREE.PointsMaterial();
  var star_system = new THREE.Points(stars, star_stuff);
  return star_system;

}

module.exports = StarSystem;
import '../src/style.css'
import * as THREE from 'three';

// import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

camera.position.setZ(30)

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


const treegeometry = new THREE.ConeGeometry( 6, 20, 4 ); 
const treematerial = new THREE.MeshStandardMaterial( {color: 0x256F3E} );
const tree = new THREE.Mesh(treegeometry, treematerial ); 
scene.add( tree );

const trunkgeometry = new THREE.CylinderGeometry( 1, 1, 5, 8 ); 
const trunkmaterial = new THREE.MeshStandardMaterial( {color: 0x594436} ); 
const trunk = new THREE.Mesh( trunkgeometry, trunkmaterial ); 
trunk.position.set(0, -12, 0)
scene.add( trunk );

const starGeometry = new THREE.IcosahedronGeometry(0.75,0)
const starMaterial = new THREE.MeshStandardMaterial({color: 0xffff00})
const star = new THREE.Mesh(starGeometry, starMaterial)
star.position.set(0, 10, 0)
scene.add(star)


const starLight = new THREE.PointLight( 0xffff00, 800, 0 );
starLight.position.set( 0, 12, 0 );
scene.add( starLight );


const lightLeft = new THREE.PointLight( 0xffffff, 800, 0 );
lightLeft.position.set( -10, 5, 20 );
scene.add( lightLeft );

const lightRight = new THREE.PointLight( 0xffffff, 800, 0 );
lightRight.position.set( 10, 5, 0 );
scene.add( lightRight );

// const lightHelperL = new THREE.PointLightHelper(lightLeft)
// const lightHelperR = new THREE.PointLightHelper(lightRight)
// scene.add(lightHelperL, lightHelperR)

// const controls = new OrbitControls(camera, renderer.domElement)


//run the loop!
function animate() {
	renderer.render( scene, camera );

    const rotationSpeed = 0.001;
    tree.rotation.y += rotationSpeed;
    trunk.rotation.y += rotationSpeed;
    star.rotation.y += rotationSpeed;
    // controls.update();
}
renderer.setAnimationLoop( animate );

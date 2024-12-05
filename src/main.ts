import '../src/style.css'

import * as THREE from 'three';

import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

const scene = new THREE.Scene();
scene.background = new THREE.TextureLoader().load('bg.png')

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

function onPointerMove( event ) {

	// calculate pointer position in normalized device coordinates
	// (-1 to +1) for both components

	pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

}

camera.position.setZ(20)

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

const lightBack = new THREE.PointLight( 0xffffff, 800, 0 );
lightBack.position.set( 0, 0, -80 );
scene.add( lightBack );


const lightRight = new THREE.PointLight( 0xffffff, 800, 0 );
lightRight.position.set( 10, 5, 0 );
scene.add( lightRight );

// const lightHelperL = new THREE.PointLightHelper(lightLeft)
// const lightHelperR = new THREE.PointLightHelper(lightRight)
// scene.add(lightHelperL, lightHelperR)

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableZoom = false
controls.maxPolarAngle = 1.5
controls.minPolarAngle = 1.5
controls.autoRotate = true;
controls.update()

function addBauble() {
    const colors = [0xBA2929, 0xE7DC15, 0x4B38F6, 0x38E9F6, 0xF638DA, 0x4EF638]
    const baublegeometry = new THREE.IcosahedronGeometry( 0.33, 1 ); 
    const baublematerial = new THREE.MeshPhongMaterial({
        color: colors[Math.floor(Math.random() * colors.length)],
        specular: 0xffffff,
        shininess: 100,
        reflectivity: 0.5
    }); 
    const bauble = new THREE.Mesh( baublegeometry,baublematerial ); 
    bauble.position.set(mouseSceneX, mouseSceneY, mouseSceneZ)
    scene.add(bauble)
}

let mouseIntersecting = false;
let mouseSceneX = 0;
let mouseSceneY = 0;
let mouseSceneZ = 0;

function updateMousePos (intersection) {
    const [x, y, z] = intersection.point;
    mouseSceneX = x
    mouseSceneY = y
    mouseSceneZ = z // plus whatever angle the camera is offset?
}


//run the loop!
function animate() {
    raycaster.setFromCamera( pointer, camera );

	// calculate objects intersecting the picking ray
	const intersects = raycaster.intersectObject( tree );
    if (intersects.length > 0){
        mouseIntersecting = true;
        updateMousePos(intersects[0])
    } else {
        mouseIntersecting = false;
    }
    


	renderer.render( scene, camera );

  
    controls.update();
}
// animate()
renderer.setAnimationLoop( animate );
window.addEventListener( 'pointermove', onPointerMove );

document.addEventListener('click', () => {
    if (mouseIntersecting) addBauble();
})

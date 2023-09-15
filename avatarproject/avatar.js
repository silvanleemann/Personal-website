import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.151.3/+esm'

import { OrbitControls } from "../../code/avatarproject/node_modules/three/examples/jsm/controls/OrbitControls.js"
import gsap from "./node_modules/gsap/all.js" 
import {GLTFLoader} from "./node_modules/three/examples/jsm/loaders/GLTFLoader.js" 





const scene = new THREE.Scene( );
scene.background = new THREE.Color("rgb(219, 255, 85)");

let mixer;
const loader = new GLTFLoader()
loader.load('./blenderimport/avatar.gltf', function(gltf){
    console.log(gltf)
    const obj = gltf.scene;

    

    scene.add(obj)
    
    mixer = new THREE.AnimationMixer(obj)
    const clips = gltf.animations;
    const clip = THREE.AnimationClip.findByName(clips, 'givemeaspin');
    const action = mixer.clipAction(clip);
    action.play();


    const tl = gsap.timeline({defaults: {duration:1}})
    tl.fromTo(obj.scale, {z:0, x:0, y:0}, {z:8, x:8, y:8})
    tl.fromTo("nav", {y: "-100%"}, {y: "0%"} )
    tl.fromTo(".spin",{y: "-100%", opacity: 0}, {y: "0%", opacity: 1} )

})


// sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
}

let camera;

// Create the camera object
camera = new THREE.PerspectiveCamera(60, sizes.width / sizes.height, 0.01, 5000);

// Set the camera's position and rotation
camera.position.z = 200;
camera.position.y = 10;
camera.rotation.x = -Math.PI / 4;
camera.fov = 40;
camera.updateProjectionMatrix();

// Add the camera to the scene
scene.add(camera);


// Light
const width = 200;
const height = 120;
const intensity = 1.5;
const rectLight = new THREE.RectAreaLight( 0xffffff, intensity,  width, height );
rectLight.position.set( 0, 0, -30 );
rectLight.lookAt( 0, 0, 0 );

const rectLightfront = new THREE.RectAreaLight( 0xffffff, intensity,  width, height );
rectLightfront.position.set( 0, 10, 40 );
rectLight.lookAt( 0, 0, 0 );


const light = new THREE.PointLight(0xffffff, 2.1, 100000);

light.position.set(-20, 80, 40);

scene.add(light)
scene.add( rectLight )
scene.add( rectLightfront )

// Resize
window.addEventListener("resize", () => {
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update Camera
    camera.updateProjectionMatrix()
    camera.aspect = sizes.width / sizes.height;
    renderer.setSize(sizes.width, sizes.height)
})





// Renderer
const canvas = document.querySelector(".webgl")
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(1)
renderer.render(scene, camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enablePan = false
controls.enableZoom = true
controls.autoRotate = true
controls.autoRotateSpeed = 1

controls.minDistance = 150;  // Minimum distance in units
controls.maxDistance = 900; // Maximum distance in units


const clock = new THREE.Clock();


const loop = () => {
    if(mixer){
    mixer.update(clock.getDelta())
    }
    controls.update()
    renderer.render(scene, camera);
    window.requestAnimationFrame(loop);
    

}

loop();





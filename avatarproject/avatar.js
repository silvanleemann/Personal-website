import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const canvas = document.querySelector('.webgl');
const scene = new THREE.Scene();

// Cam
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.z = 3;
scene.add(camera);

const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor(0xdbff55); // ✅ Fix here


const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(2, 2, 5);
scene.add(light);

// Mouse
const mouse = { x: 0, y: 0 };
let isMouseDown = false;

document.addEventListener('mousedown', () => isMouseDown = true);
document.addEventListener('mouseup', () => isMouseDown = false);
document.addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
});


window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});


const loader = new GLTFLoader();
let avatar = null;

loader.load(
    './blenderimport/avatar.gltf',
    (gltf) => {
        avatar = gltf.scene;
        avatar.scale.set(0.2, 0.2, 0.2);
        scene.add(avatar);
    },
    undefined,
    (error) => {
        console.error('Failed to load avatar.gltf:', error);
    }
);


const animate = () => {
    requestAnimationFrame(animate);

    if (avatar && isMouseDown) {
        avatar.rotation.y = mouse.x * 4;
        avatar.rotation.x = mouse.y * 1.5;
    }

    renderer.render(scene, camera);
};

animate();

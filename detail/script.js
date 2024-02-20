import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js';

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.outputColorSpace = THREE.SRGBColorSpace;

const container = document.querySelector('.video-block-intro-3d');
console.log(container);
renderer.setSize(300, 300);
renderer.setClearColor(0xFFFFFF, 0);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(15, 1, 1, 1000);
camera.position.set(14, 10, 18);
camera.lookAt(1, 1, 1);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enablePan = false;
controls.minDistance = 18;
controls.maxDistance = 24.9;
controls.minPolarAngle = 0.5;
controls.maxPolarAngle = 1.5;
controls.autoRotate = false;
controls.target = new THREE.Vector3(0, 1, 0);
controls.update();

const spotLight1 = new THREE.SpotLight(0xffffff, 3, 100, 0.2, 0.5);
spotLight1.position.set(0, 25, 0);
scene.add(spotLight1);

const spotLight2 = new THREE.SpotLight(0xffffff, 3, 100, 0.2, 0.5);
spotLight2.position.set(25, 0, 0);
scene.add(spotLight2);

const spotLight3 = new THREE.SpotLight(0xffffff, 3, 100, 0.2, 0.5);
spotLight3.position.set(0, 0, 25);
scene.add(spotLight3);

const spotLight4 = new THREE.SpotLight(0xffffff, 3, 100, 0.2, 0.5);
spotLight4.position.set(0, 0, -25);
scene.add(spotLight4);

const spotLight5 = new THREE.SpotLight(0xffffff, 3, 100, 0.2, 0.5);
spotLight5.position.set(-25, 0, 0);
scene.add(spotLight5);

const loader = new GLTFLoader().setPath('3D/');
loader.load('3D.gltf', (gltf) => {
    const mesh = gltf.scene;
    mesh.position.set(0, 0, 0);
    scene.add(mesh);
});

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();
import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';


container = document.getElementsByClassName('video-block-intro-3d');
document.body.appendChild(container);

renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(200, 200);
container.appendChild(renderer.domElement);
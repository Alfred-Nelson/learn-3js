import * as THREE from "three";

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const aspectRatio = window.innerWidth / window.innerHeight;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 100);
const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)
camera.position.set(2, 2, 10)

renderer.render(scene, camera)

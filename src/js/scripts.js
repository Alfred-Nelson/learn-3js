import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"

// Creating 3js renderer instance
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Creating scene and camera
const aspectRatio = window.innerWidth / window.innerHeight;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 100);
camera.position.set(2, 2, 10)

const orbit = new OrbitControls(camera, renderer.domElement)
orbit.addEventListener('change', ()=>{renderer.render(scene, camera)} );


const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)

// Adding box
const boxSize = 2
const boxSkeleton = new THREE.BoxGeometry(boxSize, boxSize, boxSize)
const boxSkin = new THREE.MeshBasicMaterial({ color: "blue" })
const box = new THREE.Mesh(boxSkeleton, boxSkin)
box.position.set(boxSize/2, boxSize/2, boxSize/2)
scene.add(box)

// Adding plane
const planeSkelton = new THREE.PlaneGeometry(20,20)
const planeSkin = new THREE.MeshBasicMaterial({ color: "white", side: THREE.DoubleSide })
const plane = new THREE.Mesh(planeSkelton, planeSkin)
plane.rotateX(-0.5 * Math.PI)
plane.position.set(0, -0.1, 0)
scene.add(plane)

const gridHelper = new THREE.GridHelper(20)
scene.add(gridHelper)

renderer.render(scene, camera)

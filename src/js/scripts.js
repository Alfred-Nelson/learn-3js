import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";

// Creating 3js renderer instance
const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
const mainWidth = window.innerWidth - 400;
const mainHeight = window.innerHeight - 200
renderer.setSize(mainWidth, mainHeight);
document.body.appendChild(renderer.domElement);
renderer.setClearColor(0xA5A3C1)

// Creating scene and camera
const aspectRatio = mainWidth / mainHeight;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 100);
const gui = new dat.GUI();
camera.position.set(0, 10, -10);

// Adding light
const ambientLight = new THREE.AmbientLight(0x404040)
const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 0.8)
directionalLight.position.set(0, 20, -10)
scene.add(ambientLight)
scene.add(directionalLight)
directionalLight.castShadow = true
directionalLight.shadow.camera.left = -10

// const axesHelper = new THREE.AxesHelper(5);
// scene.add(axesHelper);

// const dLShadowHelper = new THREE.CameraHelper(directionalLight.shadow.camera)
// scene.add(dLShadowHelper)

// Adding box
const boxSize = 2;
const rotateAngle = 0.02
const boxSkeleton = new THREE.BoxGeometry(boxSize, boxSize, boxSize);
const boxSkin = new THREE.MeshStandardMaterial({ color: "blue" });
const box = new THREE.Mesh(boxSkeleton, boxSkin);
box.position.set(boxSize / 2, boxSize / 2 + 0.01, boxSize / 2);
scene.add(box);
box.castShadow = true;

// Adding plane
const planeSkelton = new THREE.PlaneGeometry(20, 20);
const planeSkin = new THREE.MeshStandardMaterial({
  color: "white",
  side: THREE.DoubleSide,
});
const plane = new THREE.Mesh(planeSkelton, planeSkin);
plane.rotateX(-0.5 * Math.PI);
scene.add(plane);
plane.receiveShadow = true

// const gridHelper = new THREE.GridHelper(20);
// scene.add(gridHelper);

// Adding sphere
const sphereSize = 1;
let bounceStep = 0;
const bounceSpeed = 0.08;
const sphereSkelton = new THREE.SphereGeometry(sphereSize, 50, 50);
const sphereSkin = new THREE.MeshStandardMaterial({ color: "red" });
const sphere = new THREE.Mesh(sphereSkelton, sphereSkin);
scene.add(sphere);
sphere.position.set(5, sphereSize + 0.01, 2);
sphere.castShadow = true;

const animate = () => {
  bounceStep += bounceSpeed;
  sphere.position.y = 4 * Math.abs(Math.sin(bounceStep)) + sphereSize + 0.1;
  box.geometry.rotateY(rotateAngle)
  renderer.render(scene, camera);
};
// const boxColorController = gui.addColor(options, "boxColor")

renderer.setAnimationLoop(animate);

const orbit = new OrbitControls(camera, renderer.domElement);
renderer.render(scene, camera);
orbit.addEventListener("change", () => {
  renderer.render(scene, camera);
});


const guiOptions = {
    boxColor: "yellow",
    sphereColor: sphere.material.color.getHex(),
  };

const sphereControl = gui.addFolder("sphere")
sphereControl.addColor(guiOptions, "sphereColor").onChange((color) => {
    sphere.material.color.setHex(color)
});

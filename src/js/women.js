import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

const viewWidth = window.innerWidth - 400
const viewHeight = window.innerHeight - 200
const renderer = new THREE.WebGLRenderer()
renderer.shadowMap.enabled = true
renderer.setSize(viewWidth, viewHeight)
renderer.setClearColor(0xA5A3C1)
const women = document.getElementById("women")
women.appendChild(renderer.domElement);

const scene = new THREE.Scene()
const aspectRatio = viewWidth / viewHeight
const camera = new THREE.PerspectiveCamera(70, aspectRatio, 0.1, 1000)
camera.position.set(0, 20, 50)
const controls = new OrbitControls(camera, renderer.domElement)

const planeSkelton = new THREE.PlaneGeometry(50, 50)
const planeSkin = new THREE.MeshBasicMaterial({ color: "white" })
const plane = new THREE.Mesh(planeSkelton, planeSkin);
scene.add(plane)
plane.rotateX(-0.5 * Math.PI)

renderer.render(scene, camera)

controls.addEventListener("change", () => {
    renderer.render(scene, camera);
});

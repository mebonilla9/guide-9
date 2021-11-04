import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module'
import { GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'

// Stats
const stats = Stats()
document.body.appendChild(stats.dom)

// Utils
/**
 * Convert a degrees to radians
 * 
 * @param {*} degrees Integer value defined in degrees
 * @returns Integer values defined in radians
 */
const degreesToRadians = (degrees) => {
	return degrees * (Math.PI / 180)
}

// Loader
const loader = new GLTFLoader();

loader.load('/assets/bottle.glb', (glb) => {
    console.log(glb)
    const root = glb.scene
    root.position.y = 5
    scene.add(root)
}, (xhr) => {
    console.log(xhr.loaded/xhr.total * 100 + '% loaded')
}, (error) => {
    console.error('An error ocurred: ' + error)
})
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color(0x333333)

// Objects
const geometry = new THREE.PlaneGeometry(50, 50, 1, 1);
geometry.rotateX(degreesToRadians(90))

// Materials
const material = new THREE.MeshLambertMaterial({
	color: '#a6a6a6',
	wireframe: false,
	side: THREE.DoubleSide
})

// Mesh
const plane = new THREE.Mesh(geometry, material);
plane.castShadow = true
plane.receiveShadow = true
scene.add(plane)

// Lights
const lightDirectional = new THREE.DirectionalLight(0xffffff, 1)
lightDirectional.position.set(2, 2, 5)
scene.add(lightDirectional)

const lightAmbient = new THREE.AmbientLight(0xffffff, 0.4)
scene.add(lightAmbient)

/**
 * Sizes
 */
const sizes = {
	width: window.innerWidth,
	height: window.innerHeight
}

window.addEventListener('resize', () => {
	// Update sizes
	sizes.width = window.innerWidth
	sizes.height = window.innerHeight

	// Update camera
	camera.aspect = sizes.width / sizes.height
	camera.updateProjectionMatrix()

	// Update renderer
	renderer.setSize(sizes.width, sizes.height)
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.5, 10000)
camera.position.set(0,10,30)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
	canvas,
	antialias: true,
	alpha: true,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


/**
 * Animate
 */

const clock = new THREE.Clock()

const tick = () => {

	const elapsedTime = clock.getElapsedTime()

	// Update objects
	stats.update()

	// Update Orbital Controls
	controls.update()

	// Render
	renderer.render(scene, camera)

	// Call tick again on the next frame
	window.requestAnimationFrame(tick)
}

tick()
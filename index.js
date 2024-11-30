import * as THREE from "three";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.161.0/examples/jsm/controls/OrbitControls.js";

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,  // Field of view (FOV)
  window.innerWidth / window.innerHeight, // Aspect Ratio
  0.1,  // Near
  10    // Far
);
camera.position.z = 3;

// Create a cube geometry
const geometry = new THREE.BoxGeometry(1, 1, 1);  // Cube geometry
const material = new THREE.MeshBasicMaterial({ color: 0xaaaaaa });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Set up the OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;  // Optional: Smooth out the movement
controls.dampingFactor = 0.25;  // Speed of the camera rotation damping
controls.screenSpacePanning = false;  // Disable panning outside of the scene


// Raycasting for cursor detection
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let isHovering = false;

// Event listener for mouse move
window.addEventListener('mousemove', (event) => {
  // Calculate mouse position in normalized device coordinates (-1 to +1) for both components
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  // Update the raycaster with the camera and mouse position
  raycaster.update();
});

function animate() {
  requestAnimationFrame(animate);

  // Update the controls (for damping)
  controls.update();

  // Check if the mouse is over the cube
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObject(cube);

  // Change the cursor when hovering over the cube
  if (intersects.length > 0) {
    document.body.style.cursor = 'pointer'; // Change cursor to pointer
  } else {
    document.body.style.cursor = 'auto'; // Default cursor
  }

  // Optionally, rotate the cube itself
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
}

// Start the animation
animate();

import * as THREE from 'three';
import { TextureLoader } from 'three';

const width = window.innerWidth;
const height = window.innerHeight;
const speedMod = 2;

// used to track time
let smallMinute = 0;
let bigMinute = 0;
let tracktracker = 0;

// need to put sphere in the middle that increases gravity
// have 2 lines to make the player go to both ends of the field
// add a timer

// Texture tests
const textureLoader = new TextureLoader();
const texture = textureLoader.load(
  '/textures/backBeach.jpg', 
  (texture) => console.log('Texture loaded successfully:', texture),
  undefined,
  (err) => console.error('Error loading texture:', err)
);
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
//texture.repeat.set(4, 4); // Set texture to repeat

const textureMat = new THREE.MeshStandardMaterial({ map: texture });

// unlimited Texture works
const playerTextLoader = new TextureLoader();
const playerTexture = textureLoader.load('/textures/backGrass2.jpg', );
playerTexture.wrapS = THREE.RepeatWrapping;
playerTexture.wrapT = THREE.RepeatWrapping;
//texture.repeat.set(4, 4); // Set texture to repeat

const playerTextureMat = new THREE.MeshStandardMaterial({ map: playerTexture});

// Init
const camera = new THREE.PerspectiveCamera(70, width / height, 0.01, 10);
camera.position.z = 1;

const scene = new THREE.Scene();

// Add ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 1); // White light, full intensity
scene.add(ambientLight);

// Add player
const playerGeo = new THREE.ConeGeometry(0.2, 0.5, 4);
const playerMat = new THREE.MeshBasicMaterial({ color: 0x000fff, transparent: false, opacity: 1 });
const playerCar = new THREE.Mesh(playerGeo, playerTextureMat );
scene.add(playerCar);

// Player bounding box
//let playerBB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
//playerBB.setFromObject(playerCar);
// Player bounding sphere 
const boundingSphereRadius = 0.20; // Adjust radius as necessary 
let playerBB = new THREE.Sphere(playerCar.position, boundingSphereRadius);

playerCar.rotation.x = -1.50;
playerCar.rotation.z = 1.55;
playerCar.position.z = -4.5;
playerCar.position.y = -2;

// Add origin marker
const markerGeometry = new THREE.SphereGeometry(0.05, 32, 32);
const markerMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const originMarker = new THREE.Mesh(markerGeometry, markerMaterial);
originMarker.position.set(0, 0, -4.5);
scene.add(originMarker);

// Add Hole in the screen
const pitGeometry = new THREE.SphereGeometry(1, 32, 32);
const pitMaterial = new THREE.MeshBasicMaterial({ color: 0x000fff, transparent: true, opacity: 0.5 });
const pitMarker = new THREE.Mesh(pitGeometry, pitMaterial);
pitMarker.position.set(0, 0, -4.5);
scene.add(pitMarker);

const holeBoundingSphereRadius = 1; // Adjust radius as necessary 
let HoleBB = new THREE.Sphere(pitMarker.position, holeBoundingSphereRadius);

///////////////////////////////////////////////////////////////////////////////////////////
// Adding test collision test cube
const geometry = new THREE.BoxGeometry(0.5, 5.5, 0.2);
const material = new THREE.MeshNormalMaterial();
const myBoy = new THREE.Mesh(geometry, material);
scene.add(myBoy);
myBoy.position.x = -3;
myBoy.position.z = -4.5;

let testBB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
testBB.setFromObject(myBoy);

// Adding test collision test cube
const geometry2 = new THREE.BoxGeometry(5.5, 0.5, 0.2);
const material2 = new THREE.MeshNormalMaterial();
const myBoy2 = new THREE.Mesh(geometry2 , material);
scene.add(myBoy2);
myBoy2.position.y = 3;
myBoy2.position.z = -4.5;

let testBB2 = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
testBB2.setFromObject(myBoy2);

// Adding test collision test cube
const geometry3 = new THREE.BoxGeometry(0.5, 5.5, 0.2);
const material3 = new THREE.MeshNormalMaterial();
const myBoy3 = new THREE.Mesh(geometry3 , material);
scene.add(myBoy3);
myBoy3.position.x = 3;
myBoy3.position.z = -4.5;

let testBB3 = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
testBB3.setFromObject(myBoy3);

// Adding test collision test cube
const geometry4 = new THREE.BoxGeometry(5.5, 0.5, 0.2);
const material4 = new THREE.MeshNormalMaterial();
const myBoy4 = new THREE.Mesh(geometry4 , material);
scene.add(myBoy4);
myBoy4.position.y = -3;
myBoy4.position.z = -4.5;

let testBB4 = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
testBB4.setFromObject(myBoy4);
///////////////////////////////////////////////////////////////////////////////////

// Adding test collision test cube
const geometry5 = new THREE.BoxGeometry(0.5, 3.0, 0.2);
const material5 = new THREE.MeshBasicMaterial({ color: 0xff0000, transparent: false, opacity: 1 });
const myBoy5 = new THREE.Mesh(geometry5 , material5);
scene.add(myBoy5);
myBoy5.position.y = 1.6;
myBoy5.position.z = -4.9;

let track1BB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
track1BB.setFromObject(myBoy5);

// Adding test collision test cube
const geometry6 = new THREE.BoxGeometry(0.5, 3.0, 0.2);
const material6 = new THREE.MeshBasicMaterial({ color: 0xff0000, transparent: false, opacity: 1 });
const myBoy6 = new THREE.Mesh(geometry6 , material6);
scene.add(myBoy6);
myBoy6.position.y = -1.6;
myBoy6.position.z = -4.9;

let teack2BB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
teack2BB.setFromObject(myBoy6);



// Add background
const backGeo = new THREE.PlaneGeometry(6, 6);
const background = new THREE.Mesh(backGeo, textureMat);
scene.add(background);
background.position.z = -5;

let backgroundBB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
backgroundBB.setFromObject(background);

// Rendering the scene and starting animation
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

// Controls
let playerCon = { keys: {} };
document.addEventListener('keydown', (event) => { playerCon.keys[event.key] = true; });
document.addEventListener('keyup', (event) => { playerCon.keys[event.key] = false; });

// HTML element for displaying values
const infoDiv = document.getElementById('info');

// Animation
function animate(time) {
  if (playerCon.keys['w']) {
    playerCar.position.y += 0.01 * Math.sin(playerCar.rotation.y) * speedMod ; // forwards
    playerCar.position.x -= 0.01 * Math.cos(playerCar.rotation.y) * speedMod ; // forwards
  }

  if (playerCon.keys['s']) {
    playerCar.position.y -= 0.01 * Math.sin(playerCar.rotation.y) * speedMod ; // backwards
    playerCar.position.x += 0.01 * Math.cos(playerCar.rotation.y) * speedMod ; // backwards
  }

  if (playerCon.keys['a']) playerCar.rotation.y -= 0.02 * speedMod ; // left
  if (playerCon.keys['d']) playerCar.rotation.y += 0.02 * speedMod ; // right

  if (playerCar.rotation.y > 6.30) {
    playerCar.rotation.y = 0;
  } else if (playerCar.rotation.y < -6.30) {
    playerCar.rotation.y = 0;
  }

  if (playerCon.keys['z']) playerCar.position.z += 0.01 * speedMod ; // z
  if (playerCon.keys['x']) playerCar.position.z -= 0.01 * speedMod ; // z

  //playerBB.copy(playerCar.geometry.boundingBox).applyMatrix4(playerCar.matrixWorld);
  playerBB.center.copy(playerCar.position); // Update sphere position 
  checkCollisions();
  gravity();

  const mathTime = Math.sin(playerCar.rotation.y);
  const mathTime2 = Math.cos(playerCar.rotation.y);

  // Update infoDiv with mesh rotation values to show player location
  infoDiv.innerHTML = `
    Rotation X: ${playerCar.rotation.x.toFixed(2)}<br>
    Rotation Y: ${playerCar.rotation.y.toFixed(2)}<br>
    Rotation Z: ${playerCar.rotation.z.toFixed(2)}<br>
    Position x: ${playerCar.position.x.toFixed(2)}<br>
    Position y: ${playerCar.position.y.toFixed(2)}<br>
    Position z: ${playerCar.position.z.toFixed(2)}<br>
    Math Time Sin: ${mathTime.toFixed(2)}<br>
    Math Time Cos: ${mathTime2.toFixed(2)}
  `;
  
  // Update the timer every second
  setInterval(updateTimer, 1000);


  renderer.render(scene, camera);
}

function animateCollisions() {
  playerCar.material.color.set(0xff0000);
  playerCar.position.y -= 0.01 * Math.sin(playerCar.rotation.y) * speedMod ; // pushing the player out
  playerCar.position.x += 0.01 * Math.cos(playerCar.rotation.y) * speedMod ;
  /*if (playerCar.position.y >= 0){
  	if (playerCar.position.x >= 0){
  		playerCar.position.y += 0.01 * speedMod 
  		playerCar.position.x += 0.01 * speedMod 
  	} else {
  		playerCar.position.y += 0.01 *speedMod 
  		//playerCar.position.x -= 0.01
  	}
  	
  } else{
  	playerCar.position.y -= 0.01 * speedMod 
  }
  //if (playerCar.position.x >= 0){playerCar.position.x -= 0.01} else {playerCar.position.x += 0.01}
  */
}

function gravity() {
  playerCar.position.z -= 0.005 * speedMod ; // pushing the player onto the background
  if (playerBB.intersectsBox(backgroundBB)) {
    playerCar.position.z += 0.015 * speedMod ;
  }
}

function gravityHole() {
	playerCar.position.z -= 0.02 * speedMod 
}

function checkCollisions() {
  playerCar.material.color.set(0x00ff00);
  if (playerBB.intersectsBox(testBB)) {
    animateCollisions();
  } else {
    //playerCar.material.color.set(0x00ffff);
  }
  if (playerBB.intersectsBox(testBB2)) {
    animateCollisions();
  } else {
    //playerCar.material.color.set(0x00ffff);
  }
  if (playerBB.intersectsBox(testBB3)) {
    animateCollisions();
  } else {
    //playerCar.material.color.set(0x00ffff);
  }
  if (playerBB.intersectsBox(testBB4)) {
    animateCollisions();
  } else {
    //playerCar.material.color.set(0x00ffff);
  }
  if (playerBB.intersectsBox(track1BB)) {
    lapHalfCollisions();
  } else {
    //playerCar.material.color.set(0x00ffff);
  }
  if (playerBB.intersectsBox(teack2BB)) {
    lapFullCollisions();
  } else {
    //playerCar.material.color.set(0x00ffff);
  }
  if (playerBB.intersectsBox(HoleBB)) {
    gravityHole();
  }
}

function lapFullCollisions() {
    if (tracktracker == 1) {
    	  updateRecord()
    }
    tracktracker = 0
    myBoy5.material.color.set(0xff0000);
    myBoy6.material.color.set(0xff0000);
}

function lapHalfCollisions() {
    tracktracker = 1
    myBoy5.material.color.set(0x00ff00);
    myBoy6.material.color.set(0x00ff00);
}

function updateRecord() {
  let formattedTime = bigMinute.toString().padStart(2, '0') + ':' + smallMinute.toString().padStart(2, '0');
  document.getElementById('record').textContent = formattedTime;

}

function updateTimer() {
  let now = new Date();
  
  // Uncomment to see the progression
  // console.log(`Current Time: ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`);

  // Compute elapsed time in seconds
  let elapsedSeconds = Math.floor((now.getTime() - startTime.getTime()) / 1000);

  bigMinute = Math.floor(elapsedSeconds / 60); // Total minutes
  smallMinute = elapsedSeconds % 60; // Seconds in the current minute

  let formattedTime = bigMinute.toString().padStart(2, '0') + ':' + smallMinute.toString().padStart(2, '0');
  document.getElementById('timer').textContent = formattedTime;
}



// Start time reference
let startTime = new Date();

// Call updateTimer every second
setInterval(updateTimer, 1000);


import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const groundUrl = './src/ground.jpg';
const wallUrl = './src/wall.png';
const skyUrl = './src/sky.png';
const pirateUrl = './src/Pirate Captain.glb';

//renderer setup
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

//scene and camera 
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 8, 28);

//orbit controls 
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.minDistance = 3;
controls.maxDistance = 100;
controls.maxPolarAngle = Math.PI / 2 - 0.02;

//texture loader 
const texLoader = new THREE.TextureLoader();

//skybox 
texLoader.load(skyUrl, (skyTex) => {
  skyTex.mapping = THREE.EquirectangularReflectionMapping;
  skyTex.colorSpace = THREE.SRGBColorSpace;
  scene.background = skyTex;
  scene.environment = skyTex;
});

//ground plane 
const groundTex = texLoader.load(groundUrl);
groundTex.wrapS = groundTex.wrapT = THREE.RepeatWrapping;
groundTex.repeat.set(20, 20);
groundTex.colorSpace = THREE.SRGBColorSpace;

const groundMesh = new THREE.Mesh(
  new THREE.PlaneGeometry(200, 200),
  new THREE.MeshLambertMaterial({ map: groundTex })
);
groundMesh.rotation.x = -Math.PI / 2;
groundMesh.receiveShadow = true;
scene.add(groundMesh);


//ambient light
const ambientLight = new THREE.AmbientLight(new THREE.Color(1, 0.93, 0.87), 0.5);
scene.add(ambientLight);

//directional light (sun)
const dirLight = new THREE.DirectionalLight(new THREE.Color(1, 1, 1), 1.5);
dirLight.position.set(30, 50, 20);
dirLight.castShadow = true;
dirLight.shadow.mapSize.set(2048, 2048);
dirLight.shadow.camera.near = 0.5;
dirLight.shadow.camera.far = 150;
dirLight.shadow.camera.left = -60;
dirLight.shadow.camera.right = 60;
dirLight.shadow.camera.top = 60;
dirLight.shadow.camera.bottom = -60;
scene.add(dirLight);

//point light near pirate 
const pointLight = new THREE.PointLight(new THREE.Color(1, 0.53, 0.2), 12, 50);
pointLight.position.set(0, 5, 0);
pointLight.castShadow = true;
scene.add(pointLight);

//orb at point light 
const lightOrb = new THREE.Mesh(
  new THREE.SphereGeometry(0.4, 16, 16),
  new THREE.MeshBasicMaterial({ color: new THREE.Color(1, 0.9, 0.6), transparent: true, opacity: 0.9 })
);
pointLight.add(lightOrb);

//wall texture
const wallTex = texLoader.load(wallUrl);
wallTex.wrapS = wallTex.wrapT = THREE.RepeatWrapping;
wallTex.colorSpace = THREE.SRGBColorSpace;

//helper function to create a mesh and add it to the scene
function addMesh(geometry, material, x, y, z, castShadow = true) {
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(x, y, z);
  if (castShadow) mesh.castShadow = true;
  mesh.receiveShadow = true;
  scene.add(mesh);
  return mesh;
}

//colored materials for the shapes
const wallMat = new THREE.MeshLambertMaterial({ map: wallTex });
const redMat = new THREE.MeshPhongMaterial({ color: new THREE.Color(1, 0, 0), shininess: 60 });
const blueMat = new THREE.MeshPhongMaterial({ color: new THREE.Color(0, 0, 1), shininess: 80 });
const greenMat = new THREE.MeshPhongMaterial({ color: new THREE.Color(0, 1, 0), shininess: 40 });
const yellowMat = new THREE.MeshPhongMaterial({ color: new THREE.Color(1, 1, 0), shininess: 100 });
const cyanMat = new THREE.MeshPhongMaterial({ color: new THREE.Color(0, 1, 1), shininess: 80 });
const purpleMat = new THREE.MeshPhongMaterial({ color: new THREE.Color(0.5, 0, 1), shininess: 70 });
const orangeMat = new THREE.MeshPhongMaterial({ color: new THREE.Color(1, 0.5, 0), shininess: 60 });
const whiteMat = new THREE.MeshPhongMaterial({ color: new THREE.Color(0.93, 0.93, 0.93), shininess: 30 });

// pillars with wall texture
const cubeGeo = new THREE.BoxGeometry(2, 4, 2);
const cubePositions = [
  [-10, 2, 0], [10, 2, 0],
  [0, 2, -10], [0, 2, 10],
  [-7, 2, -7], [7, 2, -7],
  [-7, 2, 7], [7, 2, 7],
];
const cubes = cubePositions.map(([x, y, z]) => addMesh(cubeGeo, wallMat, x, y, z));

// boxes on top of pillars
const capGeo = new THREE.BoxGeometry(2.4, 0.4, 2.4);
const caps = cubePositions.map(([x, , z]) => addMesh(capGeo, yellowMat, x, 4.2, z));

// balls
const sphereGeo = new THREE.SphereGeometry(0.8, 32, 32);
const sphereData = [
  [-4, 1, 4, redMat],
  [4, 1, 4, blueMat],
  [-4, 1, -4, greenMat],
  [4, 1, -4, purpleMat],
  [0, 1, 14, cyanMat],
  [0, 1, -14, orangeMat],
];
const spheres = sphereData.map(([x, y, z, mat]) => addMesh(sphereGeo, mat, x, y, z));

// poles
const cylGeo = new THREE.CylinderGeometry(0.5, 0.5, 5, 32);
const cylPositions = [
  [-14, 2.5, 0, greenMat],
  [14, 2.5, 0, cyanMat],
  [0, 2.5, -18, redMat],
  [0, 2.5, 18, blueMat],
];
const cylinders = cylPositions.map(([x, y, z, mat]) => addMesh(cylGeo, mat, x, y, z));

// rings
const torusGeo = new THREE.TorusGeometry(1.2, 0.35, 16, 64);
const torusData = [
  [-5, 1.2, 12, orangeMat],
  [5, 1.2, 12, purpleMat],
  [-5, 1.2,-12, yellowMat],
  [5, 1.2,-12, whiteMat],
];
const tori = torusData.map(([x, y, z, mat]) => addMesh(torusGeo, mat, x, y, z));

//cones
const coneGeo = new THREE.ConeGeometry(0.8, 2.5, 32);
const coneData = [
  [-18, 1.25, 8, redMat],
  [18, 1.25, 8, blueMat],
  [-18, 1.25, -8, greenMat],
  [18, 1.25, -8, yellowMat],
];
const cones = coneData.map(([x, y, z, mat]) => addMesh(coneGeo, mat, x, y, z));

// wow factor - space toggles float mode
const floatingShapes = [...cubes, ...caps, ...spheres, ...cylinders, ...tori, ...cones];
const basePositions = floatingShapes.map(m => m.position.clone());
const baseRotations = floatingShapes.map(m => ({ x: m.rotation.x, y: m.rotation.y, z: m.rotation.z }));
const floatVelocities = floatingShapes.map(() => new THREE.Vector3(0, 0, 0));
let floatMode = false;
const FLOAT_SPHERE_RADIUS = 18;
const FLOAT_SPEED = 2.5;

function randomInSphere() {
  const theta = Math.random() * Math.PI * 2;
  const phi = Math.acos(2 * Math.random() - 1);
  const r = FLOAT_SPHERE_RADIUS * Math.cbrt(Math.random());
  return new THREE.Vector3(
    r * Math.sin(phi) * Math.cos(theta),
    r * Math.sin(phi) * Math.sin(theta),
    r * Math.cos(phi)
  );
}

function randomVelocity() {
  return new THREE.Vector3(
    (Math.random() - 0.5) * 2,
    (Math.random() - 0.5) * 2,
    (Math.random() - 0.5) * 2
  ).normalize().multiplyScalar(FLOAT_SPEED);
}

window.addEventListener('keydown', (e) => {
  if (e.code !== 'Space') return;
  e.preventDefault();
  floatMode = !floatMode;
  if (floatMode) {
    floatingShapes.forEach((mesh, i) => {
      mesh.position.copy(randomInSphere());
      floatVelocities[i].copy(randomVelocity());
    });
  } else {
    floatingShapes.forEach((mesh, i) => {
      mesh.position.copy(basePositions[i]);
      mesh.rotation.set(baseRotations[i].x, baseRotations[i].y, baseRotations[i].z);
    });
  }
});

// pirate model
const gltfLoader = new GLTFLoader();
gltfLoader.load(
  pirateUrl,
  (gltf) => {
    const pirate = gltf.scene;
    pirate.scale.set(3, 3, 3);
    pirate.position.set(0, 0, 0);
    pirate.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    scene.add(pirate);
  },
  undefined,
  (err) => console.error('GLTF load error:', err)
);

// animate shapes
const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);
  const dt = Math.min(clock.getDelta(), 0.1);
  const t = clock.elapsedTime;

  if (floatMode) {
    floatingShapes.forEach((mesh, i) => {
      // this adds random velocity jitters
      floatVelocities[i].x += (Math.random() - 0.5) * 4 * dt;
      floatVelocities[i].y += (Math.random() - 0.5) * 4 * dt;
      floatVelocities[i].z += (Math.random() - 0.5) * 4 * dt;
      floatVelocities[i].normalize().multiplyScalar(FLOAT_SPEED);

      mesh.position.addScaledVector(floatVelocities[i], dt);
      const dist = mesh.position.length();
      if (dist > FLOAT_SPHERE_RADIUS) {
        const n = mesh.position.clone().normalize();
        mesh.position.copy(n).multiplyScalar(FLOAT_SPHERE_RADIUS);
        floatVelocities[i].reflect(n);
      }
      mesh.rotation.x += floatVelocities[i].y * dt * 0.5;
      mesh.rotation.y += floatVelocities[i].x * dt * 0.5;
      mesh.rotation.z += floatVelocities[i].z * dt * 0.5;
    });
  } else {
    cubes.forEach((c, i) => {
      c.rotation.y = t * 0.3 * (i % 2 === 0 ? 1 : -1);
    });
    spheres.forEach((s, i) => {
      s.position.y = basePositions[cubes.length + caps.length + i].y + Math.sin(t * 1.2 + i * 1.1) * 0.5;
    });
    tori.forEach((r, i) => {
      r.rotation.x = t * 0.8 + i;
      r.rotation.z = t * 0.5 + i;
    });
    cones.forEach((c, i) => {
      c.rotation.y = t * 1.0 * (i % 2 === 0 ? 1 : -1);
    });
  }

  pointLight.position.x = Math.cos(t * 0.5) * 8;
  pointLight.position.z = Math.sin(t * 0.5) * 8;
  pointLight.position.y = 4 + Math.sin(t) * 1;

  controls.update();
  renderer.render(scene, camera);
}

animate();

// resize winodw
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

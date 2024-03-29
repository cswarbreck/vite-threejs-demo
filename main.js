import './style.css'

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

const geometry1 = new THREE.TorusGeometry( 10, 3, 16, 100 );
const geometry2 = new THREE.SphereGeometry(7, 16, 16);
// const material = new THREE.MeshBasicMaterial( { color: 0xff6347, wireframe: true } );
const material = new THREE.MeshStandardMaterial( { color: 0xff6347 } );
const material2 = new THREE.MeshStandardMaterial({ color: 0xfcd12a })
const torus = new THREE.Mesh( geometry1, material );
const sphere = new THREE.Mesh(geometry2, material2)
scene.add(torus, sphere);

const pointLight = new THREE.PointLight(0xff00ff);
pointLight.position.set(5,5,5)

const pointLight2 = new THREE.PointLight(0x0000ff);
pointLight2.position.set(10,20,15)
scene.add(pointLight, pointLight2);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight2);
const gridHelper = new THREE.GridHelper(200, 50)
scene.add(lightHelper, gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

function addStar(){
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({colour: 0xffffff});
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
  
}

Array(200).fill().forEach(addStar);


function animate(){
  requestAnimationFrame(animate);

  torus.rotation.x += 0.02;
  torus.rotation.y += 0.03;
  torus.rotation.z += 0.01;
  renderer.render(scene, camera)
}

animate();
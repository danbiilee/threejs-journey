import * as THREE from 'three';

const sizes = {
  width: 800,
  height: 600,
};

const canvas = document.querySelector('canvas.webgl');
const scene = new THREE.Scene();

/**
 * PerspectiveCamera
 * - 원근감이 있는 실제 카메라
 *
 * 파라미터 1. field of view
 * - 카메라 뷰의 화각
 * - 좁은 화각: 망원, 크게 찍음
 * - 넓은 화각: 광각, 넓게 찍음
 *
 * 파라미터 2. aspect ratio
 * - canvas width / height
 *
 * 파라미터 3. near
 *
 *
 * 파라미터 4. far
 */
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  1,
  100
);

const renderer = new THREE.WebGLRenderer({ canvas });

const geometry = new THREE.BoxGeometry(1, 1, 1);
const meterial = new THREE.MeshBasicMaterial({ color: 'red' });
const mesh = new THREE.Mesh(geometry, meterial);

camera.position.z = 3;
mesh.rotation.x = Math.PI * 0.25;
mesh.rotation.y = Math.PI * 0.25;

scene.add(camera);
scene.add(mesh);

renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

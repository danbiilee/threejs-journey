import * as THREE from 'three';
import gsap from 'gsap';

const sizes = {
  width: 800,
  height: 600,
};

const canvas = document.querySelector('canvas.webgl');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
const renderer = new THREE.WebGLRenderer({ canvas });

const geometry = new THREE.BoxGeometry(1, 1, 1);
const meterial = new THREE.MeshBasicMaterial({ color: 'red' });
const mesh = new THREE.Mesh(geometry, meterial);

camera.position.z = 3;

scene.add(camera);
scene.add(mesh);

renderer.setSize(sizes.width, sizes.height);

/**
 * Frame Rate
 * - 화면이 움직이는 속도
 * - 대부분 초당 60프레임으로 실행됨 (16ms마다 1프레임)
 */

/**
 * Animate
 */
let time = Date.now();

const tick = () => {
  // Time
  const currentTime = Date.now();
  const deltaTime = currentTime - time; // 이전 프레임 이후 소요된 시간
  time = currentTime;

  // Update objects
  // deltaTime 기준으로 회전하기 때문에 모든 컴퓨터와 화면에서 프레임 속도와 관계없이 동일한 회전 속도로 움직임
  mesh.rotation.y += 0.01 * deltaTime;

  // Render
  renderer.render(scene, camera);

  // requestAnimationFrame(): 다음 프레임에서 콜백 함수 호출 (🚨 매 프레임에서 호출하는 게 아님)
  window.requestAnimationFrame(tick);
};

// tick();

/**
 * Using Clock
 * - 🚨 getDelta(): 원치 않는 결과를 만들어낼 수 있으므로 이해없이 사용하지 않기
 */
const clock = new THREE.Clock();

const tickClock = () => {
  // getElapsedTime(): Clock이 생성된 후 초가 얼마나 흘렀는지 반환
  const elapsedTime = clock.getElapsedTime();

  // Update objects
  mesh.position.x = Math.cos(elapsedTime);
  mesh.position.y = Math.sin(elapsedTime);
  camera.lookAt(mesh.position); // Object3D에는 다 적용 가능

  renderer.render(scene, camera);
  window.requestAnimationFrame(tickClock);
};

// tickClock();

/**
 * Using a library GSAP
 * - gsap.to(): A에서 B로 이동하는 애니메이션 "트윈"을 생성
 * - requestAnimationFrame을 내장하고 있으므로 직접 애니메이션을 업데이트 할 필요는 없음
 */
gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 });

const tickGSAP = () => {
  renderer.render(scene, camera);
  window.requestAnimationFrame(tickGSAP);
};

tickGSAP();

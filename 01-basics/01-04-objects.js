import * as THREE from 'three';

// Sizes
const sizes = {
  width: 800,
  height: 600,
};

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const meterial = new THREE.MeshBasicMaterial({ color: 'red' });
const mesh = new THREE.Mesh(geometry, meterial);

/**
 * Move Objects
 * - position: Vector3 class의 인스턴스
 * - position 기본 방향 > x: 오른쪽, y: 위, x: 뒤
 * - 🚨 render 메소드 호출 전에 위치 조정 해야 함
 */
mesh.position.x = 0.7;
mesh.position.y = -0.5;
mesh.position.z = 1;
// mesh.position.set(0.7, - 0.5, 1); // 위와 동일
// console.log(mesh.position.length());
// console.log(mesh.position.normalize()); // 정규화(값은 1단위로 줄이되 방향 유지)

/**
 * Scale Objects
 * - scale: Vector3 class의 인스턴스
 * - 🚨 음수 값은 버그가 발생할 수 있으므로 사용하지 않기
 */
mesh.scale.set(2, 0.25, 0.5);

/**
 * Rotate Objects
 * - 축 방향으로 개체의 중심을 통과하는 막대를 놓은 다음 해당 막대에서 해당 개체를 회전시키는 원리
 * - 방법 1. rotation
 *   - Vector3가 아니라 Euler 클래스의 인스턴스
 *   - 한 축을 회전하는 동안 다른 축의 방향도 변경되기 때문에(순서 문제) gimbal lock 현상이 발생할 수 있음
 *   - 적용 순서: x > y > z
 *   - 순서 변경 시 object.rotation.reorder('YXZ')
 * - 방법 2. quaternion
 *   - 수학적 방식으로 rotation의 순서 문제를 해결
 *   - rotation을 변경하면 quaternion도 변경되고 그 반대도 마찬가지 -> 둘 중 하나를 원하는 대로 사용하기
 */
mesh.rotation.x = Math.PI * 0.25;
mesh.rotation.y = Math.PI * 0.25;

/**
 * Camera
 * - 필수 파라미터: the field of view(fov), the aspect ratio
 * - 기본적으로 카메라와 오브젝트는 씬의 중간에 위치하므로 카메라를 움직여야 오브젝트가 보임
 * - 🚨 위치 조정은 render 메소드 호출 전에 하기
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;

/**
 * LooAt
 * - Object3D의 메소드
 * - z축을 대상을 향해 자동 회전시킴
 * - 파라미터: Vector3
 */
// camera.lookAt(mesh.position);
// camera.lookAt(new THREE.Vector3(0, -1, 0));

/**
 * 상속
 * position, scale, rotation, quaternion, lookAt > PerspectiveCamera, Mesh > Object3D
 */

/**
 * Group
 * - Object3D 클래스를 상속
 * - 그룹에 오브젝트를 추가해서 한 번에 position, scale 등의 Object3D 클래스 프로퍼티의 값을 조정할 수 있음
 */
const group = new THREE.Group();
group.scale.y = 2;
group.rotation.y = 0.2;

const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
);
const cube2 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
);
const cube3 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
);

cube1.position.x = -1.5;
cube2.position.x = 0;
cube3.position.x = 1.5;

group.add(cube1);
group.add(cube2);
group.add(cube3);

// Axes Helper
// 파라미터: 길이
const axesHelper = new THREE.AxesHelper(2);

// Add Scene
// scene.add(mesh);
scene.add(camera);
scene.add(axesHelper);
scene.add(group);

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas });

// Render
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// 动画库
import gsap from 'gsap';
import * as dat from 'dat.gui';


// 创建场景
const scene = new THREE.Scene();

// 创建相机
// 角度75， 宽高比， 最小值，最大值
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

// 设置相机位置  x,y,z的位置
camera.position.set(0, 0, 10);
scene.add(camera);

// 添加物体
// 创建几何体
for (let i = 0; i < 20; i++) {
  const geometry = new THREE.BufferGeometry();
  const positionArray = new Float32Array(9);
  for (let j = 0; j < 9; j++) {
    positionArray[j] = Math.random() * 10 - 5;
  }
  geometry.setAttribute('position', new THREE.BufferAttribute(positionArray, 3));
  let color = new THREE.Color(Math.random(), Math.random(), Math.random());
  const material = new THREE.MeshBasicMaterial({color: color, transparent: true, opacity: 0.5});
  // 根据几何体和材质创建物体
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
}

// 渲染器
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(window.innerWidth, window.innerHeight);

// 将webgl渲染的canvas的内容渲染到body上
document.body.appendChild(renderer.domElement);

// 使用渲染器渲染场景
// renderer.render(scene, camera);

// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);
// 设置控制器阻尼，让控制器真实
controls.enableDamping = true;

// 添加坐标辅助器
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper)

function render() {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

render();

// 监听画面变化，更新渲染画面
window.addEventListener('resize', () => {
  // 更新摄像头
  camera.aspect = window.innerWidth / window.innerHeight;
  // 更新摄像机的投影矩阵
  camera.updateProjectionMatrix();
  // 更新渲染器
  renderer.setSize(window.innerWidth, window.innerHeight);

  renderer.setPixelRatio(window.innerWidth / window.innerHeight);
});

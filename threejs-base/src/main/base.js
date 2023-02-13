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

// 添加物体, 创建几何体
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshBasicMaterial({color: 0xffff00});

const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

// 修改物体的位置
// cube.position.set(5, 0, 0);
// cube.position.x = 3;

// 设置缩放
// cube.scale.set(3, 2, 1);
// cube.scale.x = 5;

// 设置旋转
// cube.rotation.set(Math.PI / 4, 0, 0);


// 将物体添加到场景
scene.add(cube);

const gui = new dat.GUI();
gui.add(cube.position, 'x').min(0).max(5).step(0.01).name('移动x轴').onChange((value) => {
  // console.log('移动了：', value);
}).onFinishChange((value) => {
  console.log('结束调节：', value);
});

const params = {
  color: '#ffff00',
  fn: () => {
    // 让立方体运动起来
    gsap.to(cube.position, {x: 5, duration: 2, yoyo: true})
  }
}
// 修改物体颜色
gui.addColor(params, 'color').onChange((value) => {
  console.log('颜色修改：', value);
  cube.material.color.set(value);
});
// 设置选型框
gui.add(cube, 'visible').name('是否显示');

const folder = gui.addFolder('设置立方体属性');
folder.add(cube.material,'wireframe');
// 设置按钮点击触发某个事件
folder.add(params, 'fn').name('立方体运动');


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

// 设置时钟
// const clock = new THREE.Clock();
// let time = clock.getElapsedTime();
// let deltaTime = clock.getDelta();

// 设置动画
// const animate1 = gsap.to(cube.position, {
//   x: 5,
//   duration: 5,
//   ease: 'power1.inOut',
//   // 重复次数，-1是一直运动
//   repeat: 2,
//   // 往返运动
//   yoyo: true,
//   delay: 2,
//   onComplete: () => {
//     console.log('动画完成');
//   }, onStart: () => {
//     console.log('动画开始');
//   }});
// gsap.to(cube.rotation, { x: 2 * Math.PI, duration: 5, ease: 'power1.inOut'});


window.addEventListener('dblclick', () => {
  // 双击暂停和运动
  // if (animate1.isActive()) {
  //   animate1.pause();
  // } else {
  //   animate1.resume();
  // }

  // 双击全屏, 退出全屏
  const fullscreenElement = document.fullscreenElement;
  if (!fullscreenElement) {
    // 让画布全屏
    renderer.domElement.requestFullscreen();
  } else {
    // 退出全屏
    document.exitFullscreen();
  }
});

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

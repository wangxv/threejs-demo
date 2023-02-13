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

const div = document.createElement('div');
div.style.width = '200px';
div.style.height = '200px';
div.style.position = 'fixed';
div.style.top = 0;
div.style.left = 0;
div.style.color = '#ffffff';
document.body.appendChild(div);

const event = {}
// 单张纹理图的加载
event.onLoad = function() {
  console.log('图片加载完成');
}
event.onProgress = function(url, num, total) {
  console.log('图片加载进度：', url, num, total);
  div.innerHTML = ((num / total) * 100).toFixed(0) + '%'
}
event.onError = function(e) {
  console.log('图片加载异常：', e);
}
// 设置加载管理器
const loadingManage = new THREE.LoadingManager(
  event.onLoad,
  event.onProgress,
  event.onError
);

// 导入纹理
const textureLoader = new THREE.TextureLoader(loadingManage);
const doorColorTexture = textureLoader.load('./textures/door/color.jpg');

// 透明纹
const doorAlphaTexture = textureLoader.load(
  './textures/door/alpha.jpg',
  //  event.onLoad,
  //  event.onProgress,
  //  event.onError
);
const doorAoTexture = textureLoader.load('./textures/door/ambientOcclusion.jpg')
//置换贴图
const doorHeightTexture = textureLoader.load('./textures/door/height.jpg')
const doorRoughnessTexture = textureLoader.load('./textures/door/roughness.jpg')
// 导入金属贴图
const doorMetalnessTexture = textureLoader.load('./textures/door/metalness.jpg')
// 导入法线贴图
const normalTexture = textureLoader.load('./textures/door/normal.jpg')


// 纹理偏移
// doorColorTexture.offset.x = 0.5;
// doorColorTexture.offset.set(0.5, 0.5);

// 设置旋转的原点
// doorColorTexture.center.set(0.5, 0.5);
// 纹理旋转
// doorColorTexture.rotation = Math.PI / 4;
// 设置纹理的重复
// doorColorTexture.repeat.set(2, 3);
// 设置纹理重复的模式
// doorColorTexture.wrapS = THREE.RepeatWrapping;
// doorColorTexture.wrapT = THREE.MirroredRepeatWrapping; // 镜像重复



// AOT环境遮挡
const cubeGeometry = new THREE.BoxBufferGeometry(2, 2, 2);
// // 材质
// const basicMaterial = new THREE.MeshBasicMaterial({
//   color: '#FFFF00',
//   map: doorColorTexture,
//   alphaMap: doorAlphaTexture,
//   transparent: true,
//   // opacity: 0.4
// });
// 材质
const basicMaterial = new THREE.MeshStandardMaterial({
  color: '#FFFF00',
  map: doorColorTexture,
  alphaMap: doorAlphaTexture,
  transparent: true,
  aoMap: doorAoTexture,
  aoMapIntensity: 1,
  displacementMap: doorHeightTexture,
  displacementScale: 0.2,
  roughness: 1,
  roughnessMap: doorRoughnessTexture,
  metalness: 1,
  metalnessMap: doorMetalnessTexture,
  normalMap: normalTexture
  // opacity: 0.4
});

// 灯光
// 环境光
const light = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(light);
// 直线光源
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(10, 10, 15);
scene.add(directionalLight);


const cube = new THREE.Mesh(cubeGeometry, basicMaterial);
scene.add(cube);

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

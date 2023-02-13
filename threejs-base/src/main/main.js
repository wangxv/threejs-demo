import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// 动画库
import gsap from 'gsap';
import * as dat from 'dat.gui';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';

// 加载hdr图
// const rgbeLoader = new RGBELoader();
// rgbeLoader.loadAsync('textures/hdr/002.hdr').then((texture) => {
//   texture.mapping = THREE.EquirectangularReflectionMapping;
//   scene.background = texture;
//   scene.environment = texture;
// })

// 创建场景
const scene = new THREE.Scene();

// 创建相机
// 角度75， 宽高比， 最小值，最大值
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

// 设置相机位置  x,y,z的位置
camera.position.set(0, 0, 10);
scene.add(camera);

// 设置cube纹理加载器
// const cubeTextureLoader = new THREE.CubeTextureLoader();
// const envMapTexture = cubeTextureLoader.load(
//   [
//     'textures/environmentMaps/1/px.jpg',
//     'textures/environmentMaps/1/nx.jpg',
//     'textures/environmentMaps/1/py.jpg',
//     'textures/environmentMaps/1/ny.jpg',
//     'textures/environmentMaps/1/pz.jpg',
//     'textures/environmentMaps/1/nz.jpg'
//   ]
// );
const sphereGeometry = new THREE.SphereBufferGeometry(1, 20, 20);
const material = new THREE.MeshStandardMaterial();
const sphere = new THREE.Mesh(sphereGeometry, material);
sphere.castShadow = true;
scene.add(sphere);

// 创建平面
const planeGeometry = new THREE.PlaneBufferGeometry(50, 50);
const plane = new THREE.Mesh(planeGeometry, material);
plane.position.set(0, -1, 0);
plane.rotation.x = -Math.PI / 2;

plane.receiveShadow = true;
scene.add(plane);

// 给场景添加背景
// scene.background = envMapTexture;
// 给场景所有物体添加环境贴图
// scene.environment = envMapTexture;

// 灯光
// 环境光
const light = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(light);

const smallBall = new THREE.Mesh(
  new THREE.SphereBufferGeometry(0.1, 20, 20),
  new THREE.MeshBasicMaterial({color: 0xff0000})
)
smallBall.position.set(2, 2, 2);
// 荧光
const pointLight = new THREE.PointLight(0xff0000, 1);
// pointLight.position.set(2, 2, 2);
pointLight.castShadow = true;
// 设置阴影贴图模糊度
pointLight.shadow.radius = 20;
// 设置阴影贴图的分辨率
pointLight.shadow.mapSize.set(512, 512);
pointLight.decay = 0;


const gui = new dat.GUI();
// gui
// .add(sphere.position, 'x')
// .min(-5)
// .max(5)
// .step(0.1)

// gui
// .add(pointLight, 'distance')
// .min(0)
// .max(10)
// .step(0.1)
// smallBall.add(pointLight);
// scene.add(smallBall);
// gui
// .add(pointLight, 'decay')
// .min(0)
// .max(5)
// .step(0.01)
smallBall.add(pointLight);
scene.add(smallBall);

// 直线光源
// const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);

// directionalLight.position.set(5, 5, 5);
// directionalLight.castShadow = true;

// // 设置阴影贴图模糊度
// directionalLight.shadow.radius = 20;
// // 设置阴影贴图的分辨率
// directionalLight.shadow.mapSize.set(2048, 2048);

// 聚光灯
// const spotLight = new THREE.SpotLight(0xffffff, 0.5);
// spotLight.position.set(5, 5, 5);
// spotLight.castShadow = true;

// // 设置阴影贴图模糊度
// spotLight.shadow.radius = 20;
// // 设置阴影贴图的分辨率
// spotLight.shadow.mapSize.set(2048, 2048);

// // 让聚光灯的目标为圆
// spotLight.target = sphere;
// spotLight.angle = Math.PI / 6; // 聚光灯角度
// spotLight.distance = 0;
// spotLight.penumbra = 0;
// const gui = new dat.GUI();
// gui
// .add(sphere.position, 'x')
// .min(-5)
// .max(5)
// .step(0.1)
// gui
// .add(spotLight, 'angle')
// .min(0)
// .max(Math.PI / 2)
// .step(0.1)
// gui
// .add(spotLight, 'distance')
// .min(0)
// .max(10)
// .step(0.1)
// scene.add(spotLight);
// gui
// .add(spotLight, 'penumbra')
// .min(0)
// .max(1)
// .step(0.1)
// scene.add(spotLight);


// 设置平行光投射相机的属性
// directionalLight.shadow.camera.near = 0.5
// directionalLight.shadow.camera.far = 500
// directionalLight.shadow.camera.top = 5
// directionalLight.shadow.camera.bottom = -5
// directionalLight.shadow.camera.left = -5
// directionalLight.shadow.camera.right = 5

// scene.add(directionalLight);

// const gui = new dat.GUI();
// gui
// .add(directionalLight.shadow.camera, 'near')
// .min(0)
// .max(10)
// .step(0.1)
// .onChange(() => {
//   directionalLight.shadow.camera.updateProjectionMatrix();
// });



// 渲染器
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(window.innerWidth, window.innerHeight);

// 设置渲染器开启阴影计算
renderer.shadowMap.enabled = true;

// 将webgl渲染的canvas的内容渲染到body上
document.body.appendChild(renderer.domElement);

// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);
// 设置控制器阻尼，让控制器真实
controls.enableDamping = true;

// 添加坐标辅助器
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper)

const clock = new THREE.Clock();

function render() {
  let time = clock.getElapsedTime();
  smallBall.position.x = Math.sin(time) * 3;
  smallBall.position.z = Math.cos(time) * 3;
  smallBall.position.y = 2 + Math.sin(time * 5);
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

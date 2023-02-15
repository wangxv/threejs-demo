<template>
  <div class="container" ref="container"></div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { Reflector } from 'three/examples/jsm/objects/Reflector';

const container = ref(null);
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.set(0, 1.5, 6);

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);

const render = () => {
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}
const rgbeLoader = new RGBELoader();
rgbeLoader.load('./assets/sky12.hdr', (texture) => {
  texture.mapping =  THREE.EquirectangularReflectionMapping;
  scene.background = texture;
  scene.environment = texture;
})

// 添加机器人
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('./draco/gltf/');
dracoLoader.setDecoderConfig({type: 'js'})
const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoLoader);
gltfLoader.load('./assets/robot.glb', (gltf) => {
  scene.add(gltf.scene);
});

// 添加光源
const light1 = new THREE.DirectionalLight(0xffffff, 0.3);
light1.position.set(0, 10, 10);
const light2 = new THREE.DirectionalLight(0xffffff, 0.3);
light2.position.set(0, 10, -10);
const light3 = new THREE.DirectionalLight(0xffffff, 0.8);
light3.position.set(10, 10, 10);
scene.add(light1, light2, light3);

// 添加光阵
const video = document.createElement('video');
video.src = './assets/zp2.mp4';
video.muted = true;
video.loop = true;
video.play();

// 视频纹理
const videoTexture = new THREE.VideoTexture(video);

const videoGeoPlan = new THREE.PlaneGeometry(16, 9);
const videoMaterial = new THREE.MeshBasicMaterial({
  map: videoTexture,
  transparent: true,
  side: THREE.DoubleSide,
  alphaMap: videoTexture, // 透明材质
});
const videoMesh = new THREE.Mesh(videoGeoPlan, videoMaterial);
videoMesh.position.set(0, 0.2, 0);
videoMesh.rotation.set(-Math.PI / 2, 0, 0);
scene.add(videoMesh);

// 添加镜面反射
// 平面
const reflectorGeometry = new THREE.PlaneGeometry(100, 100);
const reflectorPlan = new Reflector(reflectorGeometry, {
  textureWidth: window.innerWidth,
  textureHeight: window.innerHeight,
  color: 0x332222
});
reflectorPlan.rotation.x = -Math.PI / 2;
scene.add(reflectorPlan);

onMounted(() => {
  // 创建轨道控制器
  const controls = new OrbitControls(camera, container.value);
  // 设置控制器阻尼，让控制器真实
  controls.enableDamping = true;
  container.value.appendChild(renderer.domElement);
  render();

  // 监听画面变化，更新渲染画面
  window.addEventListener("resize", () => {
    //   console.log("画面变化了");
    // 更新摄像头
    camera.aspect = window.innerWidth / window.innerHeight;
    //   更新摄像机的投影矩阵
    camera.updateProjectionMatrix();

    //   更新渲染器
    renderer.setSize(window.innerWidth, window.innerHeight);
    //   设置渲染器的像素比
    renderer.setPixelRatio(window.devicePixelRatio);
  });
});

</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
}
.container{
  height: 100vh;
  width: 100vw;
  background-color: #f0f0f0;
}
</style>

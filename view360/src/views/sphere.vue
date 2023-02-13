<template>
  <div class="container" ref="container"></div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';

const container = ref(null);
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.z = 0.1;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

const render = () => {
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

const geometry = new THREE.SphereGeometry(5, 32, 32);
const rgbeLoader = new RGBELoader();
rgbeLoader.loadAsync('./imgs/hdr/Living.hdr').then((texture) => {
  const material = new THREE.MeshBasicMaterial({ map: texture });
  const sphere = new THREE.Mesh(geometry, material);
  sphere.geometry.scale(1, 1, -1);
  scene.add(sphere);
});

onMounted(() => {
  // 创建轨道控制器
  const controls = new OrbitControls(camera, container.value);
  // 设置控制器阻尼，让控制器真实
  controls.enableDamping = true;
  container.value.appendChild(renderer.domElement);
  render();
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

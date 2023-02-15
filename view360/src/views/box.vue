<template>
  <div class="container" ref="container"></div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

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
};

const geometry = new THREE.BoxGeometry(10, 10, 10);
// const material = new THREE.MeshBasicMaterial({color: 0x00ff00});

// 贴图
const arr = ["4_l", "4_r", "4_u", "4_d", "4_b", "4_f"];
const boxMaterial = [];

arr.forEach((item) => {
  let texture = new THREE.TextureLoader().load(`./imgs/living/${item}.jpg`);
  if (item === "4_u" || item === "4_d") {
    texture.rotation = Math.PI;
    texture.center = new THREE.Vector2(0.5, 0.5);
  }
  boxMaterial.push(new THREE.MeshBasicMaterial({ map: texture }));
});

const cube = new THREE.Mesh(geometry, boxMaterial);
cube.geometry.scale(1, 1, -1);
scene.add(cube);

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
.container {
  height: 100vh;
  width: 100vw;
  background-color: #f0f0f0;
}
</style>

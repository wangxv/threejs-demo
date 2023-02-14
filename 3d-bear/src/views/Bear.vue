<template>
  <div class="canvas" ref="canvas"></div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const canvas = ref(null);
onMounted(() => {
  // 创建场景
  const scene = new THREE.Scene();

  // 创建相机
  // 角度75， 宽高比， 最小值，最大值
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  // 设置相机位置  x,y,z的位置
  camera.position.set(1.5, 1, 1.5);
  camera.aspect = window.innerWidth / window.innerHeight;
  // 更新相机投影矩阵
  camera.updateProjectionMatrix();
  scene.add(camera);
  // 加载背景纹理
  const loader = new THREE.TextureLoader();
  const bgTexture = loader.load("/assets/imgs/050.jpg");

  // bgTexture.mapping = THREE.EquirectangularReflectionMapping;
  bgTexture.mapping = THREE.EquirectangularRefractionMapping;
  scene.background = bgTexture;
  scene.environment = bgTexture;
  // 环境光
  const light = new THREE.AmbientLight(0xffffff, 1);
  scene.add(light);

  const gltfLoader = new GLTFLoader();
  gltfLoader.load("/assets/model/bear.gltf", (gltf) => {
    const model = gltf.scene.children[0];
    model.material = new THREE.MeshPhongMaterial({
      color: 0xfffff,
      envMap: bgTexture,
      refractionRatio: 0.7,
      reflectivity: 0.99,
    });
    scene.add(model);
  });
  const bottomTexture = loader.load("/assets/imgs/1.png");
  const arcGeometry = new THREE.CircleGeometry(0.5);
  const material = new THREE.MeshStandardMaterial({
    color: "#ffffff",
    map: bottomTexture,
    refractionRatio: 0.7,
    reflectivity: 0.99,
    opacity: 0.4,
  });

  const arc = new THREE.Mesh(arcGeometry, material);
  // arc.material = bottomTexture;
  arc.receiveShadow = true;
  arc.rotation.x = -Math.PI / 2;
  arc.position.set(0, -0.1, 0);
  scene.add(arc);

  // 渲染器
  const renderer = new THREE.WebGL1Renderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  });
  canvas.value.appendChild(renderer.domElement);

  // 添加控制器
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  const render = () => {
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  };
  render();
});
</script>

<style scoped>
.canvas {
  box-sizing: border-box;
}
</style>

<template>
  <nav>
    <RouterLink to="/">3d看房-demo1</RouterLink> | 
    <RouterLink to="/sphere">3d看房-demo2</RouterLink>
  </nav>
  <RouterView />
</template>
<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>
<style>
* {
  margin: 0;
  padding: 0;
}
</style>

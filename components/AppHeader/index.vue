<script setup lang="ts">
import Logo from './components/Logo/index.vue'
import Menu from './components/Menu/index.vue'
import BtnGroup from './components/BtnGroup/index.vue'
</script>

<template>
  <div class="app-header-wrapper">
    <div class="menu">
      <Menu></Menu>
    </div>
    <div class="btn-group">
      <BtnGroup></BtnGroup>
    </div>
  </div>
</template>

<style scoped lang="less">
.app-header-wrapper {
  box-sizing: border-box;
  width: 100%;
  //height: 72px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 250px;
  position: sticky;
  top: 0;
  z-index: 9;
  //background-color: #0F1C2E;

  backdrop-filter: blur(5px) saturate(120%);
  -webkit-backdrop-filter: blur(5px) saturate(120%);
}
</style>
<script setup lang="ts">
import {NInput} from 'naive-ui'
</script>

<template>
  <div class="content-top">
    <div class="search-input">
      <nuxt-icon class="icon" name="header/search"></nuxt-icon>
    </div>
  </div>
</template>

<style scoped lang="less">
.content-top {
  box-sizing: border-box;
  padding: 5px 20px;
  width: 100%;
  height: 50px;
  background-color: rgb(245 246 255 / 80%);
  display: flex;
  align-items: center;
  justify-content: space-between;

  .search-input {
    .icon {
      font-size: 20px;
      font-weight: bold;
      cursor: pointer;
    }
  }
}
</style>
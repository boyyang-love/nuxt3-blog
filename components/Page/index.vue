<script setup lang="ts">
import {NSpace} from 'naive-ui'
</script>

<template>
  <div class="page-wrapper">
    <NSpace>
      <div class="page-num">
        <nuxt-icon name="arrow/arrowLeft" />
      </div>
      <div class="page-num" v-for="item in 5">
        {{ item }}
      </div>
      <div class="page-num">
        <nuxt-icon name="arrow/arrowRight" />
      </div>
    </NSpace>
  </div>
</template>

<style scoped lang="less">
.page-wrapper {
  box-sizing: border-box;
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 10px;

  .page-num {
    box-sizing: border-box;
    min-width: 40px;
    min-height: 40px;
    aspect-ratio: 1 / 1;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: whitesmoke;
    background-color: #0F1C2E;
    cursor: pointer;
    border: 2px solid whitesmoke;
  }
}
</style>
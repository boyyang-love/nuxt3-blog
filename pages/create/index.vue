<template>
  <div class="create-wrapper">
    <div class="inner">
      <client-only>
        <Editor></Editor>
      </client-only>
    </div>
  </div>
</template>


<script lang="ts" setup>
import Editor from '@/components/Editor/index.vue'
</script>

<style scoped lang="less">
.create-wrapper {
  box-sizing: border-box;
  //position: absolute;
  //z-index: 9;
  //left: 0;
  //top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  background-color: rgb(243, 244, 246);
  overflow: hidden;

  .inner {
    box-sizing: border-box;
    border-radius: 10px;
    height: 100%;
    overflow-y: auto;

  }
}
</style>
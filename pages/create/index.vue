<template>
  <div class="create-wrapper">
    <client-only>
      <Editor></Editor>
    </client-only>
  </div>
</template>

<script setup>
import Editor from '@/components/Editor/index.vue'
</script>

<style scoped lang="less">
.create-wrapper {
  box-sizing: border-box;
  display: flex;
  justify-content: center;

  .inner {
    box-sizing: border-box;
    border-radius: 10px;
    height: 100%;

  }
}
</style>
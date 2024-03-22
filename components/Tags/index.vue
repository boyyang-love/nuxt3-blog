<script setup lang="ts">
import Title from '@/components/Title/index.vue'
</script>

<template>
  <div class="tags-wrapper">
    <div class="tag-header">
      <Title title="标签" :more="false" padding="10px 0"></Title>
    </div>
    <div class="tag-content">
      <div class="tag-item" v-for="item in 10">
        #博客
      </div>
      <div class="tag-item" v-for="item in 10">
        #vue
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.tags-wrapper {
  box-sizing: border-box;
  width: 100%;
  border-radius: 5px;
  margin-bottom: 10px;

  .tag-content {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;

    .tag-item {
      box-sizing: border-box;
      padding: 1px 5px;
      font-size: 13px;
      font-weight: bolder;
      border: 1px solid rgba(17, 17, 17, 0.4);
      border-radius: 2px;
      margin: 4px;
      cursor: pointer;
    }
  }
}
</style>
<script setup lang="ts">
import CardTitle from '@/components/CardTitle/index.vue'
</script>

<template>
  <div class="tags-wrapper">
    <div class="tag-header">
      <CardTitle></CardTitle>
    </div>
    <div class="tag-content">
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
  background-color: rgb(33, 43, 61);
  border-radius: 5px;
  box-shadow: 2px 5px 5px rgba(0, 0, 0, 0.5), -2px 0 5px rgba(0, 0, 0, 0.5);
  padding: 10px;
  margin-bottom: 10px;


  .tag-content {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;


    .tag-item {
      box-sizing: border-box;
      padding: 2px 8px;
      color: whitesmoke;
      font-size: 13px;
      font-weight: bolder;
      border: 1px solid whitesmoke;
      border-radius: 5px;
      margin: 5px;
      cursor: pointer;
    }
  }
}
</style>
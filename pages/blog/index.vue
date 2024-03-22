<script setup lang="ts">
import Title from '@/components/Title/index.vue'
import Card from '@/components/Card/index.vue'
import Page from '@/components/Page/index.vue'
import CardRight from './components/CardRight/index.vue'
</script>

<template>
  <div class="blog-wrapper">
    <Card v-for="item in 100"></Card>
  </div>
</template>

<style scoped lang="less">
.blog-wrapper {
  box-sizing: border-box;
  width: 100%;

  .top-banner {
    box-sizing: border-box;
    width: 100%;
    height: 650px;
    position: absolute;
    left: 0;
    top: 0;
    box-shadow: 0 10px 10px rgba(0, 0, 0, 0, 5);

    .img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .content-wrapper {
    box-sizing: border-box;
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding-top: 450px;
    gap: 10px;
  }

  .content {
    box-sizing: border-box;
    width: 690px;
    background-color: rgb(33, 43, 61);
    z-index: 1;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    padding: 10px;
    box-shadow: 2px 5px 5px rgba(0, 0, 0, 0.5), -2px 0 5px rgba(0, 0, 0, 0.5);

    .images {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 10px;
    }
  }

  .content-right {
    box-sizing: border-box;
    z-index: 1;
    width: calc(100% - 690px);

    .recommend {
      box-sizing: border-box;
      width: 100%;
      background-color: rgb(33, 43, 61);
      border-radius: 10px;
      padding: 10px;
      box-shadow: 2px 5px 5px rgba(0, 0, 0, 0.5), -2px 0 5px rgba(0, 0, 0, 0.5);
    }
  }

}
</style>
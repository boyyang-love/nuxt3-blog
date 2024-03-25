<script setup lang="ts">
import Card from './components/card/index.vue'
import {imagesList} from '@/api/images'
import {env} from '@/utils/env'

const list = ref()

imagesList({page: 1, limit: 50}).then((res) => {
  list.value = res.data.exhibitions.map((e: any) => {
    return {
      ...e,
      path: `${env.VITE_APP_IMG_URL}/${e.cover}`,
    }
  })
})
</script>

<template>
  <div class="wallpaper-wrapper">
    <div class="content">
      <Card v-for="item in list" :url="item.path"></Card>
    </div>
  </div>
</template>

<style scoped lang="less">
.wallpaper-wrapper {
  padding: 10px;

  .content {
    box-sizing: border-box;
    -moz-column-count: 3; /* Firefox */
    -webkit-column-count: 3;
    column-count: 3;
    column-gap: 5px;
  }
}
</style>
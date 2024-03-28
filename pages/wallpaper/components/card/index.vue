<script setup lang="ts">
import {NImage} from 'naive-ui'
import CubeLoading from '@/components/CubeLoading/index.vue'

interface Props {
  url: string
}

const props = defineProps<Props>()
</script>

<template>
  <div class="image-card-wrapper">
    <NImage
        class="n-img"
        :src="props.url"
        :show-toolbar="false"
        lazy
        :intersection-observer-options="{
          root: '#content'
        }"
        width="100%"
        height="100%"
        object-fit="cover"
    >
      <template #placeholder>
        <div class="loading">
          <CubeLoading></CubeLoading>
        </div>
      </template>
    </NImage>
  </div>
</template>

<style scoped lang="less">
.image-card-wrapper {
  box-sizing: border-box;
  width: 100%;
  border-radius: 5px;
  overflow: hidden;

  .n-img {
    width: 100%;
    object-fit: cover;
    border-radius: 5px;

    .loading {
      box-sizing: border-box;
      width: 250px;
      aspect-ratio: 3/2;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
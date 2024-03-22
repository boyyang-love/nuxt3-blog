<script setup lang="ts">
import CardTop from '~/components/CardTop/index.vue'
import Title from '@/components/Title/index.vue'
import MessageBoard from '@/components/MessageBoard/index.vue'
import Tags from '@/components/Tags/index.vue'
</script>

<template>
  <div class="app-right">
    <div class="top-article">
      <Title padding="10px 0" :more="false" title="热点文章"></Title>
      <CardTop v-for="item in 4"></CardTop>
    </div>
    <div class="tags">
      <Tags></Tags>
    </div>
    <div class="recommend">
      <MessageBoard></MessageBoard>
    </div>
  </div>
</template>

<style scoped lang="less">
.app-right {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 10px;
}
</style>
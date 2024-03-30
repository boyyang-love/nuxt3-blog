<script setup lang="ts">
interface Props {
  padding?: string
  more?: boolean
  title?: string
}

const props = withDefaults(defineProps<Props>(), {
  padding: '10px 20px',
  more: true,
  title: '最新文章',
})
</script>

<template>
  <div class="title-wrapper">
    <div class="title">{{ props.title }}</div>
    <div class="more" v-if="props.more">
      <nuxt-icon name="arrow/left"></nuxt-icon>
      <span class="text">更多</span>
      <nuxt-icon name="arrow/right"></nuxt-icon>
    </div>
  </div>
</template>

<style scoped lang="less">
.title-wrapper {
  box-sizing: border-box;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: v-bind("props.padding");

  .title {
    font-size: 15px;
    font-weight: 700;
    text-shadow: 3px 3px 5px rgba(0, 0, 0, 0.5);
  }

  .more {
    font-size: 15px;
    font-weight: 700;
    text-shadow: 3px 3px 5px rgba(0, 0, 0, 0.5);
    cursor: pointer;

    display: flex;
    align-items: center;

    .text {
      margin: 0 5px;
    }
  }
}
</style>
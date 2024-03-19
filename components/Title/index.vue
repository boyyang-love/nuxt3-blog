<script setup lang="ts">

</script>

<template>
<div class="title-wrapper">
  <div class="title">最新文章</div>
  <div class="more">
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
  padding: 10px 0;

  .title {
    font-size: 16px;
    font-weight: 700;
    color: whitesmoke;
    text-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5);
  }

  .more {
    font-size: 13px;
    font-weight: 700;
    color: whitesmoke;
    text-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5);
    cursor: pointer;

    display: flex;
    align-items: center;

    .text {
      margin: 0 5px;
    }
  }
}
</style>
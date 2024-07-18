<script lang="ts">
export default {
  layout: 'custom',
}
</script>

<template>
    <div class="custom-wrapper">
      <slot/>
    </div>
</template>

<style scoped lang="less">
.custom-wrapper {
  box-sizing: border-box;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
</style>
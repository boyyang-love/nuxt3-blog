<script lang="ts">
export default {
  layout: 'custom',
}
</script>

<template>
  <div class="custom-wrapper" >
    custom
    <slot/>
  </div>
</template>

<style scoped lang="less">
.custom-wrapper {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
}
</style>
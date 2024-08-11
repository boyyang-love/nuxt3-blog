<script lang="ts">
// import Ghost from '@/components/Ghost/index.vue'

export default {
  layout: 'custom',
  components: {
    // Ghost,
  },
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

  .ghost {
    position: absolute;
  }
}
</style>
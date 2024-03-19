<script setup lang="ts">

</script>

<template>
  <div class="image-card-wrapper">
    <div class="image-wrapper">
      <img src="@/assets/image/wolp.jpg" alt="" class="img">
    </div>
  </div>
</template>

<style scoped lang="less">
.image-card-wrapper {
  box-sizing: border-box;
  width: 100%;
  aspect-ratio: 3 / 1.6;
  box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.5);
  .image-wrapper {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    border: 5px solid rgb(80,97,136);
    border-radius: 5px;

    .img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>
<script setup lang="ts">

</script>

<template>
  <div class="card-wrapper">
    <div class="bottom-wrapper">
      <div class="title">
        < 前端开发的未来趋势 >
      </div>
      <div class="sub-title">
        前端开发的未来趋势前端开发的未来趋势前端开发的未来趋势
      </div>
    </div>
    <div class="link">
      <nuxt-icon class="icon" name="other/leaf"></nuxt-icon>
    </div>
  </div>
</template>

<style scoped lang="less">
.card-wrapper {
  box-sizing: border-box;
  border-radius: 5px;
  display: flex;
  position: relative;
  padding: 2px 10px 5px 5px;
  margin-bottom: 5px;
  border: 1px solid rgb(102,211,159);
  //box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5), -1px -1px 1px rgba(0, 0, 0, 0.5);

  .bottom-wrapper {
    box-sizing: border-box;
    width: 100%;
    display: flex;
    flex-direction: column;

    .title {
      font-size: 13px;
      font-weight: bold;
    }

    .sub-title {
      font-size: 12px;
      font-weight: 300;
    }
  }

  .link {
    position: absolute;
    right: -10px;
    top: -10px;

    .icon {
      color: deeppink;
      font-size: 20px;
    }
  }
}
</style>
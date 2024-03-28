<script setup lang="ts">

const isShow = ref<boolean>(false)
const percent = ref<number>(0)
const estimated = ref<number | string>(0)
const begin = () => {
  isShow.value = true
}

const end = () => {
  isShow.value = false
}

const setPercent = (num: number) => {
  percent.value = num
}

const setEstimated = (num: number | string) => {
  estimated.value = num
}


const useUploadProgress = () => {
  return {
    begin,
    end,
    setPercent,
    setEstimated,
  }
}

window.$uploadProgress = useUploadProgress()

</script>

<template>
  <div class="upload-progress" v-if="isShow">
    <div class="upload-content">
      <div class="loading">Uploading</div>
      <div class="percent">
        <span class="value">{{ percent }}%</span>
        <span class="point"></span>
        <span class="value">{{ estimated }}s</span>
      </div>
      <div class="bottom-progress"></div>
    </div>
    <div class="close" @click="isShow = false">
      <nuxt-icon name="other/close"></nuxt-icon>
    </div>
  </div>
</template>

<style scoped lang="less">
.upload-progress {
  box-sizing: border-box;
  width: 250px;
  border-radius: 5px;
  background: rgb(255, 255, 255);
  padding: 5px 0;
  margin: 10px;
  position: fixed;
  bottom: 20px;
  right: 20px;
  border: 2px solid rgb(170, 176, 194);
  z-index: 99;

  .bottom-bg {
    content: "";
    width: 10%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
  }

  .upload-content {
    padding: 0 10px;

    .percent {
      display: flex;
      align-items: center;
      z-index: 2;

      .point {
        display: inline-block;
        width: 2px;
        height: 2px;
        background-color: rgb(170, 176, 194);
        border-radius: 50%;
        margin: 0 5px;
      }

      .value {
        color: rgb(170, 176, 194);
        font-size: 13px;
      }
    }

    .bottom-progress {
      box-sizing: border-box;
      transition: all 0.2s linear;
      width: calc(v-bind(percent) * 1%);
      height: 2px;
      background-color: rgb(170, 176, 194);
      margin-top: 10px;
    }

    .loading {
      color: rgb(115, 134, 164);
      font-size: 14px;
      font-weight: bolder;
      margin-bottom: 5px;
      z-index: 3;
    }
  }

  .close {
    position: absolute;
    top: 5px;
    right: 5px;
    cursor: pointer;
  }
}

</style>
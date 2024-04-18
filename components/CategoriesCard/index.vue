<script setup lang="ts">
import {NIcon} from 'naive-ui'
import {Cog} from '@vicons/ionicons5'
const props = defineProps<
    {
      id: number
      title: string,
      des: string,
      cover: string
    }
>()

const emits = defineEmits<
    {
      update: [],
      detail: [id: number]
    }
>()
</script>

<template>
  <div
      class="categories-card-wrapper"
  >
    <div class="img-wrapper">
      <img class="img" :src="cover" alt="wolp">
      <div class="inner-wrapper">
        <div class="title">
          <p class="text" @click="emits('detail', props.id)"> {{title}} </p>
        </div>
        <div class="des">
          <p class="text">{{des}}</p>
        </div>
      </div>
    </div>
    <div class="icon-wrapper">
      <n-icon
          class="icon"
          size="18"
          @click="emits('update')"
      >
        <Cog></Cog>
      </n-icon>
    </div>
  </div>
</template>

<style scoped lang="less">
.categories-card-wrapper {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  position: relative;
  border-radius: 5px;
  border: 2px solid var(--border-color);

  .img-wrapper {
    width: inherit;
    height: inherit;
    overflow: hidden;
    box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.5);
    position: relative;

    .img {
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .inner-wrapper {
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      background-color: rgba(0, 0, 0, 0.4);
      backdrop-filter: blur(2px) contrast(120%) grayscale(1px);
      -webkit-backdrop-filter: blur(2px) contrast(120%) grayscale(1px);
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;

      .title {
        .text {
          font-size: 18px;
          font-weight: bolder;
          display: inline-block;
          color: whitesmoke;
          position: relative;
          padding: 0;
          margin: 0;
          cursor: pointer
        }

      }

      .des {
        .text {
          padding: 0;
          margin: 0;
          font-size: 13px;
          color: whitesmoke;
        }
      }
    }
  }

  .icon-wrapper {
    position: absolute;
    bottom: 3px;
    right: 3px;
    display: flex;

    .icon {
      cursor: pointer;
      color: whitesmoke;
      animation: run 5s linear infinite;
    }

    @keyframes run {
      0% {
        transform: rotateZ(0deg);
      }
      100% {
        transform: rotateZ(360deg);
      }
    }
  }
}
</style>
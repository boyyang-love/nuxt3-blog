<script setup lang="ts">
import {NEllipsis, NIcon} from 'naive-ui'
import {Flame} from '@vicons/ionicons5'

const props = defineProps<{
  id: number
  cover: string
  title: string,
  subTitle: string,
}>()
</script>

<template>
  <div class="card-wrapper">
    <nuxt-link :to="`/detail/?id=${id}`" class="nuxt-link">
      <div class="top-cover">
        <img class="img" :src="props.cover" alt="">
      </div>
      <div class="bottom-wrapper">
        <div class="title">
          <n-ellipsis
              :line-clamp="1"
              :tooltip="false"
              style="max-width: 220px"
          >
            <{{ props.title }}>
          </n-ellipsis>
        </div>
        <div class="sub-title">
          <n-ellipsis
              :line-clamp="2"
              :tooltip="false"
              style="max-width: 220px"
          >
            {{ props.subTitle }}
          </n-ellipsis>
        </div>
      </div>
<!--      <div class="link">-->
<!--        <n-icon :size="20" color="deeppink">-->
<!--          <Flame></Flame>-->
<!--        </n-icon>-->
<!--      </div>-->
    </nuxt-link>
  </div>
</template>

<style scoped lang="less">
.card-wrapper {
  box-sizing: border-box;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 10px;
  margin-bottom: 10px;
  //border: 1px solid rgb(102, 211, 159);
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.4) inset, -2px -2px 2px rgba(0, 0, 0, 0.4) inset;

  .nuxt-link {
    text-decoration: none;

    .top-cover {
      box-sizing: border-box;
      width: 100%;
      height: 100px;
      overflow: hidden;

      .img {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 2px;
      }
    }

    .bottom-wrapper {
      box-sizing: border-box;
      width: 100%;
      display: flex;
      flex-direction: column;

      .title {
        color: #1E2022;
        text-decoration: none;
        font-size: 13px;
        font-weight: bold;
        display: flex;
        align-items: center;
      }

      .sub-title {
        font-size: 12px;
        font-weight: 300;
        color: #0F1C2E;
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

  //box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5), -1px -1px 1px rgba(0, 0, 0, 0.5);


}

@media screen and (max-width: 1200px) {
  .card-wrapper {
    .nuxt-link {
      .top-cover {
        height: auto;
      }
    }
  }

  .bottom-wrapper {
    .title {
      :deep(soan) {
        width: 100%;
      }
    }
  }
}
</style>
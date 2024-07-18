<script setup lang="ts">
import {NEllipsis} from 'naive-ui'
import {addImagePrefix} from '~/utils/addImagePrefix'

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
        <img class="img" :src="addImagePrefix(props.cover)" :alt="props.cover">
      </div>
      <div class="bottom-wrapper">
        <div class="title">
          <n-ellipsis
              :line-clamp="1"
              :tooltip="false"
          >
            <span>
            {{ props.title }}
            </span>
          </n-ellipsis>
        </div>
        <div class="sub-title">
          <n-ellipsis
              :line-clamp="2"
              :tooltip="false"
          >
            <div style="word-break: break-all">
              {{ props.subTitle }}
            </div>
          </n-ellipsis>
        </div>
      </div>
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
  padding: 10px 10px 4px;
  margin-bottom: 10px;
  background: var(--button-color);
  box-shadow: var(--button-shadow-one), var(--button-shadow-two);

  .nuxt-link {
    text-decoration: none;

    .top-cover {
      box-sizing: border-box;
      overflow: hidden;
      height: 120px;

      .img {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 3px;
        border: 2px solid var(--border-color);
      }
    }

    .bottom-wrapper {
      box-sizing: border-box;
      width: 100%;
      display: flex;
      flex-direction: column;

      .title {
        color: var(--font-color);
        text-decoration: none;
        font-size: 14px;
        font-weight: bolder;
        display: flex;
        align-items: center;
      }

      .sub-title {
        font-size: 12px;
        font-weight: 300;
        color: var(--font-color-200);
        overflow: hidden;
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
      :deep(span) {
        width: 100%;
      }
    }
  }
}
</style>
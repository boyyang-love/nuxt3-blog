<script setup lang="ts">
import {NEllipsis, NImage} from 'naive-ui'
import errimg from '@/assets/image/wolp.jpg'
import moment from 'moment'
import CubeLoading from '~/components/CubeLoading/index.vue'

interface Props {
  id: number
  title: string
  des: string
  cover: string
  time: number
}

const props = defineProps<Props>()
</script>

<template>
  <div class="card-wrapper">
    <div class="card-info">
      <nuxt-link :to="`/details/?id=${props.id}`">
        <div class="card-left-img">
          <n-image
              class="img"
              :src="props.cover"
              :alt="props.cover"
              :fallback-src="errimg"
              :preview-disabled="true"
              :img-props="{
              width: '100%'
            }"
              :intersection-observer-options="{
                root: '#user-info-wrapper'
            }"
              object-fit="cover"
              :style="{
              width: '100%',
              height: '100%'
            }"
              lazy
          >
            <template #placeholder>
              <div class="loading">
                <CubeLoading></CubeLoading>
              </div>
            </template>
          </n-image>
        </div>
      </nuxt-link>
      <div class="card-right-info">
        <div class="title">
          <nuxt-link :to="`/details/?id=${props.id}`" class="link">
            <n-ellipsis
                :line-clamp="1"
                :tooltip="false"
            >
              {{ props.title }}
            </n-ellipsis>
          </nuxt-link>
        </div>
        <div class="des">
          <n-ellipsis
              :line-clamp="3"
              :tooltip="false"
          >
            {{ props.des }}
          </n-ellipsis>
        </div>
        <div class="time"> {{ moment(props.time).format('YYYY-MM-DD HH:mm:ss') }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.card-wrapper {
  box-sizing: border-box;
  width: 100%;
  margin: 10px 0;
  cursor: pointer;

  .card-info {
    display: flex;

    .card-left-img {
      box-sizing: border-box;
      width: 220px;
      height: 130px;
      margin-right: 15px;
      flex-shrink: 0;

      .img {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 3px;

        .loading {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }

    .card-right-info {
      box-sizing: border-box;
      width: 100%;
      position: relative;

      .title {
        font-size: 15px;
        font-weight: bold;
        color: var(--font-color);

        .link {
          color: var(--font-color);
          text-decoration: underline;
        }
      }

      .des {
        font-size: 13px;
        font-weight: bold;
        color: var(--font-color-200);
      }

      .time {
        font-size: 12px;
        color: var(--font-color-200);
        position: absolute;
        right: 0;
        bottom: 0;
      }
    }
  }
}

@media screen and (max-width: 1200px) {
  .card-wrapper {
    .card-info {
      flex-direction: column;

      .card-left-img {
        width: 100%;
      }
    }

    .card-right-info {
      .time {
        display: none;
      }
    }
  }
}
</style>
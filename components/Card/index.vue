<script setup lang="ts">
import {NEllipsis, NAvatar, NIcon} from 'naive-ui'
import {CaretUp,CaretDown} from '@vicons/ionicons5'
import moment from 'moment'
import errImg from '@/assets/image/avatar_g.jpg'

const isReadAll = ref<boolean>(false)

const props = defineProps<{
  id: number
  avatar: string
  title: string
  created: number
  username: string
  motto: string
  cover: string
  des: string
  content: string
}>()

const readAll = () => {
  isReadAll.value = true
}

</script>

<template>
  <div class="card-wrapper">
    <div class="title-wrapper">
      <nuxt-link :to="`/detail/?id=${props.id}`">
        <div class="title">{{ props.title }}</div>
      </nuxt-link>
      <div class="time">
        <span>{{ moment(props.created).format('YYYY-MM-DD') }}</span>
        <div class="point"></div>
        <span>{{ moment(props.created).format('hh:mm:ss') }}</span>
      </div>
    </div>
    <div class="user-info">
      <div class="avatar">
        <n-avatar
            :fallback-src="errImg"
            :size="45"
            :src="props.avatar"
        ></n-avatar>
      </div>
      <div class="info">
        <div class="name">{{ props.username }}</div>
        <div class="motto">
          {{ props.motto }}
        </div>
      </div>
    </div>
    <div :class="['top-img',isReadAll ? 'all' : '']">
      <slot name="cover"></slot>
      <img
          class="img"
          :src="props.cover"
          :alt="props.cover"
      >
      <div class="bottom">
        <div class="sub-title" v-show="!isReadAll">
          <n-ellipsis :line-clamp="4" :tooltip="false">
            {{ props.des }}
          </n-ellipsis>
        </div>
        <div
            class="editor"
            ref="editor"
            v-if="isReadAll"
            v-highlight
        >
          <div
              style="box-sizing: border-box"
              v-html="props.content"
          ></div>
        </div>
        <div
            class="close-readall"
            @click="isReadAll = false"
            v-if="isReadAll"
        >
          <span class="text">
            收起
          </span>
          <span class="down">
            <n-icon class="icon" size="20">
              <CaretUp></CaretUp>
            </n-icon>
          </span>
        </div>
        <div class="readall" @click="readAll" v-if="!isReadAll">
          <span class="text">
            阅读全文
          </span>
          <span class="down">
            <n-icon class="icon" size="20">
              <CaretDown></CaretDown>
            </n-icon>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.card-wrapper {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: 10px 20px;
  margin: 10px 0;
  border-radius: 3px;
  //background: rgba(246,247,253, 1);
  //box-shadow: 3px 3px 6px #6dd5ed inset, -3px -3px 6px #6dd5ed inset;

  .title-wrapper {
    display: flex;
    justify-content: space-between;

    .title {
      font-size: 15px;
      font-weight: 800;
      color: var(--font-color);
      cursor: pointer;
    }

    .time {
      font-size: 13px;
      color: var(--font-color-200);
      display: flex;
      align-items: center;

      .point {
        width: 3px;
        height: 3px;
        border-radius: 100%;
        background-color: var(--font-color-200);
        margin: 0 5px;
      }
    }
  }

  .user-info {
    display: flex;
    margin: 10px 0;

    .avatar {
      box-sizing: border-box;
      width: 45px;
      height: 45px;
      overflow: hidden;
      border-radius: 5px;

      .img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .info {
      margin-left: 10px;

      .name {
        font-size: 14px;
        font-weight: 600;
        color: var(--font-color);
      }

      .motto {
        font-size: 13px;
        font-weight: 400;
        color: var(--font-color);
      }
    }
  }


  .top-img {
    box-sizing: border-box;
    display: flex;

    .img {
      box-sizing: border-box;
      width: 200px;
      height: 125px;
      object-fit: cover;
      border-radius: 5px;
    }

    .bottom {
      box-sizing: border-box;
      width: calc(100% - 190px);
      padding: 0 10px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-between;
      position: relative;

      .tags {
        display: flex;
        margin: 2px 0;

        .tag {
          box-sizing: border-box;
          border-radius: 3px;
          background: rgba(253, 116, 108, 0.9);
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 12px;
          font-weight: 500;
          padding: 2px 6px;
          box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.4);
        }
      }

      .sub-title {
        font-size: 15px;
        font-weight: 400;
        line-height: 24px;
        text-align: left;
        vertical-align: top;
        color: var(--font-color);
      }

      .readall {
        display: flex;
        align-items: center;
        cursor: pointer;

        .text {
          font-size: 13px;
          font-weight: bolder;
          color: var(--font-color);
        }

        .down {
          display: inline-block;
          justify-content: center;
          align-items: center;
          padding-top: 7px;
          font-size: 13px;
          cursor: pointer;
          color: var(--font-color);
        }

      }

      .close-readall {
        position: absolute;
        bottom: -10px;
        right: 0;
        display: flex;
        align-items: center;

        .text {
          cursor: pointer;
          color: var(--font-color);
        }

        .down {
          padding-top: 5px;
          cursor: pointer;
          color: var(--font-color);
        }
      }

      .editor {
        box-sizing: border-box;
        width: 100%;
        overflow: hidden;
        color: var(--font-color);

        :deep(img) {
          max-width: 100%;
          border-radius: 5px;
        }

        :deep(code) {
          border-radius: 5px;
        }
      }
    }
  }

  .all {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;

    .img {
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      //height: 300px;
      object-fit: cover;
      margin: 10px 0;
    }

    .bottom {
      box-sizing: border-box;
      width: 100%;
      padding: 20px 0;
    }
  }
}

@media screen and (max-width: 1200px) {
  .card-wrapper {
    padding: 0;
    margin: 0;

    .title-wrapper {
      flex-direction: column;
    }

    .top-img {
      flex-direction: column;

      .img {
        box-sizing: border-box;
        width: 100%;
        min-height: 200px;
      }

      .bottom {
        width: 100%;
        padding: 10px 0;

        .sub-title {
          font-size: 12px;
        }
      }
    }
  }
}
</style>
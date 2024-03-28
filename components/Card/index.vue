<script setup lang="ts">
import {NEllipsis, NAvatar, NImage, NSkeleton} from 'naive-ui'
import moment from 'moment'
import {useRouter} from 'vue-router'
import errImg from '@/assets/image/avatar_g.jpg'


const router = useRouter()
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

const toDetail = () => {
  router.push({
    path: '/detail',
    query: {
      id: props.id,
    },
  })
}
</script>

<template>
  <div class="card-wrapper">
    <div class="title-wrapper">
      <div class="title" @click="toDetail">{{ props.title }}</div>
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
            v-html="props.content"
            v-highlight
            v-if="isReadAll"
        ></div>
        <div
            class="close-readall"
            @click="isReadAll = false"
            v-if="isReadAll"
        >
          <span class="text">
            收起
          </span>
          <span class="down">
            <nuxt-icon class="icon" name="arrow/up"></nuxt-icon>
          </span>
        </div>
        <div class="readall" @click="readAll" v-if="!isReadAll">
          <span class="text">
            阅读全文
          </span>
          <span class="down">
            <nuxt-icon class="icon" name="arrow/down"></nuxt-icon>
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
  border-radius: 5px;
  //background: linear-gradient(45deg, rgb(40, 60, 95), rgb(78, 96, 134));

  .title-wrapper {
    display: flex;
    justify-content: space-between;

    .title {
      font-size: 15px;
      font-weight: 800;
      color: #1f2b3e;
      cursor: pointer;
    }

    .time {
      font-size: 13px;
      color: #1f2b3e;
      display: flex;
      align-items: center;

      .point {
        width: 3px;
        height: 3px;
        border-radius: 100%;
        background-color: #0F1C2E;
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
      }

      .motto {
        font-size: 13px;
        font-weight: 400;
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
      }

      .readall {
        display: flex;
        align-items: center;
        cursor: pointer;

        .text {
          font-size: 13px;
          font-weight: bolder;
        }

        .down {
          padding: 4px 5px 0;
          font-size: 13px;
        }

      }

      .close-readall {
        position: absolute;
        bottom: -10px;
        right: 0;

        .text {
          cursor: pointer;
        }
      }

      .editor {
        box-sizing: border-box;
        width: 100%;
        overflow: hidden;
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
</style>
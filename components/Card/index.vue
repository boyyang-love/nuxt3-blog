<script setup lang="ts">
import {NEllipsis, NAvatar, NIcon, NImage, NPopover} from 'naive-ui'
import {ChevronUp, ChevronDown} from '@vicons/ionicons5'
import {useRouter} from 'vue-router'
import moment from 'moment'
import errImg from '@/assets/image/avatar_g.jpg'
import {getUserInfoById, type User} from '@/api/user'
import {env} from '~/utils/env'
import CubeLoading from '~/components/CubeLoading/index.vue'
import WaterTitle from '~/components/AniText/index.vue'


const isReadAll = ref<boolean>(false)
const userInfo = ref<User.UserInfoByIdRes>()

const props = defineProps<{
  id: number
  userid: number
  avatar: string
  title: string
  created: number
  username: string
  motto: string
  cover: string
  des: string
  content: string
}>()

const router = useRouter()

const readAll = () => {
  isReadAll.value = true
}

const getUserInfo = () => {
  if (!userInfo.value) {
    getUserInfoById({id: props.userid}).then((res) => {
      res.data.cover = `${env.VITE_APP_IMG_URL}${res.data.cover}`
      userInfo.value = res.data
    })
  }
}

const toDetail = () => {
  router.push({
    path: '/user',
    query: {
      id: props.userid,
    },
  })
}

</script>

<template>
  <div class="card-wrapper" id="card-wrapper">
    <div class="title-wrapper">
      <nuxt-link :to="`/detail/?id=${props.id}`" class="link">
        <WaterTitle :text="props.title"></WaterTitle>
      </nuxt-link>
      <div class="time">
        <span>{{ moment(props.created).format('YYYY-MM-DD') }}</span>
        <div class="point"></div>
        <span>{{ moment(props.created).format('HH:mm:ss') }}</span>
      </div>
    </div>
    <div class="user-info">
      <div
          class="avatar"
      >
        <client-only>
          <n-popover
              trigger="hover"
              placement="bottom"
              display-directive="show"
              @update:show="getUserInfo"
          >
            <template #trigger>
              <nuxt-link
                  class="link"
                  :to="`/user/?id=${props.userid}`"
              >
                <n-avatar
                    :fallback-src="errImg"
                    :size="50"
                    :src="props.avatar"
                ></n-avatar>
              </nuxt-link>
            </template>
            <div class="popover-wrapper">
              <div class="user-cover" @click="toDetail">
                <NImage
                    class="img"
                    :src="userInfo?.cover"
                    :preview-disabled="true"
                    lazy
                    width="100%"
                    object-fit="cover"
                >
                  <template #placeholder>
                    <div class="loading">
                      <CubeLoading></CubeLoading>
                    </div>
                  </template>
                </NImage>
              </div>
              <div class="user-motto">
                <span class="motto">
                  {{ userInfo?.motto }}
                </span>
              </div>
              <div class="infos" @click="toDetail">
                <div class="info">
                  <span class="text">博客</span>
                  <span class="value">{{ userInfo?.blog_count }}</span>
                </div>
                <div class="info">
                  <span class="text">壁纸</span>
                  <span class="value">{{ userInfo?.wallpaper_count }}</span>
                </div>
                <div class="info">
                  <span class="text">标签</span>
                  <span class="value">{{ userInfo?.tags_count }}</span>
                </div>
                <div class="info">
                  <span class="text">分类</span>
                  <span class="value">{{ userInfo?.categories_count }}</span>
                </div>
              </div>
            </div>
          </n-popover>
        </client-only>
      </div>
      <div class="info">
        <div class="name">
          {{ props.username }}
        </div>
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
              <ChevronUp></ChevronUp>
            </n-icon>
          </span>
        </div>
        <div class="readall" @click="readAll" v-if="!isReadAll">
          <span class="text">
            阅读全文
          </span>
          <span class="down">
            <n-icon class="icon" size="20">
              <ChevronDown></ChevronDown>
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
  border-radius: 3px;

  .title-wrapper {
    display: flex;
    justify-content: space-between;

    .link {
      position: relative;
      //text-decoration: none;
      text-decoration-color: var(--font-color);
      text-underline-offset: 5px;
    }

    .title {
      font-size: 16px;
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
      width: 50px;
      height: 50px;
      overflow: hidden;
      border-radius: 5px;
      border: 2px solid var(--border-color);

      .img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .info {
      margin-left: 10px;

      .name {
        font-size: 15px;
        font-weight: bolder;
        color: var(--font-color);
      }

      .motto {
        font-size: 13px;
        font-weight: 400;
        color: var(--font-color-200);
      }
    }
  }


  .top-img {
    box-sizing: border-box;
    display: flex;

    .img {
      box-sizing: border-box;
      transition: all 0.45s linear;
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
        font-size: 14px;
        font-weight: 400;
        text-align: justify;
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
          color: var(--font-color-200);
        }

        .down {
          display: inline-block;
          justify-content: center;
          align-items: center;
          padding-top: 7px;
          font-size: 13px;
          cursor: pointer;
          color: var(--font-color-200);
        }

      }

      .close-readall {
        position: absolute;
        bottom: -10px;
        right: 0;
        display: flex;
        align-items: center;

        .text {
          font-size: 13px;
          cursor: pointer;
          color: var(--font-color-200);
        }

        .down {
          padding-top: 5px;
          cursor: pointer;
          font-size: 13px;
          color: var(--font-color-200);
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

.popover-wrapper {
  width: 220px;

  .user-cover {
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 120px;
    cursor: pointer;
    padding-top: 10px;

    .img {
      box-sizing: border-box;
      border-radius: 3px;
      width: 100%;
      height: 100%;
      object-fit: cover;

      .loading {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }

  .user-motto {
    margin: 5px 0;
    font-size: 13px;
    color: var(--font-color-200);
  }

  .infos {
    display: flex;

    .info {
      margin-right: 10px;
      cursor: pointer;

      .text {
        color: var(--font-color);
        font-size: 14px;
      }

      .value {
        color: var(--font-color-200);
        font-size: 13px;
        margin-left: 5px;
      }
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
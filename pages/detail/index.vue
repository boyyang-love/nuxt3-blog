<script setup lang="ts">
import {NAvatar} from 'naive-ui'
import MessageBoard from './components/messageBoard/index.vue'
import errImg from '@/assets/image/avatar_g.jpg'
import {useRoute} from 'vue-router'
import {searchBlogById, type Blog} from '@/api/blog'
import moment from 'moment'
import {env} from '~/utils/env'

const route = useRoute()
const info = ref<Blog.ListBlogItem | null>()
console.log(route.query.id)

const getBlogInfo = () => {
  searchBlogById({id: route.query.id as unknown as number}).then((res) => {
    res.data.info.user = {
      ...res.data.info.user,
      avatar: `${env.VITE_APP_IMG_URL}${res.data.info.user.avatar}`,
    }
    info.value = res.data.info

  })
}

onMounted(() => {
  getBlogInfo()
})
</script>

<template>
  <div class="home-wrapper container w-auto m-auto">
    <div class="content">
      <div class="left-content">
        <div class="top-cover">
          <img
              class="img"
              :src="info?.cover"
              :alt="info?.title"
          >
        </div>
        <div class="info">
          <div class="blog-title">
            <span class="title">
              {{ info?.title }}
            </span>
            <span
                class="time"
            >
              {{ moment(info?.created).format('YYYY-MM-DD') }}
            </span>
          </div>
          <div class="inner-info-wrapper">
            <div
                class="inner-html"
                v-html="info?.content"
                v-highlight
            ></div>
          </div>
          <div class="user-info">
            <div class="left">
              <div class="avatar">
                <n-avatar
                    :size="50"
                    :src="info?.user.avatar"
                    :fallback-src="errImg"
                ></n-avatar>
              </div>
            </div>
            <div class="right">
              <span class="user-name">{{ info?.user.username }}</span>
              <span class="user-motto">{{ info?.user.motto }}</span>
            </div>
          </div>
          <MessageBoard></MessageBoard>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.home-wrapper {
  box-sizing: border-box;

  .content {
    box-sizing: border-box;
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  .left-content {

    .top-cover {
      box-sizing: border-box;
      padding: 10px;

      .img {
        box-sizing: border-box;
        width: 100%;
        border-radius: 5px;
      }
    }

    .info {
      box-sizing: border-box;
      border-radius: 10px;
      padding: 10px;

      .inner-info-wrapper {
        display: flex;
        justify-content: center;

        .inner-html {
          box-sizing: border-box;
          width: 100%;
        }
      }

      .blog-title {
        display: flex;
        justify-content: space-between;

        .title {
          font-size: 18px;
          font-weight: bolder;
        }

        .time {
          font-size: 13px;
        }
      }

      .user-info {
        display: flex;
        margin: 10px 0;

        .left {
          .avatar {
            box-sizing: border-box;
            width: 50px;
            height: 50px;
            overflow: hidden;
            border-radius: 4px;

            .img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
          }
        }

        .right {
          display: flex;
          flex-direction: column;
          margin-left: 10px;

          .user-name {
            font-size: 14px;
            font-weight: bolder;
            margin-bottom: 4px;
          }

          .user-motto {
            font-size: 12px;
          }
        }
      }
    }


  }
}
</style>
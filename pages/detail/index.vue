<script setup lang="ts">
import {NAvatar, NSpace, NIcon, NPopconfirm} from 'naive-ui'
import MessageBoard from './components/messageBoard/index.vue'
import errImg from '@/assets/image/avatar_g.jpg'
import {useRoute, useRouter} from 'vue-router'
import {deleteBlog, type Blog} from '@/api/blog'
import moment from 'moment'
import {env} from '~/utils/env'
import {TrashBin, Create} from '@vicons/ionicons5'
import {useUserStore} from '@/store/modules/user'
import {useAsyncData} from '#app'
import {$fetch} from 'ofetch/node'
import type {Result} from '~/utils/http/types'

const userStore = useUserStore()
const route = useRoute()
const router = useRouter()
const isShowSkeleton = ref<boolean>(false)

const {data, refresh} = await useAsyncData(
    'blog_detail',
    () => $fetch<Result<Blog.ListBlogSearchByIdRes>>('/blog/search/id',
        {
          baseURL: env.VITE_APP_API_URL,
          method: 'GET',
          params: {
            id: route.query.id,
          },
          onResponse(ctx): Promise<any> {
            return new Promise((resolve) => {
              const {_data} = ctx.response
              const {data} = _data as Result<Blog.ListBlogSearchByIdRes>
              data.info.user = {
                ...data.info.user,
                avatar: `${env.VITE_APP_IMG_URL}${data.info.user.avatar}`,
              }
              data.info.comment = data.info.comment.map(c => {
                return {
                  ...c,
                  user: {
                    ...c.user,
                    avatar: `${env.VITE_APP_IMG_URL}${c.user.avatar}`,
                  },
                }
              })
              resolve(ctx)
            })
          },
        },
    ),
)

const toEdit = () => {
  router.push({
    path: '/create',
    query: {
      id: route.query.id,
    },
  })
}

const delBlog = () => {
  deleteBlog({id: (data.value as any).data.info.id as number}).then(() => {
    router.back()
  })
}

watch(() => route.query.id, (newVal) => {
  if (newVal) {
    refresh()
  }
})

onMounted(() => {
  isShowSkeleton.value = true
  const t = setTimeout(() => {
    isShowSkeleton.value = false
    clearTimeout(t)
  }, 300)

})

</script>

<template>
  <div class="home-wrapper">
    <Head>
      <Title>{{ data?.data.info.title || 'boyyang的个人博客网站' }}</Title>
      <Meta name="description" :content="data?.data.info.des || 'boyyang的个人博客网站'"></Meta>
      <Meta
          name="keywords"
          :content="data?.data.info.tag.map(t => t.tag_name).join(',') ||'boyyang,个人博客网站,博客' "
      ></Meta>
    </Head>
    <div class="content">
      <div class="left-content">
        <div class="top-cover">
          <img
              class="img"
              :src="data?.data.info?.cover"
              :alt="data?.data.info?.title"
          >
        </div>
        <div class="info">
          <div class="blog-title">
            <span class="title">
              {{ data?.data.info?.title }}
            </span>
            <span
                class="time"
            >
              {{ moment(data?.data.info?.created).format('YYYY-MM-DD hh:mm:ss') }}
            </span>
          </div>
          <div class="inner-info-wrapper">
            <div
                class="inner-html"
                v-html="data?.data.info?.content"
                v-highlight
            ></div>
          </div>
          <div class="tags-wrapper">
            <n-space>
              <div
                  class="tag-item"
                  v-for="item in data?.data.info.tag"
              >
                #{{ item.tag_name }}
              </div>
            </n-space>
          </div>
          <client-only>
            <div class="user-info">
              <div class="left">
                <div class="avatar">
                  <n-avatar
                      :size="50"
                      :src="data?.data.info?.user.avatar"
                      :fallback-src="errImg"
                  ></n-avatar>
                </div>
              </div>
              <div class="right">
                <span class="user-name">{{ data?.data.info?.user.username }}</span>
                <span class="user-motto">{{ data?.data.info?.user.motto }}</span>
                <div class="edit-wrapper" v-if="userStore.token && userStore.user_info.id === data?.data.info?.user.id">
                  <n-space>
                    <n-icon
                        size="22"
                        @click="toEdit"
                        class="icon"
                    >
                      <Create></Create>
                    </n-icon>

                    <n-popconfirm
                        trigger="click"
                        positive-text="确定"
                        negative-text="取消"
                        @positive-click="delBlog"
                    >
                      <template #trigger>
                        <n-icon
                            size="22"
                            class="icon"
                        >
                          <TrashBin></TrashBin>
                        </n-icon>
                      </template>
                      <span>
                      是否确定删除当前文章
                    </span>
                    </n-popconfirm>
                  </n-space>
                </div>
              </div>
            </div>
            <div class="message-board">
              <MessageBoard
                  :count="data?.data.info.comment.length"
                  :infos="data?.data.info.comment"
                  :id="route.query.id"
                  @submit="refresh"
              ></MessageBoard>
            </div>
          </client-only>
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
        color: var(--font-color);

        :deep(img) {
          max-width: 100%;
          border-radius: 5px;
        }

        :deep(code) {
          border-radius: 5px;
        }

        .inner-html {
          box-sizing: border-box;
          width: 100%;
        }
      }

      .tags-wrapper {
        box-sizing: border-box;
        display: flex;
        flex-wrap: wrap;

        .tag-item {
          box-sizing: border-box;
          padding: 0 5px;
          font-size: 13px;
          font-weight: bolder;
          color: var(--font-color);
          border: 1px solid var(--border-color);
          border-radius: 2px;
          cursor: pointer;
        }
      }

      .blog-title {
        display: flex;
        justify-content: space-between;

        .title {
          font-size: 18px;
          font-weight: bolder;
          color: var(--font-color);
        }

        .time {
          color: var(--font-color-200);
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
            border: 3px solid var(--border-color);

            .img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
          }
        }

        .right {
          box-sizing: border-box;
          width: 100%;
          display: flex;
          flex-direction: column;
          margin-left: 10px;
          position: relative;

          .user-name {
            font-size: 14px;
            font-weight: bolder;
            margin-bottom: 4px;
            color: var(--font-color);
          }

          .user-motto {
            font-size: 12px;
            color: var(--font-color-200);
          }

          .edit-wrapper {
            position: absolute;
            right: 0;

            .icon {
              font-size: 22px;
              cursor: pointer;
              color: var(--font-color);
            }
          }
        }
      }
    }
  }
}

@media screen and (max-width: 1200px) {
  .home-wrapper {

    .info {

      .blog-title {
        flex-direction: column;

        .title {
          font-size: 14px;
        }
      }
    }
  }
}
</style>
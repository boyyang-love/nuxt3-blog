<script setup lang="ts">
import {NAvatar, NImage, NPagination, NIcon, NBackTop, NEmpty, NModal, NEllipsis, NCard} from 'naive-ui'
import {Close, Home} from '@vicons/ionicons5'
import {definePageMeta} from '#imports'
import {getUserInfoById, type User} from '@/api/user'
import {type Tag, tagListByUserId} from '@/api/tags'
import {useRoute, useRouter} from 'vue-router'
import CardBlog from '@/components/CardBlog/index.vue'
import {env} from '@/utils/env'
import {type Blog, searchBlogByIds, searchBlogByUserId} from '~/api/blog'
import errimg from '@/assets/image/wolp.jpg'
import errAvatar from '@/assets/image/avatar_g.jpg'
import WaterFlow from './components/waterFull/index.vue'
import {type Upload, uploadListPublic} from '~/api/upload'
import {CubeLoading} from '#components'

const route = useRoute()
const router = useRouter()
const wrapper = ref<HTMLElement | null>(null)
const tab = ref<string>('blog')
const userInfo = ref<User.UserInfoByIdRes>()
const blogInfo = ref<Blog.ListBlogSearchByUserIdInfo[]>([])
const imageList = ref<Upload.UploadListItem[]>([])
const tagsList = ref<Tag.TagInfo[]>([])
const isShowCard = ref<boolean>(false)
const blogList = ref<Blog.ListBlogItemByids[]>([])

// blog
const count = ref<number>(0)
const page = ref<number>(1)
const limit = ref<number>(10)
// image
const imageCount = ref<number>(0)
const imagePage = ref<number>(1)
const imageLimit = ref<number>(20)


const getUserInfo = () => {
  const userid = route.query.id as unknown as number
  if (!userid) {
    window.$notification.create({
      title: '提示',
      content: '没有该用户的信息',
      type: 'error',
    })
    return
  }
  getUserInfoById({id: userid}).then((res) => {
    res.data.avatar = `${env.VITE_APP_IMG_URL}${res.data.avatar}`
    res.data.cover = `${env.VITE_APP_IMG_URL}${res.data.cover}`
    userInfo.value = res.data
  })
}
const getBlogInfo = () => {
  const userid = route.query.id as unknown as number
  if (!userid) return

  searchBlogByUserId({id: Number(userid), page: page.value, limit: limit.value}).then((res) => {
    count.value = res.data.count
    blogInfo.value = res.data.infos
  })
}

const getBlogList = (ids: number[]) => {
  window.$uploadProgress.begin()
  searchBlogByIds({ids: ids}).then((res) => {
    blogList.value = res.data.info
    const t = setTimeout(() => {
      t && clearTimeout(t)
      isShowCard.value = true
      window.$uploadProgress.end()
    }, 500)

  }).catch(() => {
    window.$uploadProgress.end()
  })
}


const pageSizes = [
  {
    label: '10 每页',
    value: 10,
  },
  {
    label: '20 每页',
    value: 20,
  },
  {
    label: '30 每页',
    value: 30,
  },
  {
    label: '40 每页',
    value: 40,
  },
]

const pageSizeChange = (e: number) => {
  limit.value = e
  getBlogInfo()
}

const pageUpdate = (e: number) => {
  page.value = e
  getBlogInfo()
}


onMounted(() => {
  getUserInfo()
  getBlogInfo()
})

const getList = () => {
  uploadListPublic({
    page: imagePage.value,
    limit: imageLimit.value,
    id: Number(route.query.id),
  }).then((res) => {
    imageCount.value = res.data.count
    res.data.infos.forEach((e) => {
      imageList.value.push({
        ...e,
        file_path: `${env.VITE_APP_IMG_URL}/${e.file_path}`,
      })
    })
  })
}

const getTagsList = () => {
  tagListByUserId({user_id: Number(route.query.id), type: 'article'}).then((res) => {
    tagsList.value = res.data.tags
  })
}

const handleScroll = () => {
  const w = wrapper.value as any
  const len = imageList.value.length
  if (w.scrollTop + w.clientHeight >= w.scrollHeight - 20) {
    if (len < imageCount.value) {
      imagePage.value++
      getList()
    }
  }
}


const tabChange = (t: string) => {
  tab.value = t

  if (t === 'wallpaper' && imageList.value.length === 0) {
    getList()
  }

  if (t === 'tag' && tagsList.value.length === 0) {
    getTagsList()
  }
}

const toDetail = (id: number) => {
  router.push({
    path: '/details',
    query: {
      id: id,
    },
  }).then(() => {
    isShowCard.value = false
  })
}

definePageMeta({
  layout: false,
})
</script>

<template>
  <nuxt-layout name="custom">
    <client-only>
      <div class="user-wrapper">
        <div
            class="user-info-wrapper"
            id="user-info-wrapper"
            ref="wrapper"
            @scroll="handleScroll"
        >
          <div class="top-banner">
            <n-image
                class="img"
                :src="userInfo?.cover"
                :alt="userInfo?.cover"
                :fallback-src="errimg"
                :preview-disabled="true"
                :img-props="{
                width: '100%'
              }"
                object-fit="cover"
                :style="{
                width: '100%',
                height: '100%'
              }"
            >
              <template #placeholder>
                <div class="loading">
                  <CubeLoading></CubeLoading>
                </div>
              </template>
            </n-image>
          </div>
          <div class="user-info">
            <div class="user-avatar">
              <n-avatar
                  class="avatar"
                  :src="userInfo?.avatar"
                  :size="80"
                  :fallback-src="errAvatar"
              ></n-avatar>
            </div>
            <div class="info">
              <span class="username">{{ userInfo?.username }}</span>
              <span class="motto">{{ userInfo?.motto }}</span>
            </div>
          </div>
          <div class="user-mes">
            <div
                :class="['item', tab === 'blog' ? 'active' : '']"
                @click="tabChange('blog')"
            >
              <span class="text">博客</span>
              <span class="value">{{ userInfo?.blog_count }}</span>
            </div>
            <div
                :class="['item', tab === 'wallpaper' ? 'active' : '']"
                @click="tabChange('wallpaper')"
            >
              <span class="text">壁纸</span>
              <span class="value">{{ userInfo?.wallpaper_count }}</span>
            </div>
            <div
                :class="['item', tab === 'tag' ? 'active' : '']"
                @click="tabChange('tag')"
            >
              <span class="text">标签</span>
              <span class="value">{{ userInfo?.tags_count }}</span>
            </div>
            <div class="home">
              <nuxt-link class="link" to="/home">
                <n-icon :size="22" class="icon">
                  <Home></Home>
                </n-icon>
              </nuxt-link>
            </div>
          </div>

          <div v-show="tab === 'blog'">
            <div class="detail-wrapper">
              <div class="empty" v-if="blogInfo.length === 0">
                <n-empty></n-empty>
              </div>
              <div class="blogs">
                <CardBlog
                    v-for="item in blogInfo"
                    :title="item.title"
                    :id="item.id"
                    :des="item.des"
                    :cover="item.cover"
                    :time="item.created"
                ></CardBlog>
              </div>
            </div>

            <div class="pagination" v-if="blogInfo.length > 0">
              <n-pagination
                  :item-count="count"
                  :page-size="limit"
                  :page-sizes="pageSizes"
                  @update:page="pageUpdate"
                  @update:pageSize="pageSizeChange"
                  show-size-picker
              />
            </div>
          </div>

          <div v-show="tab === 'wallpaper'">
            <div class="wallpepr-detail">
              <div class="empty" v-if="imageList.length === 0">
                <n-empty></n-empty>
              </div>
              <WaterFlow
                  :list="imageList"
              ></WaterFlow>
            </div>
          </div>

          <div v-show="tab === 'tag'">
            <div class="tag-detail">
              <div class="empty" v-if="tagsList.length === 0">
                <n-empty></n-empty>
              </div>
              <div class="tags-wrapper">
                <div
                    class="tag-item"
                    v-for="item in tagsList"
                    @click="getBlogList(item.articles.map(a => a.id))"
                >
                  <span class="name">
                    {{ item.tag_name }}
                  </span>
                  <span class="value">
                    {{ item.articles.length || 0 }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <n-back-top :right="300" :bottom="55"></n-back-top>

        </div>
      </div>

      <n-modal
          v-model:show="isShowCard"
          style="
            max-width: 600px;
            position: fixed;
            top: 100px;
            left: 50%;
            transform: translateX(-50%);
        "
      >
        <n-card>
          <div class="blog-list">
            <div class="search-result">
              <div
                  class="search-result-item"
                  v-for="item in blogList"
                  @click="toDetail(item.id)"
              >
                <div class="left-img">
                  <img class="img" :src="item.cover" :alt="item.cover">
                </div>
                <div class="right-content">
                  <n-ellipsis
                      :line-clamp="1"
                      :tooltip="false"
                  >
                    <span class="title">{{ item.title }}</span>
                  </n-ellipsis>
                  <n-ellipsis
                      :line-clamp="2"
                      :tooltip="false"
                  >
                    <span class="des">{{ item.des }}</span>
                  </n-ellipsis>
                </div>
              </div>
            </div>
            <div class="close">
              <n-icon
                  :size="22"
                  class="icon"
                  @click="isShowCard = false"
              >
                <Close></Close>
              </n-icon>
            </div>
          </div>
        </n-card>
      </n-modal>

    </client-only>
  </nuxt-layout>
</template>

<style scoped lang="less">
::-webkit-scrollbar {
  width: 0 !important;
  height: 2px;
}

::-webkit-scrollbar-track {
  background: transparent;
  border-radius: 2px;
}

::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.3);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(56, 74, 82, 0.7);
}

.user-wrapper {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .user-info-wrapper {
    box-sizing: border-box;
    width: 750px;
    height: 900px;
    padding: 0 10px;
    border-radius: 5px;
    overflow-y: auto;

    .top-banner {
      box-sizing: border-box;
      width: 100%;
      max-height: 420px;
      overflow: hidden;
      background-color: var(--card-color);

      .img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 5px 5px 2px 2px;

        .loading {
          box-sizing: border-box;
          width: 100%;
          height: 100%;
          margin: auto;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }

    .user-info {
      box-sizing: border-box;
      width: 100%;
      background-color: var(--card-color);
      position: relative;

      .info {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        padding-left: 120px;

        .username {
          font-size: 18px;
          font-weight: bolder;
          color: var(--font-color);
        }

        .motto {
          font-size: 14px;
          color: var(--font-color-200)
        }

      }

      .user-avatar {
        position: absolute;
        top: -40px;
        left: 20px;
        z-index: 999;

        .avatar {
          border: 3px solid var(--border-color);
        }
      }
    }

    .user-mes {
      box-sizing: border-box;
      width: 100%;
      background-color: var(--card-color);
      padding: 10px;
      display: flex;
      position: sticky;
      top: 0;
      z-index: 9;

      .item {
        margin: 0 10px;
        cursor: pointer;
      }

      .text {
        color: var(--font-color);
        font-size: 14px;
        font-weight: bolder;
      }

      .value {
        color: var(--font-color-200);
        margin-left: 10px;
        font-size: 14px;
      }

      .active {
        border-bottom: 2px solid var(--border-color);
      }

      .home {
        position: absolute;
        right: 15px;

        .icon {
          cursor: pointer;
          color: var(--font-color);
        }
      }
    }

    .detail-wrapper {
      margin-top: 10px;
      background-color: var(--card-color);
      padding: 10px;
      border-radius: 2px;


      .empty {
        box-sizing: border-box;
        width: 100%;
        padding: 150px 0;
        justify-content: center;
        align-items: center;
      }
    }

    .pagination {
      box-sizing: border-box;
      padding: 10px;
      width: 100%;
      background-color: var(--card-color);
      display: flex;
      justify-content: center;
      position: sticky;
      bottom: 0;
    }

    .wallpepr-detail {
      height: 100%;
      box-sizing: border-box;
      background-color: var(--card-color);
      border-radius: 2px;
      padding: 10px;
      margin-top: 10px;

      .empty {
        box-sizing: border-box;
        width: 100%;
        padding: 150px 0;
        justify-content: center;
        align-items: center;
      }
    }

    .tag-detail {
      box-sizing: border-box;
      width: 100%;
      padding: 10px;
      margin-top: 10px;
      background-color: var(--card-color);

      .empty {
        box-sizing: border-box;
        width: 100%;
        padding: 150px 0;
        justify-content: center;
        align-items: center;
      }

      .tags-wrapper {
        display: flex;
        flex-wrap: wrap;
        .tag-item {
          box-sizing: border-box;
          background-color: var(--card-color);
          border: 2px solid var(--border-color);
          margin: 5px;
          padding: 0 5px;
          border-radius: 3px;
          cursor: pointer;
          display: flex;
          align-items: center;

          .name {
            font-size: 14px;
            color: var(--font-color);
          }

          .value {
            font-size: 13px;
            color: var(--font-color-200);
            margin-left: 5px;
          }
        }
      }
    }
  }
}

.blog-list {
  display: flex;
  max-height: 500px;
  overflow-y: auto;

  .search-result-item {
    display: flex;
    padding: 10px;
    cursor: pointer;

    .left-img {
      box-sizing: border-box;
      width: 145px;
      height: 75px;
      border-radius: 5px;
      overflow: hidden;
      flex-shrink: 0;

      .img {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .right-content {
      display: flex;
      flex-direction: column;
      padding-left: 10px;

      .title {
        font-size: 15px;
        font-weight: bolder;
        color: var(--font-color);
      }

      .des {
        font-size: 13px;
        font-weight: bold;
        color: var(--font-color-200);
      }
    }
  }

  .close {
    position: absolute;
    top: 5px;
    right: 5px;

    .icon {
      color: var(--font-color);
      cursor: pointer;
      transition: all 0.45s ease-in-out;
      display: inline-block;

      &:hover {
        transform: rotateZ(90deg);
      }
    }
  }
}

@media screen and (max-width: 800px) {
  .user-wrapper {
    .user-info-wrapper {
      width: 100%;
      height: 100%;
      padding: 0;

      .top-banner {
        width: 100%;
        height: auto;
      }

      .user-info {

        .info {
          padding: 45px 0 0 20px;
        }
      }
    }
  }
}
</style>
<script lang="ts" setup>
import {NEmpty, NUpload, NAvatar, NButton, NIcon} from 'naive-ui'
import {Camera} from '@vicons/ionicons5'
import {useRouter} from 'vue-router'
import {useUserStore} from '@/store/modules/user'
import Card from '@/components/Card/index.vue'
import TitleText from '~/components/TitleText/index.vue'
import {type Blog} from '@/api/blog'
import {env} from '~/utils/env'
import {useFileUpload} from '@/hooks/fileUpload'
import {updateUserInfo} from '@/api/user'
import errImg from 'assets/image/wolp.jpg'
import type {Result} from '~/utils/http/types'
import {useFetch} from '#app'

const router = useRouter()
const userStore = useUserStore()
const {customRequest, uploadRef} = useFileUpload('bg', (info) => {
  updateUserInfo({
    cover: info.FileInfo.file_baseurl,
  })
  userStore.$patch({
    user_info: {
      cover: info.FileInfo.file_url,
    },
  })
})

const page = ref<number>(1)
const limit = ref<number>(20)
const isShowSkeleton = ref<boolean>(true)


const {data} = useFetch('/blog/list', {
      baseURL: env.VITE_APP_API_URL,
      method: 'GET',
      params: {
        page: page.value,
        limit: limit.value,
        type: 'recently',
      },
      onResponse(ctx): Promise<any> {
        return new Promise((resolve, reject) => {
          const {_data} = ctx.response
          const {data} = _data as Result<Blog.ListBlogRes>

          data.list = data.list.map(l => {
            return {
              ...l,
              user: {
                ...l.user,
                avatar: `${env.VITE_APP_IMG_URL}${l.user.avatar}`,
              },
            }
          })
          isShowSkeleton.value = false
          resolve(ctx)
        })
      },
    },
)


onMounted(() => {
  isShowSkeleton.value = true
  const t = setTimeout(() => {
    isShowSkeleton.value = false
    clearTimeout(t)
  }, 300)
})

const refreshing = ref(false)
const refreshAll = async () => {
  refreshing.value = true
  try {
    await refreshNuxtData()
  } finally {
    refreshing.value = false
  }
}
</script>

<template>
  <div class="home-wrapper">
    <Head>
      <Title>{{ data?.data.list.map(d => d.title).join(',') || 'boyyang的个人博客' }}</Title>
      <Meta name="description" :content="data?.data.list.map(d => d.des).join(',')"></Meta>
      <Meta name="keywords" :content="data?.data.list.map(d => d.title).join(',')"></Meta>
    </Head>
    <client-only>
      <div class="banner">
        <NAvatar
            :src="userStore.user_info.cover"
            :fallback-src="errImg"
            object-fit="cover"
            :alt="userStore.user_info.cover"
            class="img"
        ></NAvatar>
        <div class="edit-userinfo-icon" v-if="userStore.token">
          <n-upload
              :show-file-list="false"
              :custom-request="customRequest"
              ref="uploadRef"
          >
            <n-button type="default" size="small">
              <n-icon class="icon">
                <Camera></Camera>
              </n-icon>
            </n-button>
          </n-upload>
        </div>
      </div>
    </client-only>
    <div class="content">
      <TitleText :more="false"></TitleText>
      <div class="empty" v-if="data?.data.list.length === 0">
        <n-empty></n-empty>
      </div>
      <Card
          v-else
          v-for="item in data?.data.list"
          :avatar="item.user.avatar"
          :id="item.id"
          :title="item.title"
          :created="item.created"
          :username="item.user.username"
          :motto="item.user.motto"
          :cover="item.cover"
          :content="item.content"
          :des="item.des"
      ></Card>
    </div>
  </div>
</template>

<style scoped lang="less">
.home-wrapper {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 10px;

  .banner {
    box-sizing: border-box;
    width: 100%;
    border-radius: 3px;
    position: relative;

    .img {
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 3px;
    }

    .edit-userinfo-icon {
      position: absolute;
      bottom: 20px;
      right: 15px;
      border-radius: 3px;
      display: flex;
      justify-content: center;
      align-items: center;

      background: rgba(0, 0, 0, 0.12);
      backdrop-filter: blur(4px);
      -webkit-backdrop-filter: blur(4px);

      .icon {
        color: rgb(255, 255, 255);
        font-size: 20px;
        cursor: pointer;
      }
    }
  }

  .content {
    box-sizing: border-box;
    width: 100%;
    display: flex;
    flex-direction: column;
    padding-top: 50px;
    position: relative;

    .empty {
      box-sizing: border-box;
      width: 100%;
      height: 200px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .pagination {
      box-sizing: border-box;
      background-color: rgb(255, 255, 255);

      padding: 10px 0;
      width: 100%;
      display: flex;
      justify-content: center;
      position: sticky;
      bottom: 0;
    }
  }

  .center-content {
    box-sizing: border-box;
    background-color: #1f2b3e;
    z-index: 1;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    padding: 10px;
    box-shadow: 2px 5px 5px rgba(0, 0, 0, 0.5), -2px 0 5px rgba(0, 0, 0, 0.5);

    .cards {
      box-sizing: border-box;
      width: 100%;
      display: flex;
      justify-content: space-between;
      gap: 20px;
      margin-bottom: 40px;

      .left {
        display: flex;
        justify-content: center;
        flex: 1;
      }

      .right {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        gap: 20px;
        flex: 1;
      }
    }

    .images {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 10px;
    }
  }
}
</style>
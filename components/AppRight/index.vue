<script setup lang="ts">
import {NEmpty} from 'naive-ui'
import CardTop from '~/components/CardTop/index.vue'
import Title from '~/components/TitleText/index.vue'
import {type Blog, listBlog} from '~/api/blog'
import {env} from '~/utils/env'
import {useUserStore} from '@/store/modules/user'
import {clearNuxtData, refreshNuxtData, useAsyncData} from '#app'
import {$fetch} from 'ofetch/node'
import type {Result} from '~/utils/http/types'

const userStore = useUserStore()


const {data, refresh} = await useAsyncData(
    'blog_list_top',
    () => $fetch<Result<Blog.ListBlogRes>>('/blog/list',
        {
          baseURL: env.VITE_APP_API_URL,
          method: 'GET',
          params: {
            page: 1,
            limit: 5,
            type: 'top',
          },
          query: {
            key: new Date().getTime(),
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
              resolve(ctx)
            })
          },
        },
    ),
)

onMounted(() => {
  refreshNuxtData()
})

</script>

<template>
  <div class="app-right">
    <div class="top-article">
      <Title padding="10px 0" :more="false" title="热门文章"></Title>
      <div
          class="empty"
          v-if="data?.data.list.length === 0"
      >
        <n-empty size="small"></n-empty>
      </div>
      <div v-else>
        <CardTop
            v-for="item in data?.data.list"
            :id="item.id"
            :cover="item.cover"
            :key="item.id"
            :title="item.title"
            :sub-title="item.des"
        ></CardTop>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.app-right {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 10px;

  .top-article {
    .empty {
      box-sizing: border-box;
      width: 100%;
      height: 50px;
    }
  }
}
</style>
<script setup lang="ts">
import {NEmpty} from 'naive-ui'
import CardTop from '~/components/CardTop/index.vue'
import Title from '~/components/TitleText/index.vue'
import {type Blog} from '~/api/blog'
import {env} from '~/utils/env'
import {useAsyncData} from '#app'
import {$fetch} from 'ofetch/node'
import type {Result} from '~/utils/http/types'


const {data} = await useAsyncData(
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
            return new Promise((resolve) => {
              const {_data} = ctx.response
              const {data} = _data as Result<Blog.ListBlogRes>

              resolve(ctx)
            })
          },
        },
    ),
)
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
      <div v-else class="card-top-wrapper">
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

  .card-top-wrapper {
    padding-bottom: 20px;
  }
}
</style>
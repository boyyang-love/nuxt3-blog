<script setup lang="ts">
import Card from '@/components/Card/index.vue'
import {type Blog} from '~/api/blog'
import {NEmpty, NPagination} from 'naive-ui'
import {env} from '~/utils/env'
import type {Result} from '~/utils/http/types'
import {useBackTopStore} from '@/store/modules/backTop'

const backTopStore = useBackTopStore()

const count = ref<number>(0)
const page = ref<number>(1)
const limit = ref<number>(10)

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
const {data, refresh} = await useAsyncData(
    'blog_list',
    () => $fetch<Result<Blog.ListBlogRes>>('/blog/list',
        {
          baseURL: env.VITE_APP_API_URL,
          method: 'GET',
          params: {
            page: page.value,
            limit: limit.value,
            type: 'created',
          },
          query: {
            key: new Date().getTime(),
          },
          onResponse(ctx): Promise<any> {
            return new Promise((resolve) => {
              const {_data} = ctx.response
              const {data} = _data as Result<Blog.ListBlogRes>
              count.value = data.count
              resolve(ctx)
            })
          },
        },
    ),
)

const pageSizeChange = (e: number) => {
  limit.value = e
  backTopStore.setTop()
  refresh()
}

const pageUpdate = (e: number) => {
  page.value = e
  backTopStore.setTop()
  refresh()
}
</script>

<template>
  <div class="blog-wrapper">
    <Head>
      <Title>{{ data?.data.list.map(d => d.title).join(',') }}</Title>
      <Meta name="description" :content="data?.data.list.map(d => d.des).join(',')"></Meta>
      <Meta name="keywords" :content="`${data?.data.list.map(d => d.keywords).join(',')},${data?.data.list.map(d => d.title).join(',')}  - boyyang的个人博客网站`"></Meta>
    </Head>
    <div class="content">
      <div class="empty" v-if="data?.data.list.length === 0">
        <n-empty></n-empty>
      </div>

      <Card
          v-else
          v-for="item in data?.data.list"
          :avatar="item.user.avatar"
          :id="item.id"
          :key="item.id"
          :userid="item.user.id"
          :title="item.title"
          :created="item.created"
          :username="item.user.username"
          :motto="item.user.motto"
          :cover="item.cover"
          :content="item.content"
          :des="item.des"
      >
      </Card>
    </div>
    <div class="pagination" v-show="data?.data?.list.length">
      <client-only>
        <n-pagination
            :item-count="count"
            :page-size="limit"
            :page-sizes="pageSizes"
            @update:page="pageUpdate"
            @update:pageSize="pageSizeChange"
            show-size-picker
        />
      </client-only>
    </div>

  </div>
</template>

<style scoped lang="less">
.blog-wrapper {
  box-sizing: border-box;
  width: 100%;
  position: relative;

  .content {
    box-sizing: border-box;
    width: 100%;
    min-height: 805px;
    display: flex;
    padding: 10px 10px 0;
    flex-direction: column;

    .empty {
      box-sizing: border-box;
      width: 100%;
      height: 300px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .pagination {
    box-sizing: border-box;
    background-color: var(--center-top-bg);
    padding: 10px 0;
    width: 100%;
    display: flex;
    justify-content: center;
    position: sticky;
    bottom: 0;
  }

}
</style>
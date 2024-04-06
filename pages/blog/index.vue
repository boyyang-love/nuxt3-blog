<script setup lang="ts">
import Card from '@/components/Card/index.vue'
import {type Blog} from '~/api/blog'
import {NEmpty, NPagination} from 'naive-ui'
import {env} from '~/utils/env'
import type {Result} from '~/utils/http/types'

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

              data.list = data.list.map(l => {
                return {
                  ...l,
                  user: {
                    ...l.user,
                    avatar: `${env.VITE_APP_IMG_URL}${l.user.avatar}`,
                  },
                }
              })
              count.value = data.count
              resolve(ctx)
            })
          },
        },
    ),
)

const pageSizeChange = (e: number) => {
  limit.value = e
  refresh()
}

const pageUpdate = (e: number) => {
  page.value = e
  refresh()
}
</script>

<template>
  <div class="blog-wrapper">
    <Head>
      <Title>{{ data?.data.list.map(d => d.title).join(',') }}</Title>
      <Meta name="description" :content="data?.data.list.map(d => d.des).join(',')"></Meta>
      <Meta name="keywords" :content="data?.data.list.map(d => d.title).join(',')"></Meta>
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
          :title="item.title"
          :created="item.created"
          :username="item.user.username"
          :motto="item.user.motto"
          :cover="item.cover"
          :content="item.content"
          :des="item.des"
      >
        <template #cover>

        </template>
      </Card>
    </div>
    <div class="pagination" v-show="data?.data?.list.length">
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
</template>

<style scoped lang="less">
.blog-wrapper {
  box-sizing: border-box;
  width: 100%;
  position: relative;


  .content {
    box-sizing: border-box;
    width: 100%;
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
    //background-color: rgb(245 246 255 / 80%);
    //background-color: rgb(241, 239, 254);
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
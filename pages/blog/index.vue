<script setup lang="ts">
import Title from '@/components/Title/index.vue'
import Card from '@/components/Card/index.vue'
import Page from '@/components/Page/index.vue'
import CardRight from './components/CardRight/index.vue'
import {type Blog, listBlog} from '~/api/blog'
import {NEmpty, NPagination} from 'naive-ui'
import {env} from '~/utils/env'

const count = ref<number>(0)
const page = ref<number>(1)
const limit = ref<number>(10)
const blogList = ref<Blog.ListBlogItem[]>()

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
const getBlogList = () => {
  listBlog({page: page.value, limit: limit.value}).then((res) => {
    count.value = res.data.count
    blogList.value = res.data.list.map(l => {
      return {
        ...l,
        user: {
          ...l.user,
          avatar: `${env.VITE_APP_IMG_URL}${l.user.avatar}`,
        },
      }
    })
  })
}

const pageSizeChange = (e: number) => {
  limit.value = e
  getBlogList()
}

const pageUpdate = (e: number) => {
  page.value = e
  getBlogList()
}
onMounted(() => {
  getBlogList()
})
</script>

<template>
  <div class="blog-wrapper">
    <div class="content">
      <div class="empty" v-if="blogList?.length === 0">
        <n-empty></n-empty>
      </div>
      <Card
          v-else
          v-for="item in blogList"
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
      <div class="pagination" v-show="listBlog.length > 0">
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
  </div>
</template>

<style scoped lang="less">
.blog-wrapper {
  box-sizing: border-box;
  width: 100%;

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
      height: 400px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .pagination {
      box-sizing: border-box;
      //background-color: rgb(245 246 255 / 80%);
      //background-color: rgb(241, 239, 254);
      background-color: rgb(255, 255, 255);

      padding: 10px 0;
      width: 100%;
      display: flex;
      justify-content: center;
      position: sticky;
      bottom: 0;
    }
  }


}
</style>
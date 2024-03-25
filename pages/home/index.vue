<script setup lang="ts">
import {NSpace, NEmpty, NPagination} from 'naive-ui'
import {useRouter} from 'vue-router'
import {useUserStore} from '@/store/modules/user'
import Card from '@/components/Card/index.vue'
import Title from '@/components/Title/index.vue'
import {listBlog, type Blog} from '@/api/blog'
import {env} from '~/utils/env'

useHead({
  bodyAttrs: {
    'data-prismjs-copy': '复制',
    'data-prismjs-copy-error': '复制出错',
    'data-prismjs-copy-success': '已复制',
  },
})

const router = useRouter()
const userStore = useUserStore()
const page = ref<number>(1)
const limit = ref<number>(10)
const blogList = ref<Blog.ListBlogItem[]>()
const toDetail = () => {
  router.push('/detail')
}

const getBlogList = () => {
  listBlog({page: page.value, limit: limit.value}).then((res) => {
    blogList.value = res.data.list.map(l => {
      return {
        ...l,
        user: {
          ...l.user,
          avatar: `${env.VITE_APP_IMG_URL}${l.user.avatar}`
        }
      }
    })
  })
}

onMounted(() => {
  getBlogList()

})

</script>

<template>
  <div class="home-wrapper">
    <div class="banner">
      <img class="img" src="@/assets/image/wolp.jpg" alt="">
    </div>
    <div class="content">
      <Title></Title>
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
    </div>
  </div>
</template>

<style scoped lang="less">
.home-wrapper {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 10px;
  //width: 1000px;

  .banner {
    box-sizing: border-box;
    width: 100%;
    height: 250px;
    border-radius: 3px;
    overflow: hidden;

    .img {
      width: 100%;
      height: 100%;
      object-fit: cover;
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

  .center-content {
    box-sizing: border-box;
    //width: 710px;
    //background-color: rgba(33, 43, 61, 1);
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
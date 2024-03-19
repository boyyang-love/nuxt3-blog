<script setup lang="ts">
import {NSpace} from 'naive-ui'
import {useRouter} from 'vue-router'
import Title from '@/components/Title/index.vue'
import CardLeft from './components/CardLeft/index.vue'
import CardRight from './components/CardRight/index.vue'
import ImageCard from '@/components/ImageCard/index.vue'
import Page from '@/components/Page/index.vue'
import UserCard from '@/components/UserCard/index.vue'
import Tags from '@/components/Tags/index.vue'
import MessageBoard from '@/components/MessageBoard/index.vue'
import {blogList} from '@/api/blog'
import {useUserStore} from '@/store/modules/user'

const router = useRouter()
const userStore = useUserStore()
const toDetail = () => {
  router.push('/detail')
}

onMounted(() => {
  blogList({page: 1, limit: 4}).then((res) => {
  })
})
</script>

<template>
  <div class="home-wrapper container w-auto m-auto">
    <div class="top-banner">
      <img class="img" src="@/assets/image/wolp.jpg" alt="">
    </div>
    <div class="content">
      <div class="left-content">
        <Title></Title>
        <div class="cards">
          <div class="left">
            <CardLeft></CardLeft>
          </div>
          <div class="right">
            <CardRight v-for="item in 3" @click="toDetail"></CardRight>
          </div>
        </div>
        <Title></Title>
        <div class="images">
          <ImageCard v-for="item in 6"></ImageCard>
        </div>
        <div class="page">
          <Page></Page>

        </div>
      </div>
      <div class="right-content">
        <UserCard></UserCard>
        <Tags></Tags>
        <MessageBoard></MessageBoard>

      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.home-wrapper {
  box-sizing: border-box;
  width: 1000px;

  .top-banner {
    box-sizing: border-box;
    width: 100%;
    height: 650px;
    position: absolute;
    left: 0;
    top: 0;
    box-shadow: 0 10px 10px rgba(0, 0, 0, 0, 5);

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
    justify-content: space-between;
    padding-top: 450px;
  }

  .left-content {
    box-sizing: border-box;
    width: 710px;
    background-color: rgb(33, 43, 61);
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

  .right-content {
    box-sizing: border-box;
    width: 280px;
    z-index: 1;
    border-radius: 10px;
  }
}
</style>
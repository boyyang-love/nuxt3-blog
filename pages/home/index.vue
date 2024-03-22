<script setup lang="ts">
import {NSpace} from 'naive-ui'
import {useRouter} from 'vue-router'
import {useUserStore} from '@/store/modules/user'
import Card from '@/components/Card/index.vue'
import Title from '@/components/Title/index.vue'

const router = useRouter()
const userStore = useUserStore()
const toDetail = () => {
  router.push('/detail')
}

</script>

<template>
  <div class="home-wrapper">
    <div class="banner">
      <img class="img" src="@/assets/image/wolp.jpg" alt="">
    </div>
    <div class="content">
      <Title></Title>
      <Card v-for="item in 10"></Card>
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
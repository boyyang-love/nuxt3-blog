<script setup lang="ts">
import MessageBoard from './components/messageBoard/index.vue'
import CardRight from './components/cardRight/index.vue'
import Title from '@/components/Title/index.vue'
</script>

<template>
  <div class="home-wrapper container w-auto m-auto">
    <div class="top-banner">
      <img class="img" src="@/assets/image/wolp.jpg" alt="">
    </div>
    <div class="content">
      <div class="left-content">
        <div class="info">
          <div class="top-info">
            <span class="time">2023-08-01</span>
          </div>
          <div class="blog-title">
          <span class="title">
            vue3的学习
          </span>
          </div>
          <div class="user-info">
            <div class="left">
              <div class="avatar">
                <img class="img" src="@/assets/image/wolp.jpg" alt="">
              </div>
            </div>
            <div class="right">
              <span class="user-name">boyyang</span>
              <span class="user-motto">第一行没有你，第二行没有你，第三行没有也罢！</span>
            </div>
          </div>
          <MessageBoard></MessageBoard>
        </div>
      </div>
      <div class="right-content">
        <div class="">
          <Title></Title>
          <CardRight v-for="item in 5"></CardRight>
        </div>
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
    display: flex;
    justify-content: center;
    align-items: center;

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
    width: 710px;
    z-index: 1;

    .info {
      box-sizing: border-box;
      border-radius: 10px;
      padding: 10px;
      background-color: rgb(33, 43, 61);
      box-shadow: 2px 5px 5px rgba(0, 0, 0, 0.5), -2px 0 5px rgba(0, 0, 0, 0.5);

      .top-info {
        display: flex;
        justify-content: flex-end;

        .time {
          font-size: 13px;
          color: whitesmoke;
        }
      }

      .blog-title {
        display: flex;
        justify-content: center;
        align-items: flex-start;
        flex-direction: column;

        .title {
          font-size: 18px;
          color: whitesmoke;
          font-weight: bolder;
        }
      }

      .user-info {
        display: flex;
        margin: 10px 0;

        .left {
          .avatar {
            box-sizing: border-box;
            width: 50px;
            height: 50px;
            overflow: hidden;
            border: 2px solid whitesmoke;
            border-radius: 4px;

            .img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
          }
        }

        .right {
          display: flex;
          flex-direction: column;
          margin-left: 10px;

          .user-name {
            font-size: 14px;
            color: whitesmoke;
            font-weight: bolder;
            margin-bottom: 4px;
          }

          .user-motto {
            font-size: 12px;
            color: whitesmoke;
          }
        }
      }
    }


  }

  .right-content {
    background-color: rgb(33, 43, 61);
    padding: 10px;
    border-radius: 5px;
    box-sizing: border-box;
    z-index: 1;
    width: 280px;
  }
}
</style>
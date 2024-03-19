<script setup lang="ts">
import {NSpace} from 'naive-ui'
import InfoCard from './components/infoCard/index.vue'
import Card from '~/components/Card/index.vue'
import Cropper from '~/components/Cropper/index.vue'

const tabs = [
  {
    name: '动态',
    id: 1,
  },
  {
    name: '文章',
    id: 2,
  },
  {
    name: '壁纸',
    id: 3,
  },
]
</script>

<template>
  <div class="user-wrapper container w-auto m-auto">

    <div class="user-card">
      <div class="top-img">
        <img class="img" src="@/assets/image/wolp.jpg" alt="">
      </div>
      <div class="user-info">
        <div class="user-avatar">
          <client-only>
            <Cropper>
              <template #avatar>
                <img class="img" src="@/assets/image/wolp.jpg" alt="">
              </template>
            </Cropper>
          </client-only>
        </div>
        <div class="info">
          <span class="user-name">boyyang</span>
          <span class="user-motto">第一行没有你，第二行没有你，第三行没有也罢！</span>
        </div>
        <div class="edit">
          <div class="edit-icon">
            <nuxt-icon class="icon" name="other/create"></nuxt-icon>
            <span class="text">编辑资料</span>
          </div>
        </div>
      </div>
    </div>

    <div class="bottom-card">
      <div class="tab-wrapper">
        <div class="tab-box">
          <n-space>
            <div
                class="tab"
                v-for="item in tabs"
                :key="item.id"
            >
            <span class="name">
            {{ item.name }}
            </span>
              <span class="value">
            10
            </span>
            </div>
          </n-space>
        </div>

        <div class="blogs">
          <Card v-for="item in 5"></Card>
        </div>

      </div>
      <div class="bottom-right">
        <div class="info-card">
          <InfoCard></InfoCard>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
@cardW: 1000px;
@userCardH: 550px;
@topImageH: 420px;
.user-wrapper {
  box-sizing: border-box;
  width: @cardW;

  .user-card {
    box-sizing: border-box;
    width: 100%;
    height: @userCardH;
    background-color: rgb(33, 43, 61);
    margin-top: 25px;
    border-radius: 5px;
    overflow: hidden;
    padding: 10px;

    .top-img {
      box-sizing: border-box;
      width: 100%;
      height: @topImageH;

      .img {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 5px;
        border: 4px solid whitesmoke;
      }
    }

    .user-info {
      box-sizing: border-box;
      width: 100%;
      height: calc(100% - @topImageH);
      position: relative;
      padding: 10px 10px 10px 180px;

      .user-avatar {
        box-sizing: border-box;
        width: 150px;
        height: 150px;
        position: absolute;
        top: -50px;
        left: 20px;
        border-radius: 5px;
        background-color: whitesmoke;
        overflow: hidden;
        border: 4px solid whitesmoke;
        cursor: pointer;

        .img {
          box-sizing: border-box;
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 5px;
        }
      }

      .info {
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        max-width: 350px;

        .user-name {
          color: whitesmoke;
          font-size: 22px;
          font-weight: bolder;
          margin-bottom: 5px;
        }

        .user-motto {
          color: whitesmoke;
          font-size: 15px;
        }
      }

      .edit {
        position: absolute;
        bottom: 0;
        right: 5px;

        .edit-icon {
          display: flex;
          align-items: center;
          cursor: pointer;

          .icon {
            color: whitesmoke;
            font-size: 24px;
          }

          .text {
            color: whitesmoke;
            font-size: 14px;
            font-weight: bold;
          }
        }
      }
    }
  }

  .bottom-card {
    box-sizing: border-box;
    width: 100%;
    min-height: 250px;
    margin-top: 25px;
    display: flex;
    justify-content: space-between;

    .tab-wrapper {
      display: flex;
      width: 680px;
      background-color: rgb(33, 43, 61);
      padding: 10px;
      border-radius: 5px;
      flex-direction: column;

      .tab-box {
        padding: 10px 20px;
        border-bottom: 1px solid rgb(179, 192, 231);

        .tab {

          .name {
            color: whitesmoke;
            font-size: 15px;
            font-weight: bold;
            cursor: pointer;
          }

          .value {
            color: rgb(176, 193, 235);
            font-size: 13px;
            margin: 0 5px;
          }

        }

      }


      .blogs {
        display: flex;
        flex-direction: column;
      }
    }

    .bottom-right {
      box-sizing: border-box;
      border-radius: 5px;
      position: sticky;
      top: 50px;
      width: 310px;
      height: 90px;
      background-color: rgb(33, 43, 61);

    }
  }
}
</style>
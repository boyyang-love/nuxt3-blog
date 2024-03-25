<script setup lang="ts">
import {NSpace, NAvatar} from 'naive-ui'
import {useUserStore} from '@/store/modules/user'
import errImg  from '@/assets/image/avatar_g.jpg'
const userStore = useUserStore()
</script>

<template>
  <div class="index-wrapper ">
    <div class="index-content">
      <div class="left-img">
        <img class="img" src="@/assets/image/wolp.jpg" alt="">
      </div>
      <div class="right-content">
        <div class="user-info">
          <div class="user-avatar">
            <n-avatar
                :size="112"
                :fallback-src="errImg"
                :src="userStore.user_info.avatar"
            ></n-avatar>
          </div>
          <div class="user-name-motto">
            <span class="name">{{userStore.user_info.username}}</span>
            <span class="motto">{{ userStore.user_info.motto}}</span>
          </div>

        </div>
        <div class="menu">
          <n-space>
            <nuxt-link to="/home" class="link">
              <div class="menu-item">
                <nuxt-icon class="icon" name="home/home"></nuxt-icon>
                <span class="text">首页</span>
              </div>
            </nuxt-link>
            <nuxt-link to="/blog" class="link">
              <div class="menu-item">
                <nuxt-icon class="icon" name="home/cube"></nuxt-icon>
                <span class="text">博客</span>
              </div>
            </nuxt-link>
            <nuxt-link to="/wallpaper" class="link">
              <div class="menu-item">
                <nuxt-icon class="icon" name="home/image"></nuxt-icon>
                <span class="text">壁纸</span>
              </div>
            </nuxt-link>
          </n-space>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.index-wrapper {
  box-sizing: border-box;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 9;

  background: linear-gradient(45deg, #f6f7fe, #F0F5F9);
  //background-color: #f6f7fe;


  .index-content {
    box-sizing: border-box;
    width: 870px;
    aspect-ratio: 5/3;
    background-color: #ffffff;
    box-shadow: 0 12px 15px 2px rgb(224 225 255 / 41%);
    border-radius: 10px;
    display: flex;
    overflow: hidden;
    padding: 10px;

    .left-img {
      flex: 1;

      .img {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 10px 0 0 10px;
      }
    }

    .right-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      //position: relative;

      .user-info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .user-avatar {
          box-sizing: border-box;
          width: 120px;
          height: 120px;
          border-radius: 5px;
          border: 4px solid #1E2022;
          overflow: hidden;

          .img {
            box-sizing: border-box;
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }

        .user-name-motto {
          display: flex;
          flex-direction: column;
          justify-content: center;

          .name {
            font-size: 24px;
            color: #1E2022;
            font-weight: bolder;
            text-align: center;
          }

          .motto {
            font-size: 15px;
            color: #a3a5ad;
            text-align: center;
            margin-top: 5px;
          }
        }
      }

      .menu {
        margin-top: 40px;

        .link {
          text-decoration: none;
          color: #0F1C2E;
        }

        .menu-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          text-decoration: none;

          .text {
            font-size: 14px;
            font-weight: bolder;
          }

          .icon {
            font-size: 22px;
          }
        }
      }
    }
  }
}
</style>
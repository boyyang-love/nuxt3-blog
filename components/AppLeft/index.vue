<script setup lang="ts">
import {useRoute, useRouter} from 'vue-router'
import Cropper from '~/components/Cropper/index.vue'

const route = useRoute()
const router = useRouter()

const routeName = ref<string>(route.name as string)

router.beforeEach((to, from, next) => {
  routeName.value = to.name as string
  next()
})

const menus = [
  {
    name: 'home',
    text: '首页',
    path: '/home',
    routeName: 'home',
    icon: 'home/home',
  },
  {
    name: 'blog',
    text: '博客',
    path: '/blog',
    routeName: 'blog',
    icon: 'home/cube',
  },
  {
    name: 'wallpaper',
    text: '壁纸',
    path: '/wallpaper',
    routeName: 'wallpaper',
    icon: 'home/image',
  },
  {
    name: 'create',
    text: '发布文章',
    path: '/create',
    routeName: 'create',
    icon: 'home/create',
  },
  {
    name: 'upload',
    text: '上传壁纸',
    path: '/upload',
    routeName: 'upload',
    icon: 'home/cloud',
  },
]
</script>

<template>
  <div class="app-left">
    <div class="user-info">
      <div class="info">
        <div class="user-avatar">
          <client-only>
            <Cropper>
              <template #avatar>
                <img class="img" src="@/assets/image/wolp.jpg" alt="">
              </template>
            </Cropper>
          </client-only>
        </div>
        <div class="user-name">boyyang</div>
        <div class="user-motto">第一行没有你，第二行没有你，第三行没有也罢</div>
      </div>
    </div>
    <div class="website-info">
      <div class="info-item">
        <nuxt-icon class="icon" name="home/cube"></nuxt-icon>
        <span class="value">100</span>
      </div>
      <div class="info-item">
        <nuxt-icon class="icon" name="home/image"></nuxt-icon>
        <span class="value">100</span>
      </div>
      <div class="info-item">
        <nuxt-icon class="icon" name="header/tag"></nuxt-icon>
        <span class="value">100</span>
      </div>
    </div>
    <div class="line"></div>
    <div class="menu">
      <n-space>
        <div
            v-for="item in menus"
        >
          <nuxt-link :to="item.path" style="text-decoration: none">
            <div :class="['menu-item', item.routeName === routeName ? 'active' : '']">
              <nuxt-icon class="icon" :name="item.icon"></nuxt-icon>
              <div class="text">{{ item.text }}</div>
            </div>
          </nuxt-link>
        </div>
      </n-space>
    </div>


    <div class="beian">
      <span>川公网安备51010602002116号</span>
      <span>蜀ICP备2024050890号-1</span>
    </div>
  </div>
</template>

<style scoped lang="less">
.app-left {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 20px 5px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  .line {
    box-sizing: border-box;
    width: 100%;
    margin: 20px 0;
    height: 2px;
    background-color: rgba(15, 28, 46, 0.4);
  }

  .user-info {
    .info {
      display: flex;
      flex-direction: column;
      align-items: center;

      .user-avatar {
        box-sizing: border-box;
        width: 80px;
        height: 80px;
        border: 3px solid #1f2b3e;
        border-radius: 5px;

        .img {
          box-sizing: border-box;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      .user-name {
        font-size: 20px;
        margin: 5px 0;
        font-weight: bolder;
      }

      .user-motto {
        font-size: 12px;
        font-weight: bold;
        color: rgba(17, 17, 17, 0.8);
        text-align: center;
      }
    }
  }

  .menu {
    box-sizing: border-box;
    width: 100%;
    margin: 20px 0 10px;
    padding: 0 20px;

    .menu-item {
      display: flex;
      align-items: center;
      padding: 10px 0 10px 45px;
      //justify-content: center;
      //padding: 10px 0;
      margin: 5px 0;
      border-radius: 4px;
      color: #0F1C2E;

      &:hover {
        background-color: deeppink;
        color: white;
      }

      .icon {
        font-size: 22px;
      }

      .text {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        font-weight: bolder;
        margin: 0 0 2px 5px;
      }
    }

    .active {
      background-color: #23d69b;
      color: whitesmoke;
    }
  }

  .website-info {
    box-sizing: border-box;
    width: 100%;
    display: flex;
    justify-content: space-around;
    margin-top: 20px;

    .info-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin: 0 10px;

      .icon {
        font-size: 20px;
      }

      .value {
        font-size: 13px;
        font-weight: bold;
      }
    }
  }


  .beian {
    box-sizing: border-box;
    text-align: center;
    position: absolute;
    bottom: 13px;
    font-size: 13px;
    font-weight: bold;
    display: flex;
    flex-direction: column;
  }
}
</style>
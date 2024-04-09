<script setup lang="ts">
import {NSpace, NAvatar, NIcon} from 'naive-ui'
import {useUserStore} from '@/store/modules/user'
import errImg from '@/assets/image/avatar_g.jpg'
import {definePageMeta} from '#imports'
import {Home, Cube, Images} from '@vicons/ionicons5'
import Cat from '@/components/Cat/index.vue'
import {useThemeStore} from '@/store/modules/theme'

const userStore = useUserStore()
const themeStore = useThemeStore()

const menus = computed(() => {
  const token = userStore.token
  if (token) {
    return [
      {
        name: 'home',
        text: '首页',
        path: '/home',
        routeName: 'home',
        icon: Home,
      },
      {
        name: 'blog',
        text: '博客',
        path: '/blog',
        routeName: 'blog',
        icon: Cube,
      },
      {
        name: 'wallpaper',
        text: '壁纸',
        path: '/wallpaper',
        routeName: 'wallpaper',
        icon: Images,
      },
    ]
  }

  return [
    {
      name: 'home',
      text: '首页',
      path: '/home',
      routeName: 'home',
      icon: Home,
    },
    {
      name: 'blog',
      text: '博客',
      path: '/blog',
      routeName: 'blog',
      icon: Cube,
    },
  ]
})

definePageMeta({
  layout: false,
})
</script>

<template>
  <nuxt-layout name="custom">
    <client-only>
      <div class="index-wrapper ">
        <div class="index-content">
          <div class="left-img">
            <n-avatar
                class="img"
                :fallback-src="errImg"
                :src="userStore.user_info.cover"
                object-fit="cover"
                :img-props="{
                  alt: userStore.user_info.cover
                }"
            ></n-avatar>
          </div>
          <div class="right-content">
            <div class="user-info">
              <div class="user-avatar">
                <n-avatar
                    :size="112"
                    :src="userStore.user_info.avatar"
                    :fallback-src="errImg"
                    :img-props="{
                      alt: userStore.user_info.avatar
                    }"
                >
                </n-avatar>
              </div>
              <div class="user-name-motto">
                <span class="name">{{ userStore.user_info.username }}</span>
                <span class="motto">{{ userStore.user_info.motto }}</span>
              </div>

            </div>
            <div class="menu">
              <n-space>
                <nuxt-link :to="item.path" class="link" v-for="item in menus">
                  <div class="menu-item">
                    <n-icon
                        :size="22"
                        class="icon"
                    >
                      <component :is="item.icon"></component>
                    </n-icon>
                    <span class="text">{{ item.text }}</span>
                  </div>
                </nuxt-link>
              </n-space>
            </div>
          </div>
          <div class="cat">
            <Cat></Cat>
          </div>
        </div>
        <div class="theme-circle-wrapper">
          <div
              class="item"
              :style="{'--color': item}"
              @click="themeStore.setTheme(item)"
              v-for="item in themeStore.themeSelectArray"
          ></div>
        </div>
      </div>
    </client-only>
  </nuxt-layout>
</template>

<style scoped lang="less">
.index-wrapper {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  //background: linear-gradient(45deg, #f6f7fe, #F0F5F9);
  background-color: var(--bg-color);

  .index-content {
    box-sizing: border-box;
    width: 870px;
    aspect-ratio: 5/3;
    background-color: var(--card-color);
    box-shadow: 0 12px 15px 2px var(--card-shadow);
    border-radius: 10px;
    display: flex;
    padding: 10px;
    position: relative;

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
          border: 4px solid var(--border-color);
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
            color: var(--font-color);
            font-weight: bolder;
            text-align: center;
          }

          .motto {
            font-size: 15px;
            color: var(--font-color-200);
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
            color: var(--font-color);
          }

          .icon {
            color: var(--font-color);
            font-size: 22px;
          }
        }
      }
    }

    .cat {
      position: absolute;
      bottom: 100%;
      right: 45px;
    }
  }

  .theme-circle-wrapper {
    position: absolute;
    bottom: 10px;
    right: 10px;
    display: flex;
    padding: 2px 5px;
    background-color: rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(5px);
    --webkit-backdrop-filter: blur(5px);
    border-radius: 20px;

    .item {
      box-sizing: border-box;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background-color: var(--color);
      margin: 5px;
      cursor: pointer;
      box-shadow: 1px 1px 3px rgba(0, 0, 0,0.3), -1px -1px 3px rgba(0, 0, 0,0.3);
    }
  }
}

@media screen and (max-width: 1000px) {
  .index-content {
    padding: 0;
    width: 100%;
    height: 100%;
    flex-direction: column;

    .left-img {
      display: none;

      .img {
        border-radius: 10px;
      }
    }

    .right-content {
      position: relative;
    }

    .cat {
      bottom: 0 !important;
      right: 350px !important;
    }

  }

  .index-wrapper {
    .theme-circle-wrapper {
      left: 0;
      bottom: 0;
      width: 100px;
    }
  }
}
</style>
<script setup lang="ts">
import {NSpace, NAvatar, NIcon, NImage} from 'naive-ui'
import {useUserStore} from '@/store/modules/user'
import errImg from '@/assets/image/avatar_g.jpg'
import {definePageMeta} from '#imports'
import {Home, Cube, Images, ChevronUp, ChevronDown} from '@vicons/ionicons5'
import Cat from '@/components/Cat/index.vue'
import {useThemeStore} from '@/store/modules/theme'
import MouseLoading from '@/components/Loadings/MouseLoading/index.vue'
import {addImagePrefix} from '~/utils/addImagePrefix'
import Welcome from '@/components/Welcome/index.vue'


const userStore = useUserStore()
const themeStore = useThemeStore()
const isShowThemeBtn = ref<boolean>(false)

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

onMounted(() => {
  nextTick(() => {
    window.scrollTo(0, 0)
  })
})

</script>

<template>
  <nuxt-layout name="custom">
    <client-only>
      <Welcome>
        <div class="index-wrapper ">
          <div class="index-content">
            <div class="left-img">
              <n-image
                  class="img"
                  :fallback-src="errImg"
                  :src="addImagePrefix(userStore.user_info.cover)"
                  :preview-disabled="true"
                  lazy
                  style="height: 100%;width: 100%;"
                  object-fit="cover"
                  :img-props="{
                  width: '100%',
                  height: '100%'
                }"
              >
                <template #placeholder>
                  <div class="loading">
                    <MouseLoading></MouseLoading>
                  </div>
                </template>
              </n-image>
            </div>
            <div class="right-content">
              <div class="user-info">
                <div class="user-avatar">
                  <n-avatar
                      :size="112"
                      :src="addImagePrefix(userStore.user_info.avatar)"
                      :fallback-src="errImg"
                      :img-props="{
                      alt: userStore.user_info.avatar,
                    }"
                      object-fit="cover"
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
          <div class="theme-circle-wrapper" :style="{'--p': isShowThemeBtn ? '0px' : '-40px'}">
            <div class="icon">
              <n-icon :size="24" @click="isShowThemeBtn = !isShowThemeBtn">
                <component :is="isShowThemeBtn ? ChevronDown : ChevronUp"></component>
              </n-icon>
            </div>
            <div class="circle-wrapper">
              <div
                  class="item"
                  :style="{'--color': item}"
                  @click="themeStore.setTheme(item)"
                  v-for="item in themeStore.themeSelectArray"
              ></div>
            </div>
          </div>
        </div>
      </Welcome>
    </client-only>
  </nuxt-layout>
</template>

<style scoped lang="less">
.index-wrapper {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

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
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      flex: 1;

      .img {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 10px 0 0 10px;

        .loading {
          box-sizing: border-box;
          width: 100%;
          height: 100%;
          justify-content: center;
          align-items: center;
        }
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

          :deep(.n-avatar) {
            border-radius: 0;
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
    transition: all 0.45s linear;
    bottom: var(--p);
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 2px 5px;

    .icon {
      margin: 10px auto;
      cursor: pointer;
      color: var(--font-color);
    }

    .circle-wrapper {
      background-color: #23d69b;
      border-radius: 20px;
      padding: 2px 10px;
      display: flex;

      .item {
        box-sizing: border-box;
        width: 18px;
        height: 18px;
        border-radius: 50%;
        background-color: var(--color);
        margin: 5px;
        cursor: pointer;
        box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3), -1px -1px 3px rgba(0, 0, 0, 0.3);
      }
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
      bottom: 30px !important;
      right: 270px !important;
    }

  }

  .index-wrapper {
    box-sizing: border-box;
    display: flex;
  }
}
</style>
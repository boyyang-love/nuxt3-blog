<script setup lang="ts">
import {NAvatar, NIcon, NImage, NSpace} from 'naive-ui'
import {useUserStore} from '@/store/modules/user'
import errImg from '@/assets/image/avatar.png'
import {definePageMeta} from '#imports'
import {ChevronDown, ChevronUp, Cube, Home, Images} from '@vicons/ionicons5'
import Cat from '@/components/Cat/index.vue'
import {useThemeStore} from '@/store/modules/theme'
import MouseLoading from '@/components/Loadings/MouseLoading/index.vue'
import {addImagePrefix} from '~/utils/addImagePrefix'
import {useRoute} from 'vue-router'
import {loginByQQ} from '@/utils/qqLogin'

const userStore = useUserStore()
const themeStore = useThemeStore()
const route = useRoute()

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

const qqLogin = () => {
  loginByQQ(route)
}

definePageMeta({
  layout: false,
})

useHead( {
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk}  -「boyyang」` : '「boyyang」'
  },
  title: 'boyyang的个人博客网站',
  meta: [
    {
      name: 'description',
      content: '该网站为个人博客网站，网站内容涉及到「前端开发」，「后端开发」，「docker」,「golang」,「go」等互联网领域的一些博客文章。除此以外网站会分享一些「免费」的「4k」「8k」「精美壁纸图片」，更多博客内容可访问「https://www.boyyang.cn」，更多精美壁纸可访问「https://boyyang.cn」'
    },
    {
      name: 'keywords',
      content: '前端开发,后端开发,golang,go,go-zero,docker,javascript,typescripc,css,html,golang学习,go学习,前端开发技巧,后端开发技巧,前端学习,后端学习,壁纸分享,精美壁纸分享'
    }
  ]
})

</script>

<template>
  <nuxt-layout name="custom">
<!--    <Head>-->
<!--      <Title>boyyang的个人博客网站 -「boyyang」</Title>-->
<!--      <Meta name="description"-->
<!--            content="boyyang的个人博客网站,网站记录前端开发，后端开发等互联网技术领域的一些博客小文章，以及免费4k壁纸"></Meta>-->
<!--      <Meta-->
<!--          name="keywords"-->
<!--          content="前端开发,后端开发,golang,javascript,typescripc,css,html,前端开发技巧,后端开发技巧,前端学习,后端学习  - boyyang的个人博客网站`"-->
<!--      ></Meta>-->
<!--    </Head>-->
    <client-only>
      <div class="index-wrapper">
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
            <div class="qq-btn" @click="qqLogin" v-if="!userStore.token">
              <img alt="QQ LOGO" class="logo" src="@/assets/image/qq.svg">
              <span class="text">QQ登录</span>
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
    z-index: 9;

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

    .time {
      position: absolute;
      top: -40%;
      left: 0;
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
    z-index: 11;

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

  .sence {
    box-sizing: border-box;
    width: 100%;
    position: absolute;
    bottom: 0;
  }

  .qq-btn {
    box-sizing: border-box;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 4px solid var(--border-color);
    border-radius: 25px;
    cursor: pointer;
    position: absolute;
    bottom: 10px;
    padding: 20px 10px 20px 5px;
    background: var(--card-bg-color);
    box-shadow: inset 11px 11px 22px var(--card-shadow-before-color),
      inset -11px -11px 22px var(--card-shadow-after-color);

    .logo {
      width: 40px;
    }

    .text {
      color: var(--font-color);
      font-size: 13px;
      font-weight: bolder;
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
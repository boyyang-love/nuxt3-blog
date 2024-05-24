<template>
  <n-config-provider :theme="themeStore.naiveTheme === 'dark' ? darkTheme : lightTheme">
    <n-loading-bar-provider>
      <n-dialog-provider>
        <n-message-provider placement="bottom-right">
          <n-notification-provider>
            <n-modal-provider>
              <client-only>
                <loading-bar-content></loading-bar-content>
                <dialog-content></dialog-content>
                <message-content></message-content>
                <notification-content></notification-content>
                <upload-progress></upload-progress>
                <search-res></search-res>
              </client-only>
              <NuxtLayout>
                <NuxtPage/>
              </NuxtLayout>
            </n-modal-provider>
          </n-notification-provider>
        </n-message-provider>
      </n-dialog-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>
<script lang="ts" setup>
import {
  NConfigProvider,
  lightTheme,
  darkTheme,
  NMessageProvider,
  NDialogProvider,
  NNotificationProvider,
  NLoadingBarProvider,
  NModalProvider,
} from 'naive-ui'
import MessageContent from '@/components/MessageContent/index.vue'
import DialogContent from '@/components/DialogContent/index.vue'
import NotificationContent from '@/components/NotificationContent/index.vue'
import LoadingBarContent from '@/components/LoadingBarContent/index.vue'
import UploadProgress from '@/components/uploadProgress/index.vue'
import SearchRes from '@/components/SearchRes/index.vue'
import {useThemeStore} from '@/store/modules/theme'

const themeStore = useThemeStore()

watch(() => themeStore.theme, (value) => {
  useHead({
    htmlAttrs: {
      'data-theme': value,
    },
  })
})

useHead({
  htmlAttrs: {
    'data-theme': themeStore.theme,
  },
  meta: [
    {
      name: 'apple-mobile-web-app-capable',
      content: 'yes',
    },
    {
      name: 'apple-mobile-web-app-status-bar-style',
      content: 'black-translucent',
    },
    {
      name: 'browsermode',
      content: 'application',
    },
    {
      name: 'x5-page-mode',
      content: 'app',
    },
  ],
})

onMounted(() => {
  let element = document.documentElement
  requestFullScreen(element)

  let isScrolling: NodeJS.Timeout | null = null

  window.onscroll = function () {
    // 清除计时器
    isScrolling && clearTimeout(isScrolling)

    // 设置计时器，在页面停止滚动后250毫秒执行
    isScrolling = setTimeout(function () {
      // 隐藏或显示地址栏
      window.scrollTo(0, 0)
    }, 250)
  }
})

const requestFullScreen = (element: any) => {
  if (element.requestFullScreen) {
    element.requestFullScreen()
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen()
  } else if (element.webkitRequestFullScreen) {
    element.webkitRequestFullScreen()
  }
}
</script>
<style lang="less">
@import "@/font/font.less";
@import "@/theme/dark.less";
@import "@/theme/light.less";
@import "@/theme/gray.less";
@import "@/theme/blue.less";

.page-enter-active,
.page-leave-active {
  transition: all 0.45s linear;
  position: relative;
}

.page-enter-from,
.page-leave-to {
  transform: translateY(-100%);
}

.page-enter-to,
.page-leave-from {
  transform: translateY(0);
}

.layout-enter-active,
.layout-leave-active {
  transition: all 0.4s ease-in-out;
  position: relative;
}

.layout-enter-from,
.layout-leave-to {
  transform: translateY(100%);
}

.layout-enter-to,
.layout-leave-from {
  transform: translateY(0);
}

body {
  ::-webkit-scrollbar {
    width: 0;
    height: 2px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 2px;
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: rgba(56, 74, 82, 0.7);
  }

  margin: 0;
  font-family: AlimamaDaoLiTi, system-ui, DM Sans, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", Segoe UI Symbol, "Noto Color Emoji";
  background-color: var(--bg-color);
  position: relative;
  overflow: hidden;
  padding-bottom: env(safe-area-inset-bottom);
}
</style>
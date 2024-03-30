<template>
  <n-config-provider :theme="lightTheme">
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


useHead({
  script: [
    {
      src: '/js/confetti.min.js',
      defer: true,
      async: true,
    },
  ],
})


onMounted(() => {
  document.addEventListener('click', function (e) {
    window?.confetti({
      origin: {
        x: e.clientX / innerWidth,
        y: e.clientY / innerHeight,
      },
    })
  })
})
</script>
<style lang="less">
//@import "./node_modules/nes.css/css/nes.css";
//@import "@fontsource/press-start-2p";
//@import "@fontsource/press-start-2p/400.css";

@import "@/font/font.less";

.page-enter-active,
.page-leave-active {
  transition: all 0.45s ease-in-out;
}

.page-enter-from,
.page-leave-to {
  //transform: scale(0.5);
  opacity: 0;
}

.page-enter-to,
.page-leave-from {
  //transform: scale(1);
  opacity: 1;
}

body {
  margin: 0;
  font-family: AlimamaDaoLiTi, serif;
  //background-color: #0F1C2E;
  background-color: rgb(242, 240, 254);
}
</style>
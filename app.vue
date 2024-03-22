<template>
  <NuxtLayout>
    <NuxtPage/>
  </NuxtLayout>
</template>
<script lang="ts" setup>
useHead({
  script: [
    {
      src: "/js/confetti.min.js",
    },
  ],
})


onMounted(() => {
  document.addEventListener('click', function (e) {
    (window as any).confetti({
      origin: {
        x: e.clientX / innerWidth,
        y: e.clientY / innerHeight
      }
    })
  })
  // (window as any).confetti()
})

</script>
<style lang="less">
@import "./node_modules/nes.css/css/nes.css";
//@import "@fontsource/press-start-2p";
//@import "@fontsource/press-start-2p/400.css";
@import "@/font/font.less";

.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}

body {
  margin: 0;
  font-family: AlimamaDaoLiTi, serif;
  //background-color: #0F1C2E;
  background-color: rgb(242, 240, 254);
}
</style>
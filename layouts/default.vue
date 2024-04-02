<script setup lang="ts">
import {AppLeft} from '#components'
import {AppRight} from '#components'
import {ContentTop} from '#components'
import {NBackTop} from 'naive-ui'
import {useRouter} from 'vue-router'

const domRef = ref<HTMLElement | null>()

const router = useRouter()
router.beforeEach((to, from, next) => {
  domRef.value?.scrollTo(0,0)
  next()
})
</script>

<template>
  <div class="layout-wrapper container m-auto">
    <div class="left">
      <AppLeft/>
    </div>
    <div class="content" id="content" ref="domRef">
      <n-back-top></n-back-top>
      <div class="content-top">
        <ContentTop></ContentTop>
      </div>
      <slot/>
    </div>
    <div class="right">
      <AppRight/>
    </div>
  </div>
</template>

<style scoped lang="less">
::-webkit-scrollbar {
  width: 0 !important;
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

@w: 260px;
.layout-wrapper {
  box-sizing: border-box;
  display: flex;
  width: 1250px;
  height: 1000px;
  padding: 50px 0;
  background-color: rgb(241, 239, 254);
  margin: 0 auto;

  .left,
  .right {
    box-sizing: border-box;
    background-color: rgb(246, 247, 254);
    width: @w;
    //height: 90vh;
    height: 100%;
    overflow-y: auto;
  }

  .left {
    border-radius: 10px 0 0 0;
  }

  .right {
    border-radius: 0 10px 0 0;
  }

  .content {
    box-sizing: border-box;
    //height: 90vh;
    height: 100%;
    background-color: #ffffff;
    width: calc(100% - (@w * 2));
    overflow-y: auto;
    //position: relative;

    .content-top {
      position: sticky;
      top: 0;
      z-index: 8;
    }
  }
}

@media screen and (max-width: 1200px) {
  .layout-wrapper {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding: 0;
    flex-direction: column;

    .left,
    .right {
      display: none;
    }

    .content {
      width: 100%;
    }
  }
}
</style>
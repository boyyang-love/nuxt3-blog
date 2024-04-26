<script setup lang="ts">
import {AppLeft} from '#components'
import {AppRight} from '#components'
import {ContentTop} from '#components'
import {MoreMenu} from '#components'
import {NBackTop, type BackTopProps} from 'naive-ui'
import {useRouter} from 'vue-router'
import {useBackTopStore} from '@/store/modules/backTop'

const domRef = ref<HTMLElement | null>()
const backTopDomRef = ref<any | null>()

const backTopStore = useBackTopStore()

const router = useRouter()
router.beforeEach((to, from, next) => {
  domRef.value?.scrollTo(0, 0)
  backTopStore.setShow(false)
  next()
})

watch(() => backTopStore.show, (value) => {
  if (!value) {
    backTopDomRef.value?.handleClick()
  }
})

const toTop = (show: boolean) => {
  backTopStore.setShow(show)
}
</script>

<template>
  <div class="layout-wrapper m-auto">
    <div class="container">
      <div class="left">
        <AppLeft/>
      </div>
      <div class="content" id="content" ref="domRef">
        <n-back-top
            style="display: none"
            @update:show="toTop"
            ref="backTopDomRef"
        ></n-back-top>
        <div class="content-top">
          <ContentTop></ContentTop>
        </div>
        <slot/>
      </div>
      <div class="right">
        <AppRight/>
      </div>
      <client-only>
        <div class="more-menu">
          <MoreMenu></MoreMenu>
        </div>
      </client-only>
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
  width: 100vw;
  height: 100vh;
  overflow-y: auto;
}
.container {
  box-sizing: border-box;
  display: flex;
  width: 1250px;
  height: 1000px;
  padding: 50px 0;
  margin:  0 auto;
  position: relative;

  .left,
  .right {
    box-sizing: border-box;
    background-color: var(--content-left-right);
    width: @w;
    height: 100%;
    overflow-y: auto;
  }

  .left {
    border-radius: 10px 0 0 5px;
  }

  .right {
    border-radius: 0 10px 5px 0;
  }

  .content {
    box-sizing: border-box;
    //height: 90vh;
    height: 100%;
    background-color: var(--content-center);
    width: calc(100% - (@w * 2));
    overflow-y: auto;
    transition: all .45s linear;

    .content-top {
      position: sticky;
      top: 0;
      z-index: 8;
    }
  }

  .more-menu {
    position: absolute;
    bottom: 40px;
    right: -50px;
  }
}

@media screen and (max-width: 1200px) {
  .layout-wrapper {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding: 0;
    flex-direction: column;

    .container {
      width: 100%;
      height: 100%;
      padding: 0;
    }

    .left,
    .right {
      display: none;
    }

    .content {
      box-sizing: border-box;
      position: relative;
      width: 100%;
      height: 100vh;

      .content-top {
        position: sticky;
        top: 0;
      }
    }

    .more-menu {
      position: absolute;
      bottom: 30px;
      right: 10px;
    }
  }
}
</style>
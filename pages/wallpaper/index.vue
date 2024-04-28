<script setup lang="ts">
import {NTabs, NTabPane, NBackTop} from 'naive-ui'
import WaterFull from './components/waterFull/index.vue'

type TabValue = 'images' | 'blog' | 'bg' | 'avatar' | 'categories'

const tabValue = ref<TabValue>('images')
const more = ref<boolean>(false)
const col = ref<number>(3)
const wallpaperWrapper = ref<HTMLElement | null>()
const childrenComp = ref()


const isNoMore = (noMore: boolean) => {
  more.value = noMore
}

const tabChange = () => {
  more.value = false
}

const changeCol = () => {
  if (document.body.offsetWidth < 700) {
    col.value = 2
  } else {
    col.value = 3
  }

  childrenComp.value && childrenComp.value.getWrapperBox()
}

onMounted(() => {
  nextTick(() => {
    changeCol()
  })
  let t: NodeJS.Timeout | null = null
  window.addEventListener('resize', () => {
    if (t) clearTimeout(t)
    t = setTimeout(() => {
      changeCol()
    }, 500)
  })
})

onUnmounted(() => {
  document.removeEventListener('resize', () => null)
})

</script>

<template>
  <client-only>
    <div
        class="wallpaper-wrapper"
        id="wallpaper-wrapper"
        ref="wallpaperWrapper"
    >
      <div class="tab-wrapper">
        <n-tabs
            type="line"
            default-value="images"
            v-model:value="tabValue"
            @update:value="tabChange"
        >
          <n-tab-pane tab="壁纸" name="images"></n-tab-pane>
          <n-tab-pane tab="博客" name="blog"></n-tab-pane>
          <n-tab-pane tab="背景" name="bg"></n-tab-pane>
          <n-tab-pane tab="头像" name="avatar"></n-tab-pane>
          <n-tab-pane tab="分类" name="categories"></n-tab-pane>
        </n-tabs>
      </div>
      <div class="water">
        <WaterFull
            ref="childrenComp"
            :col="col"
            :type="tabValue"
            @isNoMore="isNoMore"
        ></WaterFull>
      </div>
      <div class="no-more" v-if="more">没有更多了</div>
    </div>
  </client-only>
</template>

<style scoped lang="less">
.wallpaper-wrapper {
  box-sizing: border-box;
  width: 100%;
  height: calc(100% - 50px);
  overflow: hidden;
  position: relative;

  .tab-wrapper {
    position: sticky;
    background-color: var(--center-top-bg);
    top: 0;
    padding: 0 20px;
    z-index: 9;
  }


  .water {
    box-sizing: border-box;
    width: 100%;
    height: calc(100% - 100px);
    overflow: hidden;
    padding: 10px;
  }

  .no-more {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 10px;
    color: var(--font-color);
    font-size: 13px;
  }
}
</style>
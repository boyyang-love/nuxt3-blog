<script setup lang="ts">
import {markRaw} from 'vue'
import {useBackTopStore} from '@/store/modules/backTop'
import {NIcon} from 'naive-ui'
import {Pricetag, FolderOpen, ArrowUp, Link, Close} from '@vicons/ionicons5'
import {useRouter} from 'vue-router'
import {useUserStore} from '@/store/modules/user'

const backTopStore = useBackTopStore()
const router = useRouter()
const userStore = useUserStore()

const moreMenus = computed(() => {
  const show = backTopStore.show
  const showClose = backTopStore.showClose
  return [
    {
      id: 1,
      text: '标签',
      icon: markRaw(Pricetag),
      show: userStore.token,
    },
    {
      id: 2,
      text: '分类',
      icon: markRaw(FolderOpen),
      show: userStore.token,
    },
    {
      id: 3,
      text: '友链',
      icon: markRaw(Link),
      show: true,
    },
    {
      id: 4,
      text: 'close',
      icon: markRaw(Close),
      show: showClose,
    },
    {
      id: 5,
      text: 'top',
      icon: markRaw(ArrowUp),
      show: show,
    },

  ].filter(m => m.show)
})

const menuItemClick = (id: number) => {
  if (id === 1) {
    router.push('/tags')
  }
  if (id === 2) {
    router.push('/categories')
  }
  if (id === 3) {
    router.push('/links')
    // window.open(`${window.location.host}/links`, '_blank')
  }
  if (id === 4) {
    backTopStore.setShowClose(false)
    router.back()
  }
  if (id === 5) {
    backTopStore.setShow(false)
  }
}
</script>

<template>
  <div class="menu-wrapper">
    <transition-group name="list" tag="div">
      <div
          class="menu-item"
          v-for="item in moreMenus"
          @click="menuItemClick(item.id)"
          :key="item.id"
      >
        <n-icon
            :size="20"
        >
          <component :is="item.icon"></component>
        </n-icon>
      </div>
    </transition-group>
  </div>
</template>

<style scoped lang="less">
.menu-wrapper {
  .menu-item {
    box-sizing: border-box;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    margin: 10px 0;
    cursor: pointer;
    border: 2px solid var(--border-color);
    color: var(--font-color);
    background: var(--button-color);
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
    //box-shadow: 2px 2px 3px var(--button-shadow-one),
    //  -2px -2px 3px var(--button-shadow-two);
  }
}

.list-move, /* 对移动中的元素应用的过渡 */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

/* 确保将离开的元素从布局流中删除
  以便能够正确地计算移动的动画。 */
.list-leave-active {
  position: absolute;
}
</style>
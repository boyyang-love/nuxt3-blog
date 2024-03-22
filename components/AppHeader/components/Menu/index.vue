<script setup lang="ts">
import {useRoute, useRouter} from 'vue-router'

const route = useRoute()
const router = useRouter()

const routeName = ref<string>(route.name as string)

router.beforeEach((to, from, next) => {
  routeName.value = to.name as string
  next()
})


console.log(route.name)
const menus = [
  {
    name: 'home',
    text: '首页',
    path: '/',
    routeName: 'index',
  },
  {
    name: 'blog',
    text: '博客',
    path: '/blog',
    routeName: 'blog',
  },
  // {
  //   name: 'tags',
  //   text: '博客标签',
  //   path: '/tags',
  // },
  // {
  //   name: 'message board',
  //   text: '留言板',
  //   path: '/messageBoard',
  // },
  // {
  //   name: 'wallpaper',
  //   text: '个人壁纸分享',
  //   path: '/wallpaper',
  // },
]
</script>

<template>
  <div class="menu-wrapper">
    <div
        :class="['menu-item', routeName === item.routeName ? 'active' : '']"
        v-for="item in menus"
        :key="item.name"
    >
      <span class="text">
        <nuxt-link :to="item.path">
        {{ item.text }}
        </nuxt-link>
      </span>
    </div>
  </div>
</template>

<style scoped lang="less">
.menu-wrapper {
  box-sizing: border-box;
  display: flex;
  border-radius: 5px;

  .menu-item {
    box-sizing: border-box;
    margin: 0 12px;
    display: flex;
    align-items: center;

    .text {
      font-size: 13px;
      font-weight: bolder;
      color: whitesmoke;
      cursor: pointer;
      text-shadow: 5px 5px 10px rgba(17, 17, 17, 1);
    }

    transition: all 0.4s linear;
  }

  .active {
    box-sizing: border-box;
    background-color: deeppink;
    border-radius: 20px 15px 20px 30px;
    padding: 1px 5px;
    position: relative;
    filter: contrast(10);

    &::before {
      content: "";
      position: absolute;
      bottom: -5px;
      left: 0;
      width: 70%;
      height: 5px;
      background-color: deeppink;
      border-radius: 2px;
      filter: blur(1px);
    }
  }
}

</style>
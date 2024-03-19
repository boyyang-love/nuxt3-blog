<script setup lang="ts">
const menus = [
  {
    name: 'home',
    text: '首页',
    path: '/',
  },
  {
    name: 'blog',
    text: '博客列表',
    path: '/blog',
  },
  {
    name: 'tags',
    text: '博客标签',
    path: '/tags',
  },
  {
    name: 'message board',
    text: '留言板',
    path: '/messageBoard',
  },
  {
    name: 'wallpaper',
    text: '个人壁纸分享',
    path: '/wallpaper',
  },
]
</script>

<template>
  <div class="menu-wrapper">
    <div
        class="menu-item"
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

  .menu-item {
    box-sizing: border-box;
    margin: 0 32px;

    .text {
      font-size: 13px;
      font-weight: bolder;
      color: whitesmoke;
      cursor: pointer;
      text-shadow: 4px 4px 4px rgba(17, 17, 17, 0.4);
    }
  }
}

</style>
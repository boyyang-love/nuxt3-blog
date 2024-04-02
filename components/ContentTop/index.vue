<script setup lang="ts">
import {NInput, NIcon, NDropdown} from 'naive-ui'
import {
  Menu,
  Search,
  FingerPrint,
  Rocket,
  Exit,
  Planet,
  Home,
  Cube,
  Images,
  Create,
  CloudUpload,
  FingerPrintSharp,
} from '@vicons/ionicons5'
import {renderIcon} from '@/utils/renderIcon'
import {useRouter} from 'vue-router'
import {useUserStore} from '@/store/modules/user'

const router = useRouter()
const userStore = useUserStore()

const options = computed(() => {
  if (userStore.token) {
    return [
      {
        label: '信息',
        key: 1,
        icon: renderIcon(FingerPrint),
      },
      {
        label: '登录',
        key: 2,
        icon: renderIcon(Planet),
      },
      {
        label: '注册',
        key: 3,
        icon: renderIcon(Rocket),
      },
      {
        label: '首页',
        key: 4,
        icon: renderIcon(Home),
      },
      {
        label: '博客',
        key: 5,
        icon: renderIcon(Cube),
      },
      {
        label: '图片资源',
        key: 6,
        icon: renderIcon(Images),
      },
      {
        label: '发布文章',
        key: 7,
        icon: renderIcon(Create),
      },
      {
        label: '上传壁纸',
        key: 8,
        icon: renderIcon(CloudUpload),
      },
      {
        label: '个人卡片',
        key: 9,
        icon: renderIcon(FingerPrintSharp),
      },
      {
        label: '退出',
        key: 10,
        icon: renderIcon(Exit),
      },
    ]
  } else {
    return [
      {
        label: '登录',
        key: 2,
        icon: renderIcon(Planet),
      },
      {
        label: '注册',
        key: 3,
        icon: renderIcon(Rocket),
      },
      {
        label: '首页',
        key: 4,
        icon: renderIcon(Home),
      },
      {
        label: '博客',
        key: 5,
        icon: renderIcon(Cube),
      },
      {
        label: '个人卡片',
        key: 9,
        icon: renderIcon(FingerPrintSharp),
      },
    ]
  }

})
const handleSelect = (key: string | number) => {
  if (key === 1) {
    userStore.showUserInfoModal = true
    return
  }
  if (key === 2) {
    userStore.isSignin = true
    userStore.showSigninModal = true
  }
  if (key === 3) {
    userStore.isSignin = false
    userStore.showSigninModal = true
  }
  if (key === 4) {
    router.push('/home')
  }
  if (key === 5) {
    router.push('/blog')
  }
  if (key === 6) {
    router.push('/wallpaper')
  }
  if (key === 7) {
    router.push('/create')
  }
  if (key === 8) {
    router.push('/upload')
  }
  if (key === 9) {
    router.push('/')
  }
  if (key === 10) {
    window.localStorage.clear()
    router.replace('/').then(() => {
      location.reload()
    })
    return
  }
}
</script>

<template>
  <div class="content-top">
    <div class="search-input">
      <n-icon size="20" class="icon">
        <Search></Search>
      </n-icon>
    </div>
    <div class="menu">
      <n-dropdown
          trigger="hover"
          placement="bottom-end"
          :options="options"
          @select="handleSelect"
      >
        <n-icon size="24" class="icon">
          <Menu></Menu>
        </n-icon>
      </n-dropdown>
    </div>
  </div>
</template>

<style scoped lang="less">
.content-top {
  box-sizing: border-box;
  padding: 5px 20px;
  width: 100%;
  height: 50px;
  background-color: rgb(245 246 255 / 80%);
  display: flex;
  align-items: center;
  justify-content: space-between;

  .search-input,
  .menu {
    display: flex;
    align-items: center;

    .icon {
      font-weight: bold;
      cursor: pointer;
    }
  }

}
</style>
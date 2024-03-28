<script setup lang="ts">
import {NInput, NIcon, NDropdown} from 'naive-ui'
import {Menu, Search, FingerPrint, Rocket, Exit} from '@vicons/ionicons5'
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
        label: '注册',
        key: 2,
        icon: renderIcon(Rocket),
      },
      {
        label: '退出',
        key: 3,
        icon: renderIcon(Exit),
      },
    ]
  } else {
    return [
      {
        label: '注册',
        key: 2,
        icon: renderIcon(Rocket),
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
    userStore.isSignin = false
    userStore.showSigninModal = true
  }
  if (key === 3) {
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
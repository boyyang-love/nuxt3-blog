<script setup lang="ts">
import {NInput, NIcon, NDropdown, NSpace} from 'naive-ui'
import {
  Menu,
  Search,
  FingerPrint,
  Rocket,
  Exit,
  Planet,
  Home,
  Cube,
  Image,
  Images,
  Create,
  CloudUpload,
  Information,
  List,
  Card,
  Key,
} from '@vicons/ionicons5'
import {renderIcon} from '@/utils/renderIcon'
import {useRouter} from 'vue-router'
import {useUserStore} from '@/store/modules/user'
import {updateUserPassword} from '@/api/user'

const router = useRouter()
const userStore = useUserStore()

const options = computed(() => {
  if (userStore.token) {
    return [
      {
        label: '首页',
        key: 4,
        icon: renderIcon(Home),
      },
      {
        label: '账号',
        key: 'message',
        icon: renderIcon(FingerPrint),
        children: [
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
            label: '信息',
            key: 1,
            icon: renderIcon(Information),
          },
          {
            label: '卡片',
            key: 9,
            icon: renderIcon(Card),
          },
          {
            label: '密码',
            key: 11,
            icon: renderIcon(Key),
          },
        ],
      },
      {
        label: '博客',
        icon: renderIcon(Cube),
        key: 'blog',
        children: [
          {
            label: '博客列表',
            key: 5,
            icon: renderIcon(List),
          },
          {
            label: '发布博客',
            key: 7,
            icon: renderIcon(Create),
          },
        ],
      },
      {
        label: '图片',
        key: 'images',
        icon: renderIcon(Image),
        children: [
          {
            label: '图片列表',
            key: 6,
            icon: renderIcon(Images),
          },
          {
            label: '上传图片',
            key: 8,
            icon: renderIcon(CloudUpload),
          },
        ],
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
        label: '首页',
        key: 4,
        icon: renderIcon(Home),
      },
      {
        label: '账号',
        key: 'message',
        icon: renderIcon(FingerPrint),
        children: [
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
        ],
      },
      {
        label: '博客',
        key: 5,
        icon: renderIcon(Cube),
      },
      {
        label: '卡片',
        key: 9,
        icon: renderIcon(Card),
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

  if (key === 11) {
    let password = ''
    let repassword = ''
    window.$dialog.create({
      title: '密码修改',
      type: 'info',
      showIcon: true,
      positiveText: '提交修改',
      negativeText: '取消',
      content: () => h(NSpace, {vertical: true, size: 'large'}, () => [
        h(NInput, {
          placeholder: '请输入密码',
          type: 'password',
          showPasswordOn: 'click',
          onChange: (e) => {
            console.log(e)
            password = e
          },
        }, () => []),
        h(NInput, {
          placeholder: '请输入重复密码',
          type: 'password',
          showPasswordToggle: true,
          onChange: (e) => {
            console.log(e)
            repassword = e
          },
        }, () => []),
      ]),
      onPositiveClick: () => {
        if (password.trim() === '' || repassword.trim() === '') {
          window.$message.warning('密码不能为空')
          return false
        }
        if (password !== repassword) {
          window.$message.error('密码不一致')
          return false
        }

        window.$uploadProgress.begin()
        updateUserPassword({password: password}).then(() => {
          window.$uploadProgress.end()
          window.$message.success('密码修改成功')
        }).catch(() => {
          window.$uploadProgress.end()
        })
      },
    })
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
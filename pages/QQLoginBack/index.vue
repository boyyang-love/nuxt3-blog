<script lang="ts" setup>
import {useRoute, useRouter} from 'vue-router'
import {useUserStore} from '@/store/modules/user'
import {signInByQQ} from '@/api/signinup'
import LoginLoading from '@/components/loginLoading/index.vue'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

// 通知父页面
const notifyParent = (type: string) => {
  if (window.opener) {
    window.opener.postMessage({ type }, window.location.origin)
  }
}

const getCode = () => {
  const {code, state} = route.query

  if (!code) {
    window.$message.error('QQ登录失败：未获取到授权码')
    notifyParent('qq-login-cancel')
    setTimeout(() => window.close(), 1500)
    return
  }

  if (state !== window.sessionStorage.getItem('state')) {
    window.$message.error('QQ登录失败：状态验证不通过')
    notifyParent('qq-login-cancel')
    setTimeout(() => window.close(), 1500)
    return
  }

  signInByQQ({code: code as string})
    .then((res) => {
      if (res.code === 1) {
        userStore.setUserInfo(res.data.user_info)
        userStore.setToken(res.data.token)
        window.$message.success('QQ登录成功')
        // 通知父页面登录成功
        notifyParent('qq-login-success')
        setTimeout(() => window.close(), 1000)
      }
    })
    .catch((err) => {
      console.error('QQ登录失败:', err)
      window.$message.error('QQ登录失败，请重试')
      notifyParent('qq-login-cancel')
      setTimeout(() => window.close(), 1500)
    })
}

onMounted(() => {
  getCode()
})

definePageMeta({
  layout: false,
})

</script>

<template>
  <Head>
    <Title>免费4k壁纸-精美壁纸-4k电脑壁纸-手机壁纸-Mac壁纸-Windows壁纸「壁纸收藏家」</Title>
    <Meta
        content="免费4k壁纸-精美壁纸-4k电脑壁纸-手机壁纸-Mac壁纸-Windows壁纸-唯美壁纸「壁纸收藏家」"
        name="description"
    ></Meta>

    <Meta
        content="壁纸,壁纸网站,电脑壁纸,4k,8k,12k,mac壁纸,免费壁纸,手机壁纸,桌面壁纸,4k壁纸,8k壁纸,wallpaper,壁纸素材,精美壁纸,唯美壁纸,壁纸收藏家"
        name="keywords"
    >
    </Meta>
  </Head>
  <div class="login-page">
    <LoginLoading></LoginLoading>
  </div>
</template>

<style lang="less" scoped>
.login-page {
  box-sizing: border-box;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

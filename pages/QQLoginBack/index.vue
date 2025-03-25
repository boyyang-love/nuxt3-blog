<script lang="ts" setup>
import {useRoute, useRouter} from 'vue-router'
import {useUserStore} from '@/store/modules/user'
import {signInByQQ} from '@/api/signinup'
import LoginLoading from '@/components/loginLoading/index.vue'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const getCode = () => {
  const {code, state} = route.query

  if (state === window.sessionStorage.getItem('state')) {
    signInByQQ({code: code as string}).then((res) => {
      if (res.code === 1) {
        userStore.setUserInfo(res.data.user_info)
        userStore.setToken(res.data.token)
        const routeParam = JSON.parse(state as string)

        router.replace({path: routeParam.path, query: routeParam.query})
      }
    })
  }
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
<script setup lang="ts">
import {NModal, NInput, NSpace, NButton, NAvatar} from 'naive-ui'
import {useRoute, useRouter} from 'vue-router'
import Cropper from '~/components/Cropper/index.vue'
import {useSigninup} from '@/hooks/signinup'
import {uploadFile} from '@/api/upload'
import {updateUserInfo} from '@/api/user'
import {useUserStore} from '@/store/modules/user'
import {env} from '@/utils/env'
import errImg  from '@/assets/image/avatar_g.jpg'

const route = useRoute()
const router = useRouter()
const {data, signinSub} = useSigninup()
const userStore = useUserStore()

const routeName = ref<string>(route.name as string)

router.beforeEach((to, from, next) => {
  routeName.value = to.name as string
  next()
})

const menus = [
  {
    name: 'home',
    text: '首页',
    path: '/home',
    routeName: 'home',
    icon: 'home/home',
  },
  {
    name: 'blog',
    text: '博客',
    path: '/blog',
    routeName: 'blog',
    icon: 'home/cube',
  },
  {
    name: 'wallpaper',
    text: '壁纸',
    path: '/wallpaper',
    routeName: 'wallpaper',
    icon: 'home/image',
  },
  {
    name: 'create',
    text: '发布文章',
    path: '/create',
    routeName: 'create',
    icon: 'home/create',
  },
  {
    name: 'upload',
    text: '上传壁纸',
    path: '/upload',
    routeName: 'upload',
    icon: 'home/cloud',
  },
  {
    name: 'upload',
    text: '个人卡片',
    path: '/',
    routeName: '/',
    icon: 'home/finger',
  },
]

const submit = (info: { file: File, Bolb: Blob }) => {
  console.log(info)
  uploadFile(
      {
        file_name: info.file.name,
        file: info.file,
        dir: 'avatar',
      }).then((resFile) => {
    updateUserInfo({
      avatar: resFile.data.path,
      id: userStore.user_info.id,
    }).then((resUser) => {
      userStore.$patch({
        user_info: {
          avatar: `${env.VITE_APP_IMG_URL}${resFile.data.path}`,
        },
      })
      window.$message.success(resUser.data.message)
    })
  })
}

</script>

<template>
  <div class="app-left">
    <div class="signinup">
      <nuxt-icon
          class="icon"
          name="home/paperPlane"
          @click="data.isShow = true"
      ></nuxt-icon>
    </div>
    <div class="user-info">
      <div class="info">
        <div class="user-avatar">
          <client-only>
            <Cropper @submit="submit">
              <template #avatar>
                <n-avatar
                    :size="74"
                    :src="userStore.user_info.avatar"
                    :fallback-src="errImg"
                ></n-avatar>
              </template>
            </Cropper>
          </client-only>
        </div>
        <div class="user-name">boyyang</div>
        <div class="user-motto">第一行没有你，第二行没有你，第三行没有也罢</div>
      </div>
    </div>
    <!--    <div class="website-info">-->
    <!--      <div class="info-item">-->
    <!--        <nuxt-icon class="icon" name="home/cube"></nuxt-icon>-->
    <!--        <span class="value">100</span>-->
    <!--      </div>-->
    <!--      <div class="info-item">-->
    <!--        <nuxt-icon class="icon" name="home/image"></nuxt-icon>-->
    <!--        <span class="value">100</span>-->
    <!--      </div>-->
    <!--      <div class="info-item">-->
    <!--        <nuxt-icon class="icon" name="header/tag"></nuxt-icon>-->
    <!--        <span class="value">100</span>-->
    <!--      </div>-->
    <!--    </div>-->
    <div class="menu">
      <div
          v-for="item in menus"
      >
        <nuxt-link :to="item.path" style="text-decoration: none">
          <div :class="['menu-item', item.routeName === routeName ? 'active' : '']">
            <nuxt-icon class="icon" :name="item.icon"></nuxt-icon>
            <div class="text">{{ item.text }}</div>
          </div>
        </nuxt-link>
      </div>
    </div>

    <div class="beian">
      <span>川公网安备51010602002116号</span>
      <span>蜀ICP备2024050890号-1</span>
    </div>

    <n-modal
        v-model:show="data.isShow"
        :mask-closable="false"
    >
      <div class="modal-wrapper">
        <div class="close">
          <nuxt-icon
              class="icon"
              name="other/close"
              @click="data.isShow = false"
          ></nuxt-icon>
        </div>
        <div class="title">登录</div>
        <div class="user-input">
          <n-space vertical size="large">
            <div class="user-name">
              <n-input
                  placeholder="请输入用户名"
                  type="text"
                  v-model:value="data.username"
              ></n-input>
            </div>
            <div class="password">
              <n-input
                  placeholder="请输入密码"
                  type="password"
                  show-password-on="click"
                  v-model:value="data.password"
              ></n-input>
            </div>
          </n-space>
        </div>
        <div class="submit-btn">
          <n-button type="success" @click="signinSub">登录</n-button>
        </div>
      </div>
    </n-modal>
  </div>
</template>

<style scoped lang="less">
.app-left {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 20px 5px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  .signinup {
    position: absolute;
    left: 10px;
    top: 10px;

    .icon {
      color: deeppink;
      font-size: 20px;
      cursor: pointer;
    }
  }

  .line {
    box-sizing: border-box;
    width: 100%;
    margin: 20px 0;
    height: 2px;
    background-color: rgba(15, 28, 46, 0.4);
  }

  .user-info {
    .info {
      display: flex;
      flex-direction: column;
      align-items: center;

      .user-avatar {
        box-sizing: border-box;
        width: 80px;
        height: 80px;
        border: 3px solid #1f2b3e;
        border-radius: 5px;

        .img {
          box-sizing: border-box;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      .user-name {
        font-size: 20px;
        margin: 5px 0;
        font-weight: bolder;
      }

      .user-motto {
        font-size: 12px;
        font-weight: bold;
        color: rgba(17, 17, 17, 0.8);
        text-align: center;
      }
    }
  }

  .menu {
    box-sizing: border-box;
    width: 100%;
    margin: 20px 0 10px;
    padding: 0 20px;

    .menu-item {
      display: flex;
      align-items: center;
      padding: 10px 0 10px 45px;
      //justify-content: center;
      //padding: 10px 0;
      margin: 5px 0;
      border-radius: 4px;
      color: #0F1C2E;

      &:hover {
        background-color: deeppink;
        color: white;
      }

      .icon {
        font-size: 22px;
      }

      .text {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        font-weight: bolder;
        margin: 0 0 2px 5px;
      }
    }

    .active {
      background-color: #23d69b;
      color: whitesmoke;
    }
  }

  .website-info {
    box-sizing: border-box;
    width: 100%;
    display: flex;
    justify-content: space-around;
    margin-top: 20px;

    .info-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin: 0 10px;

      .icon {
        font-size: 20px;
      }

      .value {
        font-size: 13px;
        font-weight: bold;
      }
    }
  }


  .beian {
    box-sizing: border-box;
    text-align: center;
    position: absolute;
    bottom: 13px;
    font-size: 13px;
    font-weight: bold;
    display: flex;
    flex-direction: column;
  }
}

.modal-wrapper {
  box-sizing: border-box;
  width: 400px;
  height: 220px;
  background-color: rgb(246, 247, 253);
  border-radius: 5px;
  padding: 10px 50px;
  position: relative;
  box-shadow: 3px 3px 5px rgba(17, 17, 17, 0.4);

  .close {
    position: absolute;
    top: 5px;
    right: 5px;
    transition: all 0.35s ease-in-out;

    .icon {
      font-size: 20px;
      font-weight: bold;
    }

    &:hover {
      transform: rotate(90deg);
    }
  }

  .title {
    box-sizing: border-box;
    width: 100%;
    text-align: center;
    font-size: 18px;
    font-weight: bold;
  }

  .user-input {
    margin: 20px 0;
  }

  .submit-btn {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
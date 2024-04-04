<script setup lang="ts">
import {
  NModal,
  NInput,
  NSpace,
  NButton,
  NAvatar,
  NForm,
  NFormItem,
  NIcon,
  type FormRules,
  type FormInst,
} from 'naive-ui'
import {Home, Cube, FingerPrint, Create, Images, CloudUpload, Planet, Close} from '@vicons/ionicons5'
import {useRoute, useRouter} from 'vue-router'
import Cropper from '~/components/Cropper/index.vue'
import {useSigninup} from '@/hooks/signinup'
import {uploadFile} from '@/api/upload'
import {updateUserInfo} from '@/api/user'
import {useUserStore} from '@/store/modules/user'
import {env} from '@/utils/env'
import errImg from '@/assets/image/avatar_g.jpg'

const route = useRoute()
const router = useRouter()
const {data, signinupSub, sendEmailCode} = useSigninup()
const userStore = useUserStore()

const formValues = reactive({
  username: userStore.user_info.username,
  motto: userStore.user_info.motto,
  email: userStore.user_info.email,
  git_hub: userStore.user_info.git_hub,
  qq: String(userStore.user_info.qq),
  wechat: userStore.user_info.wechat,
})

watch(() => userStore.showUserInfoModal, (value) => {
  if (value) {
    formValues.username = userStore.user_info.username
    formValues.motto = userStore.user_info.motto
    formValues.email = userStore.user_info.email
    formValues.git_hub = userStore.user_info.git_hub
    formValues.qq = String(userStore.user_info.qq)
    formValues.wechat = userStore.user_info.wechat
  }
})

const userInfoEditRef = ref<FormInst | null>()

const routeName = ref<string>(route.name as string)

router.beforeEach((to, from, next) => {
  routeName.value = to.name as string
  next()
})

const menus = computed(() => {
  const token = userStore.token
  if (token) {
    return [
      {
        name: 'home',
        text: '首页',
        path: '/home',
        routeName: 'home',
        icon: Home,
      },
      {
        name: 'blog',
        text: '博客',
        path: '/blog',
        routeName: 'blog',
        icon: Cube,
      },
      {
        name: 'wallpaper',
        text: '图片',
        path: '/wallpaper',
        routeName: 'wallpaper',
        icon: Images,
      },
      {
        name: 'create',
        text: '发布博客',
        path: '/create',
        routeName: 'create',
        icon: Create,
      },
      {
        name: 'upload',
        text: '上传图片',
        path: '/upload',
        routeName: 'upload',
        icon: CloudUpload,
      },
      {
        name: 'upload',
        text: '个人卡片',
        path: '/',
        routeName: '/',
        icon: FingerPrint,
      },
    ]
  }
  return [
    {
      name: 'home',
      text: '首页',
      path: '/home',
      routeName: 'home',
      icon: Home,
    },
    {
      name: 'blog',
      text: '博客',
      path: '/blog',
      routeName: 'blog',
      icon: Cube,
    },
    {
      name: 'upload',
      text: '个人卡片',
      path: '/',
      routeName: '/',
      icon: FingerPrint,
    },
  ]
})

const rules = {
  username: {
    required: true,
    message: '用户名称不能为空',
    trigger: 'blur',
  },

  motto: {
    required: true,
    message: '请输入签名',
    trigger: 'blur',
  },

} as FormRules

const submit = (info: { file: File, Bolb: Blob }) => {
  window.$uploadProgress.begin()
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
      window.$uploadProgress.end()
    })
  })
}

const updateUserInfoSub = () => {
  userInfoEditRef.value?.validate((errors) => {
    if (!errors) {
      window.$uploadProgress.begin()
      updateUserInfo({
        username: formValues.username,
        motto: formValues.motto,
        git_hub: formValues.git_hub,
        qq: Number(formValues.qq),
        wechat: formValues.wechat,
      }).then(() => {
        userStore.$patch({
          user_info: {
            username: formValues.username,
            motto: formValues.motto,
            git_hub: formValues.git_hub,
            wechat: formValues.wechat,
            qq: Number(formValues.qq),
          },
          showUserInfoModal: false,
        })
        window.$message.success('信息更改成功')
        window.$uploadProgress.end()
      }).catch(err => {
        window.$message.error(err.msg)
        window.$uploadProgress.end()
      })
    }
  })
}

const openUpdateUserInfoModal = () => {
  if (userStore.token) {
    userStore.showUserInfoModal = true
  }
}

const openSignModal = () => {
  userStore.showSigninModal = true
  userStore.isSignin = true
}

</script>

<template>
  <client-only>
    <div class="app-left">
      <div class="signinup">
        <n-icon
            class="icon"
            @click="openSignModal"
        >
          <Planet></Planet>
        </n-icon>
      </div>
      <div class="user-info">
        <div class="info">
          <div class="user-avatar">
            <client-only>
              <n-avatar
                  :size="74"
                  :src="userStore.user_info.avatar"
                  :fallback-src="errImg"
                  v-if="!userStore.token"
              ></n-avatar>
              <Cropper @submit="submit" v-else>
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
          <div class="user-name" @click="openUpdateUserInfoModal">{{ userStore.user_info.username }}</div>
          <div class="user-motto">{{ userStore.user_info.motto }}</div>
        </div>
      </div>
      <div class="menu">
        <div
            v-for="item in menus"
        >
          <nuxt-link
              :to="item.path"
              style="text-decoration: none"
          >
            <div
                :class="['menu-item button', item.routeName === routeName ? 'active' : '']"
            >
              <n-icon class="icon">
                <component :is="item.icon"></component>
              </n-icon>
              <!--            <nuxt-icon class="icon" :name="item.icon"></nuxt-icon>-->
              <div class="text">{{ item.text }}</div>
            </div>
          </nuxt-link>
        </div>
      </div>

      <div class="beian">
        <a href="https://beian.mps.gov.cn/#/query/webSearch?recordcode=51010602002116" target="_blank">川公网安备51010602002116号</a>
        <a href="https://beian.miit.gov.cn/" target="_blank">蜀ICP备2024050890号-1</a>
      </div>

      <n-modal
          v-model:show="userStore.showSigninModal"
          :mask-closable="false"
      >
        <div class="modal-wrapper">
          <div class="close">
            <n-icon
                class="icon"
                name="other/close"
                @click="userStore.showSigninModal = false"
            >
              <Close></Close>
            </n-icon>
          </div>
          <div class="title">{{ userStore.isSignin ? '登录' : '注册' }}</div>
          <div class="user-input">
            <n-space vertical size="large">
              <div class="user-name">
                <n-input
                    placeholder="请输入用户名"
                    type="text"
                    v-model:value="data.username"
                ></n-input>
              </div>
              <div class="user-name" v-if="!userStore.isSignin">
                <n-input
                    placeholder="请输入邮箱"
                    type="text"
                    v-model:value="data.email"
                ></n-input>
              </div>
              <div class="email-code" v-if="!userStore.isSignin">
                <n-space justify="space-between">
                  <n-input
                      placeholder="验证码"
                      v-model:value="data.code"
                  ></n-input>
                  <n-button
                      type="error"
                      size="medium"
                      @Click="sendEmailCode"
                      :disabled="data.emailSendDisable"
                  >验证码 {{ data.emailSendDisable ? `${data.emailSendDisableTime}s` : '' }}
                  </n-button>
                </n-space>
              </div>
              <div class="password">
                <n-input
                    placeholder="请输入密码"
                    type="password"
                    show-password-on="click"
                    v-model:value="data.password"
                ></n-input>
              </div>
              <div class="password" v-if="!userStore.isSignin">
                <n-input
                    placeholder="请输入重复密码"
                    type="password"
                    show-password-on="click"
                    v-model:value="data.repassword"
                ></n-input>
              </div>
              <div class="change-text">
              <span
                  @click="userStore.isSignin = !userStore.isSignin"
              >
                {{ userStore.isSignin ? '没有账号？前往注册' : '已有账号？前往登录' }}
              </span>
              </div>
            </n-space>
          </div>
          <div class="submit-btn">
            <n-button type="success" @click="signinupSub">{{ userStore.isSignin ? '登录' : '注册' }}</n-button>
          </div>
        </div>
      </n-modal>

      <n-modal v-model:show="userStore.showUserInfoModal">
        <div class="userinfo-modal">
          <div class="title">修改用户信息</div>
          <div class="close">
            <n-icon
                class="icon"
                @click="userStore.showUserInfoModal = false"
            >
              <Close></Close>
            </n-icon>
          </div>
          <n-form
              label-placement="left"
              label-align="left"
              label-width="60"
              ref="userInfoEditRef"
              :rules="rules"
              :model="formValues"
          >
            <n-form-item
                path="email"
                label="账号"
            >
              <n-input
                  placeholder="账号"
                  disabled
                  v-model:value="formValues.email"
              ></n-input>
            </n-form-item>
            <n-form-item
                path="username"
                label="昵称"
            >
              <n-input
                  placeholder="请输入用户名"
                  v-model:value="formValues.username"
              ></n-input>
            </n-form-item>
            <n-form-item
                path="motto"
                label="签名"
            >
              <n-input
                  type="textarea"
                  maxlength="50"
                  show-count
                  placeholder="请输入签名"
                  :autosize="{
                  minRows: 3,
                  maxRows: 5
                }"
                  v-model:value="formValues.motto"
              ></n-input>
            </n-form-item>
            <n-form-item
                path="git_hub"
                label="GitHub"
            >
              <n-input
                  placeholder="请输入签名"
                  v-model:value="formValues.git_hub"
              ></n-input>
            </n-form-item>
            <n-form-item
                path="qq"
                label="QQ"
            >
              <n-input
                  placeholder="请输入QQ"
                  v-model:value="formValues.qq"
              ></n-input>
            </n-form-item>
            <n-form-item
                path="wechat"
                label="微信"
            >
              <n-input
                  placeholder="请输入微信好"
                  v-model:value="formValues.wechat"
              ></n-input>
            </n-form-item>
          </n-form>

          <div class="submit-btn">
            <n-button type="success" @click="updateUserInfoSub">确定</n-button>
          </div>
        </div>
      </n-modal>
    </div>
  </client-only>
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
        cursor: pointer;
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
      //color: #0F1C2E;

      //&:hover {
      //  background-color: deeppink;
      //  color: white;
      //}

      .icon {
        font-size: 22px;
        cursor: pointer;
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

    .button {
      --color: rgb(35, 214, 155);
      padding: 0.8em 1.7em;
      background-color: transparent;
      border-radius: .3em;
      position: relative;
      overflow: hidden;
      cursor: pointer;
      transition: .5s;
      font-weight: 400;
      font-size: 17px;
      //border: 1px solid;
      font-family: inherit;
      text-transform: uppercase;
      //color: var(--color);
      color: #0F1C2E;
      z-index: 1;
    }

    .button::before, .button::after {
      content: '';
      display: block;
      width: 50px;
      height: 50px;
      transform: translate(-50%, -50%);
      position: absolute;
      border-radius: 50%;
      z-index: -1;
      background-color: deeppink;
      transition: 1s ease;
    }

    .button::before {
      top: -1em;
      left: -1em;
    }

    .button::after {
      left: calc(100% + 1em);
      top: calc(100% + 1em);
    }

    .button:hover::before, .button:hover::after {
      height: 410px;
      width: 410px;
    }

    .button:hover {
      //color: rgb(10, 25, 30);
      color: #fff;
    }

    .button:active {
      filter: brightness(.8);
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

    a {
      text-decoration: none;
      color: rgba(15, 28, 46, 1);
    }
  }
}

.modal-wrapper {
  box-sizing: border-box;
  width: 400px;
  //height: 220px;
  background-color: rgb(246, 247, 253);
  border-radius: 5px;
  padding: 10px 50px;
  position: relative;
  box-shadow: 3px 3px 5px rgba(17, 17, 17, 0.4);

  .close {
    position: absolute;
    top: 5px;
    right: 5px;

    .icon {
      font-size: 20px;
      font-weight: bold;
      cursor: pointer;
      transition: all 0.35s ease-in-out;
      display: inline-block;

      &:hover {
        transform: rotate(90deg);
      }
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

  .change-text {
    text-align: end;
    font-size: 13px;
    color: deeppink;
    cursor: pointer;
  }

  .email-code {
    box-sizing: border-box;
    width: 100%;
  }
}

.userinfo-modal {
  box-sizing: border-box;
  width: 400px;
  background-color: rgb(246, 247, 253);
  border-radius: 5px;
  padding: 10px 20px;
  position: relative;
  box-shadow: 3px 3px 5px rgba(17, 17, 17, 0.4);

  .title {
    box-sizing: border-box;
    width: 100%;
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 15px;
  }

  .close {
    position: absolute;
    top: 5px;
    right: 5px;

    .icon {
      transition: all 0.35s ease-in-out;
      display: inline-block;
      font-size: 20px;
      font-weight: bold;
      cursor: pointer;

      &:hover {
        transform: rotate(90deg);
      }
    }
  }

  .submit-btn {
    display: flex;
    justify-content: flex-end;
  }


}
</style>
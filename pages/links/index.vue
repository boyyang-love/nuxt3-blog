<script setup lang="ts">
import {reactive} from 'vue'
import {NInput, NButton, NIcon, NForm, NFormItem, NAlert} from 'naive-ui'
import {Close, ArrowBack} from '@vicons/ionicons5'
import {definePageMeta} from '#imports'
import LinkCard from './componets/linkCard/index.vue'
import {createLink, listLink, type LinkApi} from '@/api/link'
import {useUserStore} from '@/store/modules/user'
import {useSysStore} from '@/store/modules/system'
import {loginByQQ} from '~/utils/qqLogin'
import {useRoute} from 'vue-router'
import {addImagePrefix} from '~/utils/addImagePrefix'

const route = useRoute()
const userStore = useUserStore()
const sysStore = useSysStore()

const rules = {
  website_name: {
    required: true,
    message: '请输入网站名称',
    trigger: 'blur',
  },
  website_url: {
    required: true,
    message: '请输入网站访问链接',
    trigger: 'blur',
  },
  website_desc: {
    required: true,
    message: '请输入网站描述',
    trigger: 'blur',
  },
  website_icon: {
    required: true,
    message: '请输入网站icon',
    trigger: 'blur',
  },
}

const linkData = reactive({
  website_name: '',
  website_url: '',
  website_desc: '',
  website_icon: '',
})

const linkListdata = ref<LinkApi.ListLinkItem[]>()
const formRef = ref()
const showAdd = ref<boolean>(false)

const qqLogin = () => {
  loginByQQ(route)
}

const sub = () => {
  if (!userStore.token) {
    window.$message.warning('请先登录后再申请友链')
    return
  }

  formRef.value?.validate((errors: boolean) => {
    if (!errors) {
      createLink(linkData as any).then(() => {
        window.$message.success('友链提交成功，请等待审核')
        linkData.website_name = ''
        linkData.website_url = ''
        linkData.website_desc = ''
        linkData.website_icon = ''
        showAdd.value = false
        getLinkList()
      })
    }
  })
}

const getLinkList = () => {
  const params = {
    page: 1,
    limit: 20,
    status: 1,
  }

  listLink(params).then((res) => {
    linkListdata.value = res.data.list
  })
}

onMounted(() => {
  getLinkList()
  setTimeout(() => {
    sysStore.setShowWelcome(false, 'link')
  }, 3000)
})

definePageMeta({
  layout: false,
})
</script>

<template>
  <nuxt-layout name="custom">
    <client-only>
      <Welcome :show="sysStore.showLinkWelcome">
        <div class="links-wrapper">
          <div class="alert">
            <n-alert title="友链申请提示" type="success" closable>
              <div class="alert-info">
                <span>欢迎大家,提交友链申请！</span>
                <span>网站名称:boyyang's blog</span>
                <span>网站描述:第一行没有你，第二行没有你，第三行没有也罢！</span>
                <span>网站地址:https://www.boyyang.cn</span>
                <span>网站图片地址:https://minio.boyyang.cn/boyyang/BOYYANG/default/avatar.png</span>
                <span>如果您愿意的话，可以在您的网站加上本小破网站的相关信息，谢谢!</span>
              </div>
            </n-alert>
          </div>

          <div class="links-content">
            <div class="back">
              <NIcon :size="22" class="icon">
                <ArrowBack @click="$router.back()"></ArrowBack>
              </NIcon>
            </div>
            <div class="link-sub" @click="showAdd = true">友链申请</div>
            <div class="title">友链</div>
            <div class="links">
              <div class="cards">
                <LinkCard
                    v-for="item in linkListdata"
                    :key="item.website_url"
                    :avatar="item.website_icon"
                    :name="item.website_name"
                    :des="item.website_desc"
                    :url="item.website_url"
                ></LinkCard>
              </div>
            </div>
          </div>
          
          <!-- 友链申请弹窗 -->
          <div class="dialog-wrapper" v-show="showAdd">
            <div class="links-box">
              <div class="close-icon">
                <NIcon size="18" class="icon" @click="showAdd = false">
                  <Close></Close>
                </NIcon>
              </div>
              <div class="title">友链申请</div>
              
              <!-- 未登录提示 -->
              <div class="login-tip" v-if="!userStore.token">
                <p>请先登录后再申请友链</p>
                <div class="login-btns">
                  <NButton type="primary" @click="qqLogin">
                    <template #icon>
                      <img src="@/assets/image/qq.svg" class="qq-icon" />
                    </template>
                    QQ登录
                  </NButton>
                </div>
              </div>
              
              <!-- 已登录表单 -->
              <div class="user-input" v-else>
                <div class="user-info">
                  <img :src="addImagePrefix(userStore.user_info.avatar)" class="avatar" />
                  <span class="username">{{ userStore.user_info.username }}</span>
                </div>
                <n-form :rules="rules" :model="linkData" ref="formRef">
                  <n-form-item label="网站名称" path="website_name">
                    <NInput
                        placeholder="请输入网站名称"
                        maxlength="25"
                        show-count
                        v-model:value="linkData.website_name"
                    ></NInput>
                  </n-form-item>
                  <n-form-item label="网站地址" path="website_url">
                    <NInput
                        placeholder="请输入网站访问地址"
                        v-model:value="linkData.website_url"
                    ></NInput>
                  </n-form-item>
                  <n-form-item label="网站描述" path="website_desc">
                    <NInput
                        placeholder="请输入网站描述"
                        type="textarea"
                        maxlength="50"
                        show-count
                        v-model:value="linkData.website_desc"
                    ></NInput>
                  </n-form-item>
                  <n-form-item label="网站图标" path="website_icon">
                    <NInput
                        placeholder="请输入网站Icon地址"
                        v-model:value="linkData.website_icon"
                    ></NInput>
                  </n-form-item>
                </n-form>
              </div>

              <div class="btns" v-if="userStore.token">
                <NButton type="primary" @click="sub">提交申请</NButton>
              </div>
            </div>
          </div>
        </div>
      </Welcome>
    </client-only>
  </nuxt-layout>
</template>

<style scoped lang="less">
.links-wrapper {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  background-color: var(--content-left-right);
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .links-box {
    box-sizing: border-box;
    width: 450px;
    border-radius: 5px;
    background-color: var(--card-color);
    padding: 20px;
    position: relative;

    .close-icon {
      position: absolute;
      top: 10px;
      right: 10px;

      .icon {
        cursor: pointer;
        transition: all .45s ease-in-out;
        color: var(--font-color);

        &:hover {
          transform-origin: center;
          transform: rotateZ(90deg);
        }
      }
    }

    .title {
      text-align: center;
      color: var(--font-color);
      font-size: 15px;
      font-weight: bolder;
      margin-bottom: 15px;
    }

    .login-tip {
      text-align: center;
      padding: 20px 0;
      color: var(--font-color);

      p {
        margin-bottom: 15px;
      }

      .login-btns {
        display: flex;
        justify-content: center;
        gap: 10px;

        .qq-icon {
          width: 18px;
          height: 18px;
        }
      }
    }

    .user-info {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 15px;
      padding-bottom: 15px;
      border-bottom: 1px solid var(--border-color);

      .avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        object-fit: cover;
      }

      .username {
        color: var(--font-color);
        font-weight: bold;
      }
    }

    .user-input {
      .label {
        color: var(--font-color);
        font-size: 13px;
        font-weight: bolder;
      }
    }

    .btns {
      display: flex;
      justify-content: flex-end;
      margin-top: 15px;
    }
  }

  .links-content {
    box-sizing: border-box;
    width: 800px;
    padding: 20px;
    height: 650px;
    background-color: var(--bg-color);
    border-radius: 5px;
    position: relative;

    .back {
      position: absolute;
      left: 10px;
      top: 10px;
      cursor: pointer;
      color: var(--font-color);
    }

    .link-sub {
      position: absolute;
      right: 10px;
      top: 10px;
      font-size: 13px;
      color: var(--font-color);
      cursor: pointer;
    }

    .title {
      color: var(--font-color);
      font-size: 20px;
      text-align: center;
      margin-bottom: 15px;
    }

    .links {
      box-sizing: border-box;
      width: 100%;
      height: calc(100% - 55px);
      overflow-y: auto;

      .cards {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 15px;
      }
    }
  }

  .dialog-wrapper {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(2px) saturate(90%);
    bottom: 0;
  }

  .alert {
    width: 800px;
    margin-bottom: 10px;

    .alert-info {
      display: flex;
      flex-direction: column;

      span {
        display: inline;
      }
    }
  }
}
</style>

<script setup lang="ts">
import {reactive} from 'vue'
import {NInput, NSpace, NButton, NInputGroup, NIcon, NForm, NFormItem, NAlert, NTooltip} from 'naive-ui'
import {Close, ArrowBack, Alert} from '@vicons/ionicons5'
import {definePageMeta} from '#imports'
import LinkCard from './componets/linkCard/index.vue'
import {createLink, listLink, type LinkApi} from '@/api/link'
import {sendEmail} from '@/api/email'
import {useSysStore} from '@/store/modules/system'

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
  email: {
    required: true,
    message: '请输入邮箱',
    trigger: 'blur',
  },
  code: {
    required: true,
    message: '请输入验证码',
    trigger: 'blur',
  },
}

const linkData = reactive<LinkApi.CreateLinkReq>({
  website_name: '',
  website_url: '',
  website_desc: '',
  website_icon: '',
  email: '',
  code: '',
})

const linkListdata = ref<LinkApi.ListLinkItem[]>()
const formRef = ref()
const showAdd = ref<boolean>(false)
const sendBtnStatus = reactive({
  disable: false,
  time: 60,
})

const getCode = () => {
  if (linkData.email.trim() === '') {
    window.$message.warning('请输入邮箱')
    return
  }
  timeCount()
  sendEmail({
    email: linkData.email,
    type: 'link',
    subject: 'boyyang\'s 博客网站友链申请',
  }).then(() => {
    window.$notification.success({
      title: '提示',
      content: '验证码已经发送至您的邮箱，请注意查收',
    })
  })
}

const sub = () => {

  formRef.value?.validate((errors: boolean) => {
        if (!errors) {
          const data = {
            ...linkData,
          }

          createLink(data).then(() => {
            window.$message.success('友链提交成功')
            linkData.website_name = ''
            linkData.website_url = ''
            linkData.website_desc = ''
            linkData.website_icon = ''
            linkData.email = ''
            linkData.code = ''
            showAdd.value = false

            getLinkList()
          })
        }
      },
  )
}

const timeCount = () => {
  sendBtnStatus.disable = true
  const t = setTimeout(() => {
    sendBtnStatus.time--
    if (sendBtnStatus.time <= 0) {
      sendBtnStatus.disable = false
      sendBtnStatus.time = 60
      clearTimeout(t)
    }
  }, 1000)
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
            <n-alert title="友链申请提示" type="warning" closable>
              <div class="alert-info">
                <span>欢迎大家,提交友链申请！</span>
                <span>本网站名称：boyyang's blog</span>
                <span>本网站描述：第一行没有你，第二行没有你，第三行没有也罢！</span>
                <span>本网站描述: https://www.boyyang.cn</span>
                <span>本网站图片地址:http://minio.boyyang.cn/boyyang/BOYYANG/1/default/avatar.png</span>
                <span>如果您愿意的话，可以在您的网站加上本小破网站的相关信息，谢谢</span>
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
              <LinkCard
                  v-for="item in linkListdata"
                  :avatar="item.website_icon"
                  :name="item.website_name"
                  :des="item.website_desc"
                  :url="item.website_url"
              ></LinkCard>
            </div>
          </div>
          <div class="dialog-wrapper" v-show="showAdd">

            <div class="links-box">
              <div class="close-icon">
                <NIcon size="18" class="icon" @click="showAdd = false">
                  <Close></Close>
                </NIcon>
              </div>
              <div class="title">友链申请</div>
              <div class="user-input">
                <n-form
                    :model="linkData"
                    :rules="rules"
                    ref="formRef"
                >
                  <n-form-item label="网站名称:" path="website_name">
                    <NInput
                        placeholder="请输入网站名称"
                        maxlength="25"
                        show-count
                        v-model:value="linkData.website_name"
                    ></NInput>
                  </n-form-item>
                  <n-form-item label="网站访问地址:" path="website_url">
                    <NInput
                        placeholder="请输入网站访问地址"
                        v-model:value="linkData.website_url"
                    ></NInput>
                  </n-form-item>
                  <n-form-item label="网站描述:" path="website_desc">
                    <NInput
                        placeholder="请输入网站描述"
                        type="textarea"
                        maxlength="50"
                        show-count
                        v-model:value="linkData.website_desc"
                    ></NInput>
                  </n-form-item>
                  <n-form-item label="网站图标:" path="website_icon">
                    <NInput
                        placeholder="请输入网站Icon地址"
                        v-model:value="linkData.website_icon"
                    ></NInput>
                  </n-form-item>
                  <n-form-item label="邮箱" path="email">
                    <NInput
                        placeholder="请输入邮箱"
                        v-model:value="linkData.email"
                    ></NInput>
                  </n-form-item>
                  <n-form-item label="验证码" path="code">
                    <NInputGroup>
                      <NInput
                          placeholder="请输入验证码"
                          v-model:value="linkData.code as string"
                      >
                      </NInput>
                      <NButton
                          type="error"
                          @click="getCode"
                          :disabled="sendBtnStatus.disable"
                      >{{ !sendBtnStatus.disable ? '获取验证码' : sendBtnStatus.time }}
                      </NButton>
                    </NInputGroup>
                  </n-form-item>
                </n-form>
                <NSpace vertical v-if="false">
                  <div class="label">网站名称:</div>
                  <NInput
                      placeholder="请输入网站名称"
                      maxlength="25"
                      show-count
                      v-model:value="linkData.website_name"
                  ></NInput>
                  <div class="label">网站访问地址:</div>
                  <NInput
                      placeholder="请输入网站访问地址"
                      v-model:value="linkData.website_url"
                  ></NInput>
                  <div class="label">网站描述:</div>
                  <NInput
                      placeholder="请输入网站描述"
                      type="textarea"
                      maxlength="50"
                      show-count
                      v-model:value="linkData.website_desc"
                  ></NInput>
                  <div class="label">网站图标:</div>
                  <NInput
                      placeholder="请输入网站Icon地址"
                      v-model:value="linkData.website_icon"
                  ></NInput>
                  <div class="label">邮箱:</div>
                  <NInput
                      placeholder="请输入邮箱"
                      v-model:value="linkData.email"
                  ></NInput>

                  <div class="label">验证码:</div>
                  <NInputGroup>
                    <NInput
                        placeholder="请输入验证码"
                        v-model:value="linkData.code as string"
                    >
                    </NInput>
                    <NButton type="error">获取验证码</NButton>
                  </NInputGroup>
                </NSpace>
              </div>

              <div class="btns">
                <NButton type="primary" @click="sub">提交</NButton>
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
  background-image: url("@/assets/image/bg.png");
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;


  .links-box {
    box-sizing: border-box;
    width: 450px;
    border-radius: 5px;
    background-color: var(--bg-color);
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
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 15px;
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
    //position: absolute;
    //bottom: 25px;
    //right: 25px;
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
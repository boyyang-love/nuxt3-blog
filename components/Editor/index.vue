<script setup lang="ts">
import {NInput, NSpace, useMessage} from 'naive-ui'
import {onMounted} from 'vue'
import {createBlog} from '@/api/blog'
import {type Upload, uploadFile} from '@/api/upload'
import {env} from '@/utils/env'
import {AiEditor} from 'aieditor'
import 'aieditor/dist/style.css'
import uploadModel from './components/uploadModal/index.vue'

const message = useMessage()
const divRef = ref()
const coverImg = ref<string | null>()
const isShowModal = ref<boolean>(false)
const modalType = ref<string>('blog') // blog cover
let aiEditor: AiEditor | null = null

const blogInfo = reactive({
  title: '',
  des: '',
  content: '',
})

const submit = () => {
  const des = aiEditor?.getText()
  const content = aiEditor?.getHtml()

  if (blogInfo.title.trim() === '' || content?.trim() === '' || coverImg.value === null) {
    message.warning('标题，内容，不能为空')
    return
  }

  createBlog({
    title: blogInfo.title,
    des: des?.slice(0, 150) || '',
    cover: coverImg.value || '',
    content: content || '',
  }).then(res => {
    message.success('文章发布成功')
    aiEditor?.clear()
    blogInfo.title = ''
    coverImg.value = ''
  })
}

const insert = (items: Upload.UploadListItem[]) => {
  if (modalType.value === 'blog') {
    let ins = [] as string[]
    items.forEach(item => {
      ins.push(`<img src="${item.file_path}" alt="${item.file_name}" align="center">`)
    })

    aiEditor?.insert(ins.join('\n'))
  } else {
    coverImg.value = items[0].file_path
  }
}

const delCover = () => {
  coverImg.value = null
}

const uploadCover = () => {
  modalType.value = 'cover'
  isShowModal.value = true
}

onMounted(() => {
  aiEditor = new AiEditor({
    theme: 'light',
    toolbarKeys: ['undo', 'redo', 'brush', 'eraser',
      '|', 'heading', 'font-family', 'font-size',
      '|', 'bold', 'italic', 'underline', 'strike', 'link', 'code', 'subscript', 'superscript', 'hr', 'todo', 'emoji',
      '|', 'highlight', 'font-color',
      '|', 'align', 'line-height',
      '|', 'bullet-list', 'ordered-list', 'indent-decrease', 'indent-increase', 'break',
      '|', 'image', 'video', 'attachment', 'quote', 'code-block', 'table',
      '|', 'printer', 'fullscreen',
    ],
    fontFamily: {
      values: [
        {name: '阿里妈妈刀隶体', value: 'AlimamaDaoLiTi'},
        {name: '宋体', value: 'SimSun'},
        {name: '仿宋', value: 'FangSong'},
        {name: '黑体', value: 'SimHei'},
        {name: '楷体', value: 'KaiTi'},
        {name: '微软雅黑', value: 'Microsoft YaHei'},
        {name: '方正仿宋简体_GBK', value: 'FangSong_GB2312'},
        {name: 'Arial', value: 'Arial'},
      ],
    },
    element: divRef.value as Element,
    placeholder: '点击输入内容...',
    content: '',
    image: {
      allowBase64: true,
      defaultSize: 710,
      customMenuInvoke() {
        isShowModal.value = true
        modalType.value = 'blog'
      },
      uploader: (file: File, uploadUrl: string, headers: Record<string, any>, formName: string): Promise<Record<string, any>> => {
        return new Promise(async (resolve, reject) => {
          const res = await uploadFile({file_name: file.name, file: file, dir: 'blog'})

          resolve({
            'errorCode': 0,
            'data': {
              'src': `${env.VITE_APP_IMG_URL}${res.data.path}`,
              'alt': file.name,
            },
          })
        })
      },
    },
    ai: {
      models: {},
      bubblePanelEnable: false,
      menus: [],
      codeBlock: {
        codeComments: {
          model: 'spark',
          prompt: '帮我对这个代码添加一些注释，并返回添加注释的代码，只返回代码',
        },
        codeExplain: {
          model: 'spark',
          prompt: '帮我对这个代码进行解释，返回代码的解释内容，注意，不需要对代码的注释进行解释',
        },
      },
    },
  })

})

onUnmounted(() => {
  aiEditor && aiEditor.destroy()
})
</script>

<template>
  <div ref="divRef" class="editor-wrapper">
    <div class="aie-container">
      <div class="aie-container-header"></div>
      <div class="aie-container-main">
        <div class="title">
          <n-input
              placeholder="请输入标题"
              style="
                  background-color: transparent;
                  height: 40px;
                  border-bottom: 1px solid rgba(83,96,133, 0.2);
                  padding-bottom: 10px;
              "
              :bordered="false"
              size="large"
              v-model:value="blogInfo.title"
          ></n-input>
        </div>
      </div>
      <div class="aie-container-footer">
      </div>
      <div class="bottom-wrapper">
        <div class="cover">添加封面</div>
        <div class="upload">
          <div class="img-wrapper" v-if="coverImg">
            <div class="close" @click="delCover">
              <nuxt-icon class="icon" name="other/close"></nuxt-icon>
            </div>
            <img class="img" :src="coverImg" :alt="coverImg"/>
          </div>
          <div class="upload-btn" @click="uploadCover">
            <div class="text">上传文件</div>
          </div>
        </div>
      </div>
      <div class="bottom-submit">
        <div class="btn-wrapper">
          <n-space>
            <div class="btn btn-preview">预览</div>
            <div class="btn btn-submit" @click="submit">发布</div>
            <div class="btn btn-exit" @click="$router.back()">退出</div>
          </n-space>
        </div>
      </div>
    </div>
  </div>

  <transition name="scale-slide">
    <uploadModel
        v-show="isShowModal"
        v-model:show="isShowModal"
        :type="modalType"
        @insert="insert"
    ></uploadModel>
  </transition>

</template>

<style lang="less" scoped>
.editor-wrapper {
  box-sizing: border-box;
  //width: 100vw;
  position: absolute;
  width: 100%;
  left: 0;
  top: 0;
  z-index: 9;
  overflow: hidden;

  .aie-container {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    width: 100%;
    z-index: 99;
    background-color: rgb(243, 244, 246);

    .aie-container-header {
      box-sizing: border-box;
      position: sticky;
      top: 0;
      width: 100%;
      padding: 10px 5px;
      z-index: 99;
      background-color: white;

      :deep(div) {
        display: flex;
        justify-content: center;
        align-items: center;
        border: none;
      }
    }

    .aie-container-main {
      border: 1px solid rgb(229 231 235);
      width: 730px;
      min-height: 700px;
      margin: 20px 0;
      border-radius: 5px;
      background-color: white;

      .title {
        padding: 10px 0;
      }
    }

    .aie-container-footer {
      display: none;
    }
  }

  .bottom-wrapper {
    box-sizing: border-box;
    width: 730px;

    .cover {
      font-size: 13px;
      color: #1f2b3e;
      margin-bottom: 10px;
      font-weight: bolder;
    }

    .upload {
      box-sizing: border-box;
      width: 250px;
      height: 120px;
      border: 2px dashed rgb(102, 211, 159);
      display: flex;
      justify-content: center;
      align-items: center;
      background: white;
      position: relative;

      .img-wrapper {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        padding: 5px;

        .close {
          box-sizing: border-box;
          width: 25px;
          height: 25px;
          display: flex;
          justify-content: center;
          align-items: center;
          position: absolute;
          top: -10px;
          right: -10px;
          background-color: rgb(102, 211, 159);
          border: 2px solid white;
          border-radius: 100%;
          transition: all 0.35s ease-in-out;
          cursor: pointer;

          &:hover {
            transform: rotateZ(90deg);
          }

          .icon {
            font-size: 18px;
            color: white;
            padding-bottom: 2px;
          }
        }

        .img {
          box-sizing: border-box;
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 2px;
        }
      }

      :deep(.n-upload-trigger) {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        cursor: pointer;
      }

      .upload-btn {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .text {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        color: #1f2b3e;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }

  .bottom-submit {
    margin-top: 25px;
    box-sizing: border-box;
    width: 100%;
    position: sticky;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: whitesmoke;
    padding: 10px 0;

    .btn-wrapper {
      box-sizing: border-box;
      width: 710px;
      display: flex;
      justify-content: flex-end;

      .btn {
        box-sizing: border-box;
        padding: 4px 15px;
        font-size: 14px;
        font-weight: bolder;
        border-radius: 3px;
        box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.5);
        cursor: pointer;
      }

      .btn-preview {
        background-color: deeppink;
        color: white;
      }

      .btn-submit {
        color: whitesmoke;
        background-color: #00a497;
      }

      .btn-exit {
        background-color: #0F1C2E;
        color: white;
      }
    }
  }
}

.scale-slide-enter-active,
.scale-slide-leave-active {
  transition: all 0.35s ease-in-out;
}

.scale-slide-enter-from,
.scale-slide-leave-to {
  transform: scale(0.5);
}

.scale-slide-enter-to,
.scale-slide-leave-from {
  transform: scale(1);
}


//.scale-slide-leave-from {
//  transform: translateY(0);
//}
//
//.scale-slide-leave-to {
//  transform: translateY(-100%);
//}
</style>
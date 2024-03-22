<script setup lang="ts">
import {NInput, NUpload, NUploadDragger, NSpace} from 'naive-ui'
import {onMounted} from 'vue'
import {AiEditor} from 'aieditor'
import 'aieditor/dist/style.css'

const divRef = ref()
let aiEditor: AiEditor | null = null

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
      defaultSize: 700,
      uploader: (file: File, uploadUrl: string, headers: Record<string, any>, formName: string): Promise<Record<string, any>> => {
        return new Promise((resolve, reject) => {
          resolve({
            'errorCode': 0,
            'data': {
              'src': 'https://7072-prod-2g5hif5wbec83baa-1301921121.tcb.qcloud.la/124810450/images/dbf71ce14611284dee2f61c80719d732.jpg\n',
              'alt': '图片 alt',
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
          ></n-input>
        </div>
      </div>
      <div class="aie-container-footer">
      </div>
      <div class="bottom-wrapper">
        <div class="cover">添加封面</div>
        <div class="upload">
          <n-upload
              class="upload-btn"
              style="width: 100%; height: 100%;"
              :show-file-list="false"
          >
            <div class="text">上传文件</div>
          </n-upload>
        </div>
      </div>
      <div class="bottom-submit">
        <div class="btn-wrapper">
          <n-space>
            <div class="btn btn-preview">预览</div>
            <div class="btn btn-submit">发布</div>
            <div class="btn btn-exit" @click="$router.back()">退出</div>
          </n-space>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.editor-wrapper {
  box-sizing: border-box;
  width: 100vw;

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
      width: 710px;
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
    width: 710px;

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
</style>
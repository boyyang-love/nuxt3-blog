<script setup lang="ts">
import {NUpload, NUploadDragger, NP, NText, NInput, NIcon} from 'naive-ui'
import {CloudUpload} from '@vicons/ionicons5'
import {useFileUpload} from '@/hooks/fileUpload'

const {
  onChange,
  uploadRef,
  imgBase64,
  fileInfo,
  submit,
} = useFileUpload('images')


</script>

<template>
  <div class="upload-wrapper">
    <div class="upload-content">
      <n-input
          class="input"
          placeholder="请输入壁纸名称"
          v-model:value="fileInfo.file_name"
      ></n-input>
      <img class="img" :src="imgBase64" alt="" v-if="imgBase64">
      <n-upload
          v-else
          ref="uploadRef"
          @change="onChange"
      >
        <n-upload-dragger>
          <div class="upload-icon">
            <n-icon class="icon">
              <CloudUpload></CloudUpload>
            </n-icon>
          </div>
          <n-text style="font-size: 16px">
            点击或者拖动文件到该区域来上传
          </n-text>
          <n-p depth="3" style="margin: 8px 0 0 0">
            请不要上传敏感数据，比如你的银行卡号和密码，信用卡号有效期和安全码
          </n-p>
        </n-upload-dragger>
      </n-upload>
      <div class="upload-btn">
        <div class="btn" @click="submit">
          上传
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.upload-wrapper {
  box-sizing: border-box;
  display: flex;
  justify-content: center;

  .upload-content {
    box-sizing: border-box;
    padding-top: 50px;
    width: 60%;

    .img {
      box-sizing: border-box;
      width: 100%;
      border-radius: 5px;
    }

    .input {
      margin-bottom: 10px;
    }

    .upload-btn {
      //background-color: #1f2b3e;
      display: flex;
      justify-content: flex-end;

      .btn {
        box-sizing: border-box;
        padding: 5px 20px;
        background-color: rgb(102, 211, 159);
        color: white;
        border-radius: 5px;
        cursor: pointer;
      }
    }

    .upload-icon {
      display: flex;
      justify-content: center;

      .icon {
        font-size: 40px;
        color: var(--font-color);
      }
    }
  }
}

@media screen and (max-width: 1200px) {
  .upload-wrapper {
    height: calc(100vh - 50px);

    .upload-content {
      width: 90%;
    }
  }
}
</style>
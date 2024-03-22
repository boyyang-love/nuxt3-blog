<script setup lang="ts">
import {NUpload, NUploadDragger, NP, NText, NInput, NSpace, NButton} from 'naive-ui'
</script>

<template>
  <div class="upload-wrapper">
    <div class="upload-content">
      <n-input class="input" placeholder="请输入壁纸名称"></n-input>
      <n-upload
          multiple
          directory-dnd
          action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f"
          :max="5"
      >
        <n-upload-dragger>
          <div class="upload-icon">
            <nuxt-icon class="icon" name="home/cloud"></nuxt-icon>
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
        <div class="btn">
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
      }
    }
  }
}
</style>
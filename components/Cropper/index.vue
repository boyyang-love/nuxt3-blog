<script setup lang="ts">
import VuePictureCropper, {cropper} from 'vue-picture-cropper'
import {type UploadFileInfo, NUpload, NModal, NIcon} from 'naive-ui'
import {Close} from '@vicons/ionicons5'
import {ref} from 'vue'

interface ImagesInfo {
  file: File
  blob: Blob
}

const emits = defineEmits<{
  submit: [imagesInfo: ImagesInfo]
}>()

const imgDataURL = ref<string>('')
const previewURL = ref<string>('')
const isShowCropper = ref<boolean>(false)

const fileChange = (options: {
  event?: Event
  fileList: UploadFileInfo[]
  file: UploadFileInfo
}) => {
  const read = new FileReader()
  read.readAsDataURL(options.file.file as Blob)
  read.onload = e => {
    imgDataURL.value = e.target?.result as string
    isShowCropper.value = true
  }
}

const submit = () => {
  if (!cropper) return

  const p1 = cropper.getBlob()
  const p2 = cropper.getFile()

  Promise.all([p1, p2]).then(res => {
    const read = new FileReader()
    read.readAsDataURL(res[0] as Blob)
    read.onload = e => {
      previewURL.value = e.target?.result as string
      emits('submit', {blob: res[0] as Blob, file: res[1] as File})
      isShowCropper.value = false
    }
  })
}

const reset = () => {
  if (!cropper) return
  cropper.reset()
}

</script>

<template>
  <div class="avatar-cropper-wrapper">
    <div class="avatar-box">
      <n-upload
          action="#"
          :max="1"
          :show-file-list="false"
          :default-upload="false"
          :file-list="[]"
          @change="fileChange"
          style="width: 100%;height: 100%;"
      >
        <div class="avatar-wrapper">
          <slot name="avatar"></slot>
        </div>
      </n-upload>
    </div>
  </div>

  <n-modal
      :show="isShowCropper"
  >
    <div class="dialog-content-wrapper">
      <VuePictureCropper
          :img="imgDataURL"
          :boxStyle="{
                    boxSizing: 'border-box',
                    width: '600px',
                    height: '345px',
                    backgroundColor: 'var(--bg-color)',
                    margin: 'auto',
          }"
          :options="{
                    viewMode: 2,
                    dragMode: 'crop',
                    aspectRatio: 1,
          }"
          :preset-mode="{
            width: 250,
            height: 250,
          }"

      >
      </VuePictureCropper>
      <div class="modal-bottom">
        <div class="reset btn" @click="reset">重置</div>
        <div class="submit btn" @click="submit">确定</div>
      </div>
      <div class="close" @click="isShowCropper = false">
        <n-icon class="icon">
          <Close></Close>
        </n-icon>
      </div>
    </div>
  </n-modal>
</template>

<style scoped lang="less">
.avatar-cropper-wrapper {
  box-sizing: border-box;
  border-radius: 50%;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  --webkit-box-sizing: border-box;
  align-items: center;

  .avatar-box {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    .avatar-wrapper {
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      background: rgb(35, 43, 60);
    }

    :deep(.n-upload-trigger) {
      box-sizing: border-box;
      width: 100%;
      height: 100%;
    }
  }

}

.dialog-content-wrapper {
  box-sizing: border-box;
  border-radius: 5px;
  padding: 30px 20px 10px;
  background-color: var(--bg-color);

  .modal-bottom {
    box-sizing: border-box;
    width: 100%;
    padding: 10px 0 0;
    display: flex;
    justify-content: flex-end;

    .btn {
      color: white;
      padding: 5px 20px;
      background-color: rgb(102, 211, 159);
      border-radius: 5px;
      cursor: pointer;
      font-size: 14px;
      font-weight: bolder;
      box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.5);
      margin-left: 10px;
    }
  }

  .close {
    position: absolute;
    top: 5px;
    right: 5px;


    .icon {
      display: inline-block;
      font-size: 20px;
      color: var(--font-color);
      cursor: pointer;
      transition: all 0.45s ease-in-out;

      &:hover {
        transform: rotateZ(90deg);
      }
    }
  }
}
</style>
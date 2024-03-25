<script setup lang="ts">
import {NModal, NPagination, NUpload, NEmpty, NImage, NCheckbox, NButton, NSpace} from 'naive-ui'
import {useFileUpload} from '@/hooks/fileUpload'
import {type Upload, uploadList} from '@/api/upload'
import {env} from '@/utils/env'
import {computed} from 'vue'
import CubeLoading from '~/components/CubeLoading/index.vue'

const emits = defineEmits<{
  insert: [item: Upload.UploadListItem[]]
}>()

const props = defineProps<{
  type: string
}>()

const {uploadRef, onChange, customRequest} = useFileUpload()
const count = ref<number>(0)
const page = ref<number>(1)
const modelValue = defineModel('show')
const insertImageList = ref<Upload.UploadListItem[]>([])
const imgList = ref<Upload.UploadListItem[]>([])

const getImgList = () => {
  uploadList({page: page.value, limit: 12, type: 'blog'}).then((res) => {
    count.value = res.data.count
    imgList.value = res.data.infos.map(info => {
      return {
        ...info,
        file_path: `${env.VITE_APP_IMG_URL}/${info.file_path}`,
      }
    })
  })
}

const selectChange = (e: boolean, item: Upload.UploadListItem) => {
  if (e) {
    insertImageList.value.push(item)
  } else {
    insertImageList.value = insertImageList.value.filter((it) => it.id !== item.id)
  }
}

const insert = () => {
  modelValue.value = false
  emits('insert', insertImageList.value)
}

const close = () => {
  modelValue.value = false
}

const finish = () => {
  getImgList()
}
onMounted(() => {
  getImgList()
})
</script>

<template>
  <div class="wrapper">
    <div class="content">
      <div class="close">
        <nuxt-icon
            class="icon"
            name="other/close"
            @click="close"
        ></nuxt-icon>
      </div>
      <div class="empty" v-if="imgList.length === 0">
        <n-empty></n-empty>
      </div>

      <div class="img-wrapper" v-else>
        <div
            class="image-item"
            v-for="item in imgList"
            :key="item.id">
          <n-image
              :src="item.file_path"
              :alt="item.file_name"
              object-fit="cover"
              :img-props="{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }"
              class="img"
          >
            <template #placeholder>
              <div class="loading">
                <CubeLoading></CubeLoading>
              </div>
            </template>
          </n-image>
          <div class="bottom-wrapper">
<!--            <n-checkbox-->
<!--                size="small"-->
<!--                :disabled="props.type === 'cover' && insertImageList.length > 0 && !insertImageList.includes(item) "-->
<!--                @update:checked="e => selectChange(e, item)"-->
<!--            ></n-checkbox>-->
          </div>
        </div>
      </div>
      <div class="pagenation">
        <n-space>
          <n-button
              v-show="insertImageList.length > 0"
              size="small"
              type="success"
              @click="insert"
          >
            插入({{ insertImageList.length }})
          </n-button>
          <n-pagination
              size="medium"
              v-model:page="page"
              :item-count="count"
              :page-size="12"
              @update:page="getImgList"
              simple
          />
        </n-space>

      </div>
      <n-upload
          class="upload-btn"
          style="width: 100%; height: 100%;"
          :show-file-list="false"
          ref="uploadRef"
          @finish="finish"
          :custom-request="customRequest"
      >
        <div class="add">
          <nuxt-icon class="icon" name="other/add"></nuxt-icon>
        </div>
      </n-upload>
    </div>
  </div>
</template>

<style scoped lang="less">
.wrapper {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 99;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
}

.content {
  box-sizing: border-box;
  width: 750px;
  height: 445px;
  background-color: white;
  overflow: hidden;
  padding: 30px 15px 30px;
  border-radius: 5px;
  position: relative;

  .empty {
    box-sizing: border-box;
    width: 100%;
    height: 220px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .img-wrapper {
    box-sizing: border-box;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 10px;

    .image-item {
      box-sizing: border-box;
      width: 100%;
      height: 112px;
      position: relative;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
      //height: 100px;
      .img {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 5px;
        box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);

        .loading {
          box-sizing: border-box;
          width: 100%;
          height: 112px;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: deeppink;
          border-radius: 5px;
        }
      }

      .bottom-wrapper {
        box-sizing: border-box;
        width: 100%;
        height: 25px;
        display: flex;
        align-items: center;
        padding: 0 5px;
        background-color: rgba(17, 17, 17, 0.4);
        backdrop-filter: blur(5px);
        -webkit-backdrop-filter: blur(5px);
        position: absolute;
        bottom: 0;
      }
    }
  }

  .close {
    position: absolute;
    top: 0;
    right: 5px;

    .icon {
      display: inline-block;
      font-size: 22px;
      transition: all 0.45s ease-in-out;

      &:hover {
        transform: rotateZ(90deg);
      }
    }
  }

  .pagenation {
    position: absolute;
    bottom: 10px;
    left: 10px;
    display: flex;
  }

  .add {
    box-sizing: border-box;
    width: 20px;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid rgba(17, 17, 17, 1);
    position: absolute;
    bottom: 15px;
    right: 15px;
    border-radius: 3px;
    padding: 0 0 2px 1px;
    cursor: pointer;

    .icon {
      font-size: 22px;
      font-weight: bold;
    }
  }
}
</style>
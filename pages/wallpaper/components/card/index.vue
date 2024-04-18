<script setup lang="ts">
import {NImage, NIcon, NPopconfirm} from 'naive-ui'
import {Close, PaperPlane, CloudDownload, LockClosed, LockOpen, ChevronForward, ChevronBack, EyeOff} from '@vicons/ionicons5'
import CubeLoading from '@/components/CubeLoading/index.vue'
import {type Upload, uploadDelete} from '@/api/upload'
import {updateUserInfo} from '@/api/user'
import {useUserStore} from '@/store/modules/user'
import {imageDownload} from '@/utils/fileDownload'

interface Props {
  id: number
  url: string
  type: Upload.FileType
  path: string
  fileName: string
  status: boolean
  w: number
  h: number
}

const props = defineProps<Props>()
const isShowMenu = ref<boolean>(false)

const emits = defineEmits<{
  del: [id: number]
  wallpaperStatus: [id: number, status: boolean]
}>()
const userStore = useUserStore()

const setText = computed<string>(() => {

  if (props.type === 'bg') {
    return '设置当前图片为背景'
  }

  if (props.type === 'avatar') {
    return '设置当前图片为头像'
  }

  return ''
})

const delText = computed<string>(() => {
  if (props.type === 'images') {
    return '是否删除当前壁纸？'
  }

  if (props.type === 'blog') {
    return '删除当前图片有可能导致博客图片引用失败是否确定？'
  }

  if (props.type === 'bg') {
    return '删除当前图片有可能导致当前背景图片引用失败，是否确定？'
  }

  if (props.type === 'avatar') {
    return '删除当前图片有可能导致当前头像引用失败，是否确定？'
  }

  if (props.type === 'categories'){
    return '删除当前图片有可能导致分类图片引用失败，是否确定？'
  }

  return ''
})

const setImage = () => {
  if (props.type === 'bg') {
    window.$uploadProgress.begin()
    updateUserInfo({
      cover: props.path,
    }).then(() => {
      userStore.$patch({
        user_info: {
          cover: props.url,
        },
      })
      window.$uploadProgress.end()
    }).catch(() => {
      window.$uploadProgress.end()
    })
  }

  if (props.type === 'avatar') {
    window.$uploadProgress.begin()
    updateUserInfo({
      avatar: props.path,
    }).then(() => {
      userStore.$patch({
        user_info: {
          avatar: props.url,
        },
      })
      window.$uploadProgress.end()
    }).catch(() => {
      window.$uploadProgress.end()
    })
  }
}

const delImage = () => {
  const data = {
    id: props.id,
    file_path: props.path,
    type: props.type,
  }

  window.$uploadProgress.begin()
  uploadDelete(data).then(() => {
    window.$uploadProgress.end()
    emits('del', props.id)
  }).catch(() => {
    window.$uploadProgress.end()
  })
}

const downloadImage = () => {
  window.$uploadProgress.begin()
  imageDownload(props.url, props.fileName).then(() => {
    window.$uploadProgress.end()
    window.$message.success('图片下载成功')
  })
}

const changeWallpaprStatus = () => {
  emits('wallpaperStatus', props.id, !props.status)
}
</script>

<template>
  <div class="image-card-wrapper" id="image-card-wrapper">
    <div
        :class="['icon-wrapper', isShowMenu ? 'show' : '']"
        :style="{'--tx': props.type === 'blog' ? '-66%' : '-75%' }"
    >
      <n-popconfirm
          positive-text="确定"
          negative-text="取消"
          @positive-click="changeWallpaprStatus"
          v-if="props.type === 'images'"
      >
        <template #trigger>
          <n-icon size="18" class="desktop icon">
            <component :is="props.status ? LockOpen : LockClosed "></component>
          </n-icon>
        </template>
        <div class="text" style="max-width: 150px">{{ props.status ? '是否隐藏该图片' : '是否公开该图片' }}</div>
      </n-popconfirm>
      <n-popconfirm
          positive-text="确定"
          negative-text="取消"
          @positive-click="downloadImage"
      >
        <template #trigger>
          <n-icon size="18" class="desktop icon">
            <CloudDownload></CloudDownload>
          </n-icon>
        </template>
        <div class="text" style="max-width: 150px">下载图片到本地？</div>
      </n-popconfirm>
      <n-popconfirm
          positive-text="确定"
          negative-text="取消"
          @positive-click="setImage"
          v-if="props.type === 'bg' || props.type === 'avatar' "
      >
        <template #trigger>
          <n-icon size="18" class="desktop icon">
            <PaperPlane></PaperPlane>
          </n-icon>
        </template>
        <div class="text" style="max-width: 150px">{{ setText }}</div>
      </n-popconfirm>
      <n-popconfirm
          positive-text="确定"
          negative-text="取消"
          @positive-click="delImage"
      >
        <template #trigger>
          <n-icon size="18" class="close icon">
            <Close></Close>
          </n-icon>
        </template>
        <div class="text" style="max-width: 150px">
          {{ delText }}
        </div>
      </n-popconfirm>
      <n-icon
          :size="18"
          class="icon arrow"
          @click="isShowMenu = !isShowMenu"
      >
        <component :is="isShowMenu ? ChevronBack : ChevronForward "></component>
      </n-icon>
    </div>
    <div class="w-h-wrapper">
      <span class="text">{{ props.w }}x{{ props.h }}</span>
    </div>
    <div class="lock" v-if="!props.status && props.type === 'images' ">
      <n-icon size="18" class="icon">
        <EyeOff></EyeOff>
      </n-icon>
    </div>
    <NImage
        class="n-img"
        :src="props.url"
        :show-toolbar="false"
        lazy
        :intersection-observer-options="{
          root: '#waterfall-container'
        }"
        style="height: 100%"
        object-fit="cover"
    >
      <template #placeholder>
        <div class="loading">
          <CubeLoading></CubeLoading>
        </div>
      </template>
    </NImage>
  </div>
</template>

<style scoped lang="less">
.image-card-wrapper {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  overflow: hidden;
  position: relative;

  .n-img {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 5px;

    .loading {
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .icon-wrapper {
    transition: all 0.25s ease-in-out;
    box-sizing: border-box;
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateX(var(--tx)) translateY(-50%);
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(2px);
    --webkit-backdrop-filter: blur(2px);
    border-radius: 3px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .close {
      cursor: pointer;
      display: inline-block;
      transition: all 0.45s ease-in-out;

      &:hover {
        transform: rotateZ(90deg);
      }
    }

    .icon {
      cursor: pointer;
      color: #23d69b;
      margin: 2px 3px;
    }
  }

  .show {
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
  }

  &:hover {
    .w-h-wrapper {
      top: 0;
    }
  }

  .w-h-wrapper {
    transition: all 0.45s ease-in-out;
    position: absolute;
    left: 0;
    top: -30px;
    padding: 0 5px;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(2px);
    --webkit-backdrop-filter: blur(2px);

    .text {
      font-size: 12px;
      color: whitesmoke;
    }
  }

  .lock {
    position: absolute;
    top: 0;
    right: 0;
    padding: 3px;
    border-radius:0 0 0 5px;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(2px);
    --webkit-backdrop-filter: blur(2px);
    display: flex;
    justify-content: center;
    align-items: center;

    .icon {
      color: #ff8a14;
    }
  }
}
</style>
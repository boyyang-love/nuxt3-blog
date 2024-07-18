<script setup lang="ts">
import {NImage, NIcon} from 'naive-ui'
import {type Upload} from '~/api/upload'
import errimg from 'assets/image/wolp.jpg'
import SunMoonLoading from '@/components/Loadings/SunMoonLoading/index.vue'
import {addImagePrefix} from '~/utils/addImagePrefix'
import {CloudDownload} from '@vicons/ionicons5'
import {imageDownload} from '@/utils/fileDownload'

interface Props {
  gap?: number
  col?: number
  list: List[]
}

type List = Upload.UploadListItem
type ImageList = Upload.UploadListItem & { x: number, y: number, iw: number, ih: number }

const props = withDefaults(
    defineProps<Props>(),
    {
      gap: 10,
      col: 3,
    },
)

const emits = defineEmits<{
  refresh: []
  isNoMore: [noMore: boolean]
}>()


const wrapper = ref<HTMLElement | null>(null)
const imgList = ref<ImageList[]>([])


watch(
    () => props.list,
    () => {
      getWrapperBox()
    },
    {
      deep: true,
    },
)

watch(() => props.col, () => {
  getWrapperBox()
})

const getWrapperBox = () => {
  const w = wrapper.value?.clientWidth
  const imgW = (Number(w || 710) - ((props.col - 1) * props.gap)) / props.col
  getPos(imgW)
}

const getPos = (imgW: number) => {
  const boxArr = Array.from({length: props.col}, () => 0)
  const gap = props.gap
  imgList.value = props.list.map((img, i) => {
    const imgH = (img.h / img.w) * imgW
    if (i < props.col) {
      const x = i * (imgW + gap)
      boxArr[i] += imgH
      return {
        ...img,
        x: x,
        y: 0,
        iw: imgW,
        ih: imgH,
      }
    } else {
      let minIndex = boxArr.indexOf(Math.min(...boxArr))
      const x = minIndex * (imgW + gap)
      const y = boxArr[minIndex] + gap
      boxArr[minIndex] += (gap + imgH)
      return {
        ...img,
        x: x,
        y: y,
        iw: imgW,
        ih: imgH,
      }
    }
  })

  const maxh = Math.max(...boxArr)
  if (wrapper.value) {
    (wrapper.value as any).style.height = `${maxh}px`
  }
}

const download = (url: string, name: string) => {
  const _url = addImagePrefix(url)

  window.$uploadProgress.begin()

  imageDownload(_url, name).then(() => {
    window.$uploadProgress.end()
  })
}

onMounted(() => {
  nextTick(() => {
    getWrapperBox()
  })
})

defineExpose({
  getWrapperBox,
})

</script>

<template>
  <div
      class="waterfall-wrapper"
      id="waterfall-container"
      ref="wrapper"
  >
    <div class="out-wrapper">
      <div
          class="img-wrapper"
          v-for="item in imgList"
          :style="{
            left: `${item.x}px`,
            top: `${item.y}px`,
            width: `${item.iw}px`,
            height: `${item.ih}px`,
          }"
      >
        <NIcon
            size="16"
            class="download"
            @click="download(item.file_path, item.file_name)"
        >
          <CloudDownload></CloudDownload>
        </NIcon>
        <n-image
            class="img"
            :alt="item.file_path"
            :src="addImagePrefix(item.file_path)"
            :fallback-src="errimg"
            :img-props="{
              width: '100%'
            }"
            :show-toolbar="false"
            :intersection-observer-options="{
                root: '#user-info-wrapper'
            }"
            object-fit="cover"
            :style="{
              width: '100%',
              height: '100%'
            }"
            lazy
        >
          <template #placeholder>
            <div class="loading">
              <SunMoonLoading></SunMoonLoading>
            </div>
          </template>
        </n-image>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.waterfall-wrapper {
  box-sizing: border-box;
  position: relative;
  width: 100%;
  height: 100%;
  background-color: var(--card-color);

  .out-wrapper {
    box-sizing: border-box;

    .img-wrapper {
      width: 100%;
      height: 100%;
      display: flex;
      position: absolute;
      transition: all 0.45s ease-in-out;
      overflow: hidden;

      .download {
        display: block;
        position: absolute;
        bottom: -15px;
        right: 5px;
        cursor: pointer;
        transition: all 0.5s ease-in-out;
      }

      &:hover {
        .download {
          bottom: 5px;
        }
      }


      .img {
        box-sizing: border-box;
        width: 100%;
        height: 100%;

        .loading {
          box-sizing: border-box;
          display: flex;
          width: 100%;
          height: 100%;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }
}
</style>
<script setup lang="ts">
import {NEmpty} from 'naive-ui'
import {type Upload, uploadList, uploadStatus} from '~/api/upload'
import Card from '../card/index.vue'
import {env} from '~/utils/env'

interface Props {
  gap?: number
  col?: number
  type: Upload.FileType
}

type List = Upload.UploadListItem & { path: string }
type ImageList = Upload.UploadListItem & { x: number, y: number, iw: number, ih: number, path: string }

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


const list = ref<List[]>([])
const imgList = ref<ImageList[]>([])
const wrapper = ref<HTMLElement | null>(null)
const count = ref<number>(0)
const page = ref<number>(1)
const limit = ref<number>(30)

const getWrapperBox = () => {
  const w = wrapper.value?.clientWidth
  const imgW = (Number(w || 1000) - ((props.col - 1) * props.gap)) / props.col
  getPos(imgW)
}

const getPos = (imgW: number) => {
  const boxArr = Array.from({length: props.col}, () => 0)
  const gap = props.gap
  imgList.value = list.value.map((img, i) => {
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
}

const getList = () => {
  uploadList({
    page: page.value,
    limit: limit.value,
    type: props.type,
  }).then((res) => {
    count.value = res.data.count
    res.data.infos.forEach((e) => {
      list.value.push({
        ...e,
        file_path: `${env.VITE_APP_IMG_URL}/${e.file_path}`,
        path: e.file_path,
      })
    })

    getWrapperBox()
  })

}

const handleScroll = () => {
  const w = wrapper.value as any
  const len = imgList.value.length
  if (w.scrollTop + w.clientHeight >= w.scrollHeight - 20) {
    if (len < count.value) {
      page.value++
      getList()
    } else {
      emits('isNoMore', true)
    }
  }
}

const del = (id: number) => {
  list.value = list.value.filter(l => l.id !== id)
  count.value = count.value - 1
  getWrapperBox()
}

const wallpaperStatus = (id: number, status: boolean) => {
  window.$uploadProgress.begin
  uploadStatus({id: id, status: status}).then(() => {
    const img = imgList.value.find(img => img.id === id)
    if (img) {
      img.status = status
    }

    window.$uploadProgress.end()
  }).catch(() => {
    window.$uploadProgress.end()
  })
}

watch([() => props.type], () => {
  imgList.value = []
  list.value = []
  page.value = 1
  limit.value = 30
  count.value = 0
  getList()
})
watch([() => props.col], () => {
  getWrapperBox()
})

onMounted(() => {
  getList()
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
      @scroll="handleScroll"
  >
    <div class="out-wrapper">
      <div class="empty" v-if="imgList.length === 0">
        <n-empty></n-empty>
      </div>
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
        <Card
            class="img"
            :w="item.w"
            :h="item.h"
            :key="item.id"
            :id="item.id"
            :url="item.file_path"
            :status="item.status"
            :type="props.type"
            :file-name="item.file_name"
            :path="item.path"
            @del="del"
            @wallpaperStatus="wallpaperStatus"
        >
        </Card>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
::-webkit-scrollbar {
  width: 0 !important;
  height: 2px;
}

::-webkit-scrollbar-track {
  background: transparent;
  border-radius: 2px;
}

::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.3);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(56, 74, 82, 0.7);
}

.waterfall-wrapper {
  box-sizing: border-box;
  position: relative;
  width: 100%;
  height: 100%;
  overflow-y: auto;


  .out-wrapper {
    box-sizing: border-box;
    //width: 100%;
    .empty {
      box-sizing: border-box;
      width: 100%;
      padding-top: 100px;
      justify-content: center;
      align-items: center;
    }

    .img-wrapper {
      width: 100%;
      height: 100%;
      position: absolute;
      transition: all 0.45s ease-in-out;
    }
  }
}
</style>
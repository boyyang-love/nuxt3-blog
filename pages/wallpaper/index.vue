<script setup lang="ts">
import {NEmpty, NPagination} from 'naive-ui'
import Card from './components/card/index.vue'
import {uploadList, type Upload} from '@/api/upload'
import {env} from '@/utils/env'

const list = ref<Upload.UploadListItem[]>([])
const count = ref<number>(0)
const page = ref<number>(1)
const limit = ref<number>(20)

const pageSizes = [
  {
    label: '10 每页',
    value: 10,
  },
  {
    label: '20 每页',
    value: 20,
  },
  {
    label: '30 每页',
    value: 30,
  },
  {
    label: '40 每页',
    value: 40,
  },
]

const pageSizeChange = (e: number) => {
  limit.value = e
  getUploadList()
}

const pageUpdate = (e: number) => {
  page.value = e
  getUploadList()
}

const getUploadList = () => {

  uploadList({
    page: page.value,
    limit: limit.value,
    type: 'images',
  }).then((res) => {
    count.value = res.data.count
    list.value = res.data.infos.map((e) => {
      return {
        ...e,
        file_path: `${env.VITE_APP_IMG_URL}/${e.file_path}`,
      }
    })
  })
}

onMounted(() => {
  getUploadList()
})


</script>

<template>
  <div class="wallpaper-wrapper" id="wallpaper-wrapper">
    <div class="empty" v-if="list.length === 0">
      <n-empty></n-empty>
    </div>
    <div class="content" v-else>
      <Card
          v-for="item in list"
          :url="item.file_path"
          :key="item.id"
      ></Card>
    </div>

    <div class="pagination" v-show="list.length > 0">
      <n-pagination
          :item-count="count"
          :page-size="limit"
          :page-sizes="pageSizes"
          @update:page="pageUpdate"
          @update:pageSize="pageSizeChange"
          show-size-picker
      />
    </div>
  </div>
</template>

<style scoped lang="less">
.wallpaper-wrapper {
  padding: 10px;

  .content {
    box-sizing: border-box;
    -moz-column-count: 3; /* Firefox */
    -webkit-column-count: 3;
    column-count: 3;
    column-gap: 5px;
  }

  .empty {
    box-sizing: border-box;
    width: 100%;
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .pagination {
    box-sizing: border-box;
    //background-color: rgb(245 246 255 / 80%);
    //background-color: rgb(241, 239, 254);
    background-color: rgb(255, 255, 255);

    padding: 10px 0;
    width: 100%;
    display: flex;
    justify-content: center;
    position: sticky;
    bottom: 0;
  }
}
</style>
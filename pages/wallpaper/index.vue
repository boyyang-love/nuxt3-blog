<script setup lang="ts">
import {NEmpty, NPagination, NTabs, NTabPane} from 'naive-ui'
import Card from './components/card/index.vue'
import {uploadList, type Upload} from '@/api/upload'
import {env} from '@/utils/env'

const list = ref<(Upload.UploadListItem & { path: string })[]>([])
const tabValue = ref<'images' | 'blog' | 'bg' | 'avatar'>('images')
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
    type: tabValue.value,
  }).then((res) => {
    count.value = res.data.count
    list.value = res.data.infos.map((e) => {
      return {
        ...e,
        file_path: `${env.VITE_APP_IMG_URL}/${e.file_path}`,
        path: e.file_path,
      }
    })
  })
}

const tabValueChange = () => {
  page.value = 1
  limit.value = 10
  getUploadList()
}

onMounted(() => {
  getUploadList()
})
</script>

<template>
  <div class="wallpaper-wrapper" id="wallpaper-wrapper">
    <div class="tab-wrapper">
      <n-tabs
          type="line"
          default-value="images"
          v-model:value="tabValue"
          @update:value="tabValueChange"
      >
        <n-tab-pane tab="壁纸" name="images">

        </n-tab-pane>
        <n-tab-pane tab="博客" name="blog">

        </n-tab-pane>
        <n-tab-pane tab="背景" name="bg">

        </n-tab-pane>
        <n-tab-pane tab="头像" name="avatar">

        </n-tab-pane>
      </n-tabs>
    </div>
    <div class="empty" v-if="list.length === 0">
      <n-empty></n-empty>
    </div>
    <div
        class="content"
        v-else
    >
      <Card
          class="item"
          v-for="item in list"
          :key="item.id"
          :id="item.id"
          :url="item.file_path"
          :type="tabValue"
          :file-name="item.file_name"
          :path="item.path"
          @refresh="getUploadList"
      >
      </Card>
    </div>

    <div class="pagination" v-show="list.length > 0">
      <n-pagination
          :item-count="count"
          v-model:page-size="limit" bu
          v-model:page="page"
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
  position: relative;

  .tab-wrapper {
    position: sticky;
    background-color: var(--center-top-bg);
    top: 50px;
    padding: 0 20px;
    z-index: 9;
  }

  .content {
    box-sizing: border-box;
    -moz-column-count: 3; /* Firefox */
    -webkit-column-count: 3;
    column-count: 3;
    column-gap: 5px;
    padding: 0 10px;
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
    background-color: var(--center-top-bg);
    padding: 10px 0;
    width: 100%;
    display: flex;
    justify-content: center;
    position: sticky;
    bottom: 0;
  }
}
</style>
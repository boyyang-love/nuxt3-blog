<template>
  <nuxt-layout name="custom">
    <div class="create-wrapper">
      <div class="inner">
        <client-only>
          <Editor
              :editInfo="editInfo"
              :is-edit="isEdit"
          ></Editor>
        </client-only>
      </div>
    </div>
  </nuxt-layout>
</template>


<script lang="ts" setup>
import {useRoute} from 'vue-router'
import Editor from '@/components/WangEditor/index.vue'
import {searchBlogById, type Blog} from '@/api/blog'
import {definePageMeta} from '#imports'

const route = useRoute()
const isEdit = ref<boolean>(false)
const editInfo = ref<Blog.ListBlogItem>()
const getEditdata = () => {
  if (route.query.id) {
    searchBlogById(
        {
          id: Number(route.query.id),
        },
    ).then((res) => {
      editInfo.value = res.data.info
      isEdit.value = true
    })
  }
}

onMounted(() => {
  getEditdata()
})

definePageMeta({
  layout: false,
})
</script>

<style scoped lang="less">
.create-wrapper {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  background-color: rgb(243, 244, 246);
  overflow-y: auto;

  .inner {
    box-sizing: border-box;
    width: 100%;
    border-radius: 10px;
    position: relative;
  }
}
</style>
<script setup lang="ts">
import {h} from 'vue'
import {NEllipsis, NIcon, NInput, NModal, NCard} from 'naive-ui'
import {Close, Create, Add} from '@vicons/ionicons5'
import {type Tag, tagList, tagUpdate, tagCreate, tagDelete} from '@/api/tags'
import {type Blog, searchBlogByIds} from '~/api/blog'
import {useRouter} from 'vue-router'

const router = useRouter()
const list = ref<Tag.TagInfo[]>([])
const blogList = ref<Blog.ListBlogItemByids[]>([])
const isShowCard = ref<boolean>(false)

const getTagList = () => {
  tagList({type: 'article'}).then((res) => {
    list.value = res.data.tags
  })
}

const getBlogList = (ids: number[]) => {
  window.$uploadProgress.begin()
  searchBlogByIds({ids: ids}).then((res) => {
    blogList.value = res.data.info
    const t = setTimeout(() => {
      t && clearTimeout(t)
      isShowCard.value = true
      window.$uploadProgress.end()
    }, 500)

  }).catch(() => {
    window.$uploadProgress.end()
  })
}

const eidtTag = (item: Tag.TagInfo) => {
  let newTagName = ''
  let loading = false
  window.$dialog.warning({
    title: '修改标签',
    positiveText: '提交修改',
    negativeText: '取消',
    loading: loading,
    content: () => h(NInput,
        {
          defaultValue: item.tag_name,
          placeholder: '请输入标签名称',
          type: 'text',
          maxlength: '20',
          showCount: true,
          onChange: (value) => {
            newTagName = value
          },
        },
        () => [],
    ),
    onPositiveClick(e) {
      if (newTagName.trim() === '') {
        window.$message.warning('标签名称不能为空')
        return false
      }
      loading = true
      tagUpdate({
        id: item.id,
        name: newTagName,
      }).then(() => {
        loading = false
        getTagList()
      })
    },
  })
}

const delTag = (item: Tag.TagInfo) => {
  let loading = false
  window.$dialog.error({
    loading: loading,
    title: '删除标签',
    positiveText: '确认删除',
    negativeText: '取消',
    content: `是否确定删除「${item.tag_name}」标签？`,
    onPositiveClick: () => {
      loading = true
      tagDelete({id: item.id}).then(() => {
        loading = false
        getTagList()
      })
    },
  })
}

const addNewTag = () => {
  let newTagName = ''
  let loading = false
  window.$dialog.success({
    title: '新增标签',
    positiveText: '确定',
    negativeText: '取消',
    loading: loading,
    content: () => h(NInput,
        {
          placeholder: '请输入标签名称',
          type: 'text',
          maxlength: '20',
          showCount: true,
          onChange: (value) => {
            newTagName = value
          },
        },
        () => [],
    ),
    onPositiveClick(e) {
      if (newTagName.trim() === '') {
        window.$message.warning('标签名称不能为空')
        return false
      }
      loading = true
      tagCreate({name: newTagName, type: 'article'}).then(() => {
        loading = false
        getTagList()
      })
    },
  })
}

const toDetail = (id: number) => {
  router.push({
    path: '/detail',
    query: {
      id: id,
    },
  }).then(() => {
    isShowCard.value = false
  })
}

onMounted(() => {
  getTagList()
})
</script>

<template>
  <div class="tags-wrapper">
    <div class="tag-item-wrapper">
      <div class="add" @click="addNewTag">
        <n-icon size="20">
          <Add></Add>
        </n-icon>
      </div>
      <div class="tag-item" v-for="item in list">
        <span class="name" @click="getBlogList(item.articles.map(a => a.id))">
          {{ item.tag_name }}
        </span>
        <span class="value">
          {{ item.articles.length || 0 }}
        </span>
        <div class="edit">
          <n-icon
              :size="18"
              class="icon edit"
              @click="eidtTag(item)"
          >
            <Create></Create>
          </n-icon>
          <n-icon
              :size="18"
              class="icon close"
              @click="delTag(item)"
          >
            <Close></Close>
          </n-icon>
        </div>
      </div>
    </div>

    <n-modal
        v-model:show="isShowCard"
        style="
            max-width: 600px;
            position: fixed;
            top: 100px;
            left: 50%;
            transform: translateX(-50%);
        "
    >
      <n-card>
        <div class="blog-list">
          <div class="search-result">
            <div
                class="search-result-item"
                v-for="item in blogList"
                @click="toDetail(item.id)"
            >
              <div class="left-img">
                <img class="img" :src="item.cover" :alt="item.cover">
              </div>
              <div class="right-content">
                <n-ellipsis
                    :line-clamp="1"
                    :tooltip="false"
                >
                  <span class="title">{{ item.title }}</span>
                </n-ellipsis>
                <n-ellipsis
                    :line-clamp="2"
                    :tooltip="false"
                >
                  <span class="des">{{ item.des }}</span>
                </n-ellipsis>
              </div>
            </div>
          </div>
          <div class="close">
            <n-icon
                :size="22"
                class="icon"
                @click="isShowCard = false"
            >
              <Close></Close>
            </n-icon>
          </div>
        </div>
      </n-card>
    </n-modal>
  </div>
</template>

<style scoped lang="less">
.tags-wrapper {
  .tag-item-wrapper {
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    margin-top: 20px;

    .tag-item {
      box-sizing: border-box;
      background-color: var(--card-color);
      border: 2px solid var(--border-color);
      margin: 5px;
      padding: 0 5px;
      border-radius: 3px;
      cursor: pointer;
      display: flex;
      align-items: center;

      .name {
        font-size: 14px;
        color: var(--font-color);
      }

      .value {
        font-size: 13px;
        color: var(--font-color-200);
        margin-left: 5px;
      }

      .edit {
        display: flex;
        align-items: center;
        margin-left: 5px;

        .icon {
          color: var(--font-color);
        }

        .close {
          transition: all 0.45s ease-in-out;
          margin-left: 5px;

          &:hover {
            color: deeppink;
            transform: rotateZ(90deg);
          }
        }
      }

    }

    .add {
      box-sizing: border-box;
      width: 25px;
      height: 25px;
      margin: 5px;
      border: 2px solid var(--border-color);
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 3px;
      cursor: pointer;
      color: var(--font-color);
    }

  }
}

.blog-list {
  display: flex;
  max-height: 500px;
  overflow-y: auto;

  .search-result-item {
    display: flex;
    padding: 10px;
    cursor: pointer;

    .left-img {
      box-sizing: border-box;
      width: 145px;
      height: 75px;
      border-radius: 5px;
      overflow: hidden;
      flex-shrink: 0;

      .img {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .right-content {
      display: flex;
      flex-direction: column;
      padding-left: 10px;

      .title {
        font-size: 15px;
        font-weight: bolder;
        color: var(--font-color);
      }

      .des {
        font-size: 13px;
        font-weight: bold;
        color: var(--font-color-200);
      }
    }
  }

  .close {
    position: absolute;
    top: 5px;
    right: 5px;

    .icon {
      color: var(--font-color);
      cursor: pointer;
      transition: all 0.45s ease-in-out;
      display: inline-block;

      &:hover {
        transform: rotateZ(90deg);
      }
    }
  }
}

@media screen and (max-width: 1000px) {
  .blog-list {

    .search-result-item {
      padding: 5px;

      .left-img {
        box-sizing: border-box;
        width: 80px;
        height: 75px;
      }

      .right-content {
        padding-left: 5px;

        .title {
          font-size: 13px;
        }

        .des {
          font-size: 12px;
        }
      }
    }

  }

}
</style>
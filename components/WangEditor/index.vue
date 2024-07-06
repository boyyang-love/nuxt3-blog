<script setup lang="ts">
import {NSpace, NUpload, NInput, NSelect, NIcon} from 'naive-ui'
import {Add, Close} from '@vicons/ionicons5'
import {type Blog, createBlog, updateBlog} from '~/api/blog'
import {type Category, categoryList} from '@/api/categories'
import {useConfig} from '@/hooks/useConfig'
import {useFileUpload} from '@/hooks/fileUpload'
import {useTags} from '@/hooks/useTags'
import {useRouter} from 'vue-router'
import {Editor, Toolbar} from '@wangeditor/editor-for-vue'
import {useUserStore} from '@/store/modules/user'
import {addImagePrefix} from '@/utils/addImagePrefix'

const props = defineProps<{
  isEdit: boolean
  editInfo?: Blog.ListBlogItem
}>()

const {toolbarConfig, editorConfig} = useConfig()
const {imgUrl, uploadRef, customRequest} = useFileUpload()
const {list, createNewTag} = useTags('article')
const router = useRouter()
const userStore = useUserStore()

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()
const valueHtml = ref('')
const selectValues = ref<number[] | string[]>([])
const keywords = ref<string>('')
const categories = ref<Category.CategoryInfo[]>([])
const categoryValue = ref<string | number>('')
const blogInfo = reactive({
  title: '',
  des: '',
  content: '',
})

watch(() => props.editInfo, (value) => {
  if (value) {
    window.$uploadProgress.begin()
    if (editorRef.value) {
      editorRef.value && editorRef.value.setHtml(value.content)
    } else {
      valueHtml.value = value.content
    }
    blogInfo.title = value.title
    imgUrl.value = value.cover
    selectValues.value = value.tag.map(t => Number(t.id))
    keywords.value = value.keywords
    categoryValue.value = value.categories.id
    window.$uploadProgress.end()
  }
})

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})

const handleCreated = (editor: any) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}

const submit = () => {
  const des = editorRef?.value.getText()
  const content = editorRef.value?.getHtml()

  if (blogInfo.title.trim() === '' || content?.trim() === '' || keywords.value.trim() === '') {
    window.$message.warning('标题，内容，关键字，不能为空')
    return
  }

  if (props.isEdit) {
    window.$uploadProgress.begin()
    updateBlog({
      id: Number(props.editInfo?.id),
      title: blogInfo.title,
      des: des?.slice(0, 250) || '',
      cover: imgUrl.value || '',
      content: content || '',
      tags: selectValues.value.map(s => {
        return Number(s)
      }),
      keywords: keywords.value,
      category_id: Number(categoryValue.value),

    }).then(res => {
      window.$uploadProgress.end()
      valueHtml.value = ''
      blogInfo.title = ''
      imgUrl.value = ''
      keywords.value = ''
      router.back()
    })
  } else {
    window.$uploadProgress.begin()
    createBlog({
      title: blogInfo.title,
      des: des?.slice(0, 250) || '',
      cover: imgUrl.value || '',
      content: content || '',
      tags: selectValues.value.map(s => {
        return Number(s)
      }),
      keywords: keywords.value,
      category_id: Number(categoryValue.value),
    }).then(res => {
      window.$uploadProgress.end()
      valueHtml.value = ''
      blogInfo.title = ''
      imgUrl.value = ''
      keywords.value = ''
      selectValues.value = []
    })
  }
}

const delCover = () => {
  imgUrl.value = ''
}

const getCategoryList = () => {
  categoryList({user_id: userStore.user_info.id}).then((res) => {
    categories.value = res.data.info
  })
}

onMounted(() => {
  getCategoryList()
})
</script>

<template>
  <client-only>
    <div class="editor-wrapper">
      <div class="content">
        <Toolbar
            class="toolbar"
            :editor="editorRef"
            :defaultConfig="toolbarConfig"
            mode="default"
        />

        <div class="editor-body">
          <div class="title">
            <n-input
                size="large"
                placeholder="请输入标题"
                :bordered="false"
                v-model:value="blogInfo.title"
            ></n-input>
          </div>
          <Editor
              v-model="valueHtml"
              style="min-height: 600px;"
              :defaultConfig="editorConfig"
              @onCreated="handleCreated"
              mode="default"
          />
        </div>

        <div class="bottom-wrapper">
          <div class="keywords">
            <div class="title">关键字</div>
            <n-input
                type="textarea"
                placeholder="请输入关键字"
                v-model:value="keywords"
            ></n-input>
          </div>
          <div class="cover">添加封面</div>
          <div class="upload">
            <div class="img-wrapper" v-if="imgUrl">
              <div class="close" @click="delCover">
                <n-icon class="icon">
                  <Close></Close>
                </n-icon>
              </div>
              <img class="img" :src="addImagePrefix(imgUrl)" :alt="imgUrl"/>
            </div>
            <n-upload
                :custom-request="customRequest"
                :show-file-list="false"
                ref="uploadRef"
            >
              <div class="upload-btn">
                <div class="text">上传文件</div>
              </div>
            </n-upload>
          </div>
          <div class="tags">
            <div class="title">文章标签</div>
            <n-select
                v-model:value="selectValues"
                multiple
                :options="list.map(l => {return {label: l.tag_name, value: l.id}})"
                placeholder="请选择文章标签"
                filterable
            >
              <template #header>
                <div
                    class="add-wrapper"
                    style="width: 100%;
                  display: flex;
                  justify-content: center"
                >
                  <n-icon
                      size="22"
                      style="cursor: pointer"
                      @click="createNewTag('article')"
                  >
                    <Add></Add>
                  </n-icon>
                </div>
              </template>
            </n-select>
          </div>

          <div class="tags">
            <div class="title">分类标签</div>
            <n-select
                v-model:value="categoryValue"
                :options="categories.map(c => {return {label: c.name, value: c.id}})"
                placeholder="请选择文章分类标签"
                filterable
            >
            </n-select>
          </div>
        </div>

        <div class="bottom-submit">
          <div class="btn-wrapper">
            <n-space>
              <div class="btn btn-submit" @click="submit">
              <span>
                {{ isEdit ? '提交修改' : '发布' }}
              </span>
              </div>
              <div class="btn btn-exit" @click="$router.back()">
              <span>
              退出
              </span>
              </div>
            </n-space>
          </div>
        </div>
      </div>
    </div>
  </client-only>
</template>

<style scoped lang="less">
.editor-wrapper {
  box-sizing: border-box;
  width: 100%;
  display: flex;
  position: relative;

  .content {
    box-sizing: border-box;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .toolbar {
    //border-bottom: 1px solid var(--border-color);
    width: 100%;
    position: sticky;
    top: 0;
    z-index: 9;
    background: var(--bg-color);
  }


  .editor-body {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    width: 730px;
    margin-top: 20px;
    margin-bottom: 10px;

    .title {
      box-sizing: border-box;
      width: 100%;
      border-bottom: 1px solid rgba(204, 204, 204, 0.4);
      color: var(--font-color);
    }
  }

  .bottom-wrapper {
    box-sizing: border-box;
    width: 730px;
    //margin-bottom: 150px;

    .cover {
      font-size: 13px;
      color: var(--font-color);
      margin-bottom: 10px;
      font-weight: bolder;
    }

    .upload {
      box-sizing: border-box;
      width: 250px;
      height: 120px;
      border: 2px dashed rgb(102, 211, 159);
      display: flex;
      justify-content: center;
      align-items: center;
      background: var(--card-color);

      position: relative;

      .img-wrapper {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        padding: 5px;

        .close {
          box-sizing: border-box;
          width: 25px;
          height: 25px;
          display: flex;
          justify-content: center;
          align-items: center;
          position: absolute;
          top: -10px;
          right: -10px;
          background-color: rgb(102, 211, 159);
          border: 2px solid white;
          border-radius: 100%;
          transition: all 0.35s ease-in-out;
          cursor: pointer;

          &:hover {
            transform: rotateZ(90deg);
          }

          .icon {
            font-size: 18px;
            color: var(--font-color);
            padding-bottom: 2px;
          }
        }

        .img {
          box-sizing: border-box;
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 2px;
        }
      }

      :deep(.n-upload-trigger) {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        cursor: pointer;
      }

      .upload-btn {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .text {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        color: var(--font-color);
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }

    .tags {
      box-sizing: border-box;
      width: 250px;
      display: flex;
      justify-content: center;
      flex-direction: column;

      .title {
        margin: 10px 0;
        font-size: 13px;
        color: var(--font-color);
        font-weight: bolder;
      }

    }

    .keywords {

      .title {
        font-size: 13px;
        color: var(--font-color);
        font-weight: bolder;
        margin: 5px 0;
      }
    }
  }

  .bottom-submit {
    margin-top: 25px;
    box-sizing: border-box;
    width: 100%;
    position: sticky;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 0;

    .btn-wrapper {
      box-sizing: border-box;
      width: 710px;
      display: flex;
      justify-content: flex-end;

      .btn {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 5px;
        background: #183153;
        font-family: "Montserrat", sans-serif;
        box-shadow: 0 6px 24px 0 rgba(0, 0, 0, 0.2);
        overflow: hidden;
        border: none;
        cursor: pointer;
      }

      .btn:after {
        content: " ";
        width: 0;
        height: 100%;
        background: #FFD401;
        position: absolute;
        transition: all 0.4s ease-in-out;
        right: auto;
        left: auto;
      }

      .btn:hover::after {
        right: auto;
        left: auto;
        width: 100%;
      }

      .btn span {
        text-align: center;
        text-decoration: none;
        width: 100%;
        padding: 5px 25px;
        color: #fff;
        font-weight: 700;
        letter-spacing: 0.3em;
        z-index: 20;
        transition: all 0.3s ease-in-out;
      }

      .btn:hover span {
        color: #183153;
        animation: scaleUp 0.3s ease-in-out;
      }

      @keyframes scaleUp {
        0% {
          transform: scale(1);
        }

        50% {
          transform: scale(0.95);
        }

        100% {
          transform: scale(1);
        }
      }


      //.btn {
      //  box-sizing: border-box;
      //  padding: 4px 15px;
      //  font-size: 14px;
      //  font-weight: bolder;
      //  border-radius: 2px;
      //  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.5);
      //  cursor: pointer;
      //}

      .btn-preview {
        background-color: deeppink;
        color: white;
      }

      .btn-submit {
        color: whitesmoke;
        background-color: #00a497;
      }

      .btn-exit {
        background-color: #0F1C2E;
        color: white;
      }
    }
  }
}

@media screen and (max-width: 1200px) {
  .editor-wrapper {

    .editor-body {
      width: 100%;
    }

    .bottom-wrapper {
      width: 100%;
      margin-bottom: 0;
      padding: 0 20px;
    }

    .bottom-submit {
      padding-right: 10px;
    }
  }
}
</style>
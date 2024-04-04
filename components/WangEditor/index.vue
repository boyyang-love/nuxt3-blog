<script setup lang="ts">
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import {NSpace, NUpload, NInput, NSelect, NIcon} from 'naive-ui'
import {Add} from '@vicons/ionicons5'
import {type Blog, createBlog, updateBlog} from '~/api/blog'
import {useConfig} from '@/hooks/useConfig'
import {useFileUpload} from '@/hooks/fileUpload'
import {useTags} from '@/hooks/useTags'
import {useRouter} from 'vue-router'


const props = defineProps<{
  isEdit: boolean
  editInfo?: Blog.ListBlogItem
}>()

const {toolbarConfig, editorConfig} = useConfig()
const {imgUrl, uploadRef, customRequest} = useFileUpload()
const {list, createNewTag} = useTags('article')
const router = useRouter()

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()
// 内容 HTML
const valueHtml = ref('')
const selectValues = ref<number[] | string[]>([])
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

  if (blogInfo.title.trim() === '' || content?.trim() === '') {
    window.$message.warning('标题，内容，不能为空')
    return
  }

  if (props.isEdit) {
    window.$uploadProgress.begin()
    updateBlog({
      id: Number(props.editInfo?.id),
      title: blogInfo.title,
      des: des?.slice(0, 150) || '',
      cover: imgUrl.value || '',
      content: content || '',
      tags: selectValues.value.map(s => {
        return Number(s)
      }),
    }).then(res => {
      window.$message.success('文章修改成功')
      window.$uploadProgress.end()
      valueHtml.value = ''
      blogInfo.title = ''
      imgUrl.value = ''
      router.back()
    })
  } else {
    window.$uploadProgress.begin()
    createBlog({
      title: blogInfo.title,
      des: des?.slice(0, 150) || '',
      cover: imgUrl.value || '',
      content: content || '',
      tags: selectValues.value.map(s => {
        return Number(s)
      }),
    }).then(res => {
      window.$uploadProgress.end()
      window.$message.success('文章发布成功')
      valueHtml.value = ''
      blogInfo.title = ''
      imgUrl.value = ''
      selectValues.value = []
    })
  }
}

const delCover = () => {
  imgUrl.value = ''
}

</script>

<template>
  <div class="editor-wrapper">
    <div class="content">
      <WangsToolbar
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
        <WangsEditor
            v-model="valueHtml"
            style="min-height: 550px;"
            :defaultConfig="editorConfig"
            @onCreated="handleCreated"
            mode="default"
        />
      </div>

      <div class="bottom-wrapper">
        <div class="cover">添加封面</div>
        <div class="upload">
          <div class="img-wrapper" v-if="imgUrl">
            <div class="close" @click="delCover">
              <nuxt-icon class="icon" name="other/close"></nuxt-icon>
            </div>
            <img class="img" :src="imgUrl" :alt="imgUrl"/>
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

      </div>


      <div class="bottom-submit">
        <div class="btn-wrapper">
          <n-space>
            <div class="btn btn-submit" @click="submit">{{ isEdit ? '提交修改' : '发布' }}</div>
            <div class="btn btn-exit" @click="$router.back()">退出</div>
          </n-space>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.editor-wrapper {
  box-sizing: border-box;
  width: 100%;
  display: flex;

  .content {
    box-sizing: border-box;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .toolbar {
    border-bottom: 1px solid #ccc;
    width: 100%;
    position: sticky;
    top: 0;
    z-index: 9;
  }


  .editor-body {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    width: 730px;
    margin-top: 20px;
    margin-bottom: 10px;

    //:deep(.w-e-scroll) {
    //  overflow: hidden !important;
    //}

    .title {
      box-sizing: border-box;
      width: 100%;
      border-bottom: 1px solid rgba(204, 204, 204, 0.4);
    }
  }

  .bottom-wrapper {
    box-sizing: border-box;
    width: 730px;
    //margin-bottom: 150px;

    .cover {
      font-size: 13px;
      color: #1f2b3e;
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
      background: white;
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
            color: white;
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
        color: #1f2b3e;
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
        color: #1f2b3e;
        font-weight: bolder;
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
    background: whitesmoke;
    padding: 10px 0;

    .btn-wrapper {
      box-sizing: border-box;
      width: 710px;
      display: flex;
      justify-content: flex-end;

      .btn {
        box-sizing: border-box;
        padding: 4px 15px;
        font-size: 14px;
        font-weight: bolder;
        border-radius: 2px;
        box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.5);
        cursor: pointer;
      }

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
<script setup lang="ts">
import CategoriesCard from '@/components/CategoriesCard/index.vue'
import {NIcon, NModal, NInput, NSpace, NButton, NUpload} from 'naive-ui'
import {Add, Close, TrashBin} from '@vicons/ionicons5'
import {useFileUpload} from '@/hooks/fileUpload'
import {type Category, categoryCreate, categoryList, categoryUpdate} from '@/api/categories'
import {useUserStore} from '@/store/modules/user'
import {env} from '~/utils/env'
import {useSearchResStore} from '@/store/modules/searchRes'
import {addImagePrefix} from '~/utils/addImagePrefix'

type ModalType = 'create' | 'edit'
type List = Category.CategoryInfo & { path: string }

const userStore = useUserStore()
const searchResStore = useSearchResStore()

const list = ref<List[]>([])
const isShowModal = ref<boolean>(false)
const modelType = ref<ModalType>('create')
const modalTitle = ref<string>('新增分类')
const loading = ref<boolean>(false)
const editId = ref<number>(0)
const title = ref<string>('')
const des = ref<string>('')
const cover = ref<string>('')
const imgUrl = ref<string>('')

const {customRequest} = useFileUpload('categories', (info) => {
  imgUrl.value = info.FileInfo.file_url
  cover.value = info.FileInfo.file_baseurl
})

const openModal = (type: ModalType) => {
  modelType.value = type
  modalTitle.value = type === 'create' ? '新增分类' : '修改分类'
  isShowModal.value = true
}

const closeModal = () => {
  isShowModal.value = false
  title.value = ''
  des.value = ''
  cover.value = ''
  imgUrl.value = ''
}

const sub = () => {
  loading.value = true
  if (title.value.trim() === '' || des.value.trim() === '' || cover.value?.trim() === '') {
    window.$message.warning('标题,描述,图片为必传项！')
    loading.value = false
    return
  }

  if (modelType.value === 'create') {
    window.$uploadProgress.begin()
    categoryCreate(
        {
          name: title.value,
          des: des.value,
          cover: cover.value,
        },
    ).then(() => {
      isShowModal.value = false
      loading.value = false
      title.value = ''
      des.value = ''
      cover.value = ''
      imgUrl.value = ''
      window.$uploadProgress.end()
      getList()
    }).catch(() => {
      loading.value = false
      window.$uploadProgress.end()
    })
  } else {
    categoryUpdate(
        {
          id: editId.value,
          name: title.value,
          des: des.value,
          cover: cover.value,
        },
    ).then(() => {
      isShowModal.value = false
      loading.value = false
      title.value = ''
      des.value = ''
      cover.value = ''
      imgUrl.value = ''
      getList()
    }).catch(() => {
      loading.value = false
    })
  }
}

const getList = () => {
  categoryList({user_id: userStore.user_info.id}).then((res) => {
    list.value = res.data.info.map(info => {
      return {
        ...info,
        cover: info.cover,
        path: info.cover,
      }
    })
  })
}

const update = (item: List) => {
  openModal('edit')
  editId.value = item.id
  title.value = item.name
  des.value = item.des
  imgUrl.value = item.cover
  cover.value = item.path
}

const toDetail = (id: number) => {
  searchResStore.setToType('detail')
  searchResStore.search(id, userStore.user_info.id)
  searchResStore.show = true
}

onMounted(() => {
  getList()
})
</script>

<template>
  <client-only>
    <div class="categories-wrapper">
      <div class="categories-content">
        <div class="crate-wrapper">
          <n-icon
              class="icon"
              size="22"
              @click="openModal('create')"
          >
            <Add></Add>
          </n-icon>
        </div>
        <div class="categories-items" v-for="item in list">
          <CategoriesCard
              :id="item.id"
              :title="item.name"
              :cover="item.cover"
              :des="item.des"
              @update="update(item)"
              @detail="toDetail"
          ></CategoriesCard>
        </div>
      </div>

      <div class="card">
        <n-modal
            v-model:show="isShowModal"
        >
          <div class="modal-wrapper">
            <div :class="['top-img', imgUrl ? 'show-trash' : '']">
              <div class="img-wrapper">
                <n-upload
                    :show-file-list="false"
                    :custom-request="customRequest"
                    class="upload"
                    v-if="!imgUrl"
                >
                  <div class="upload-wrapper">
                    <n-icon size="26">
                      <Add></Add>
                    </n-icon>
                  </div>
                </n-upload>
                <img
                    class="img"
                    :src="addImagePrefix(imgUrl)"
                    alt=""
                    v-else
                >
              </div>
              <div class="box" v-if="imgUrl"></div>
              <div
                  class="del-wrapper"
                  v-if="imgUrl"
                  @click="imgUrl = ''"
              >
                <n-icon
                    size="20"
                    class="icon"
                >
                  <TrashBin></TrashBin>
                </n-icon>
              </div>
            </div>
            <div class="input-wrapper">
              <n-space vertical>
                <n-input
                    placeholder="请输入分类名称"
                    maxlength="10"
                    show-count
                    v-model:value="title"
                ></n-input>
                <n-input
                    placeholder="请输入描述"
                    type="textarea"
                    maxlength="30"
                    :autosize="{
                      minRows: 2,
                      maxRows: 3,
                  }"
                    show-count
                    v-model:value="des"
                ></n-input>
              </n-space>
            </div>
            <div class="sub-btn">
              <n-button
                  type="error"
                  size="small"
                  :loading="loading"
                  @click="sub"
              >
                提交
              </n-button>
            </div>
            <div class="close">
              <n-icon
                  class="icon"
                  size="20"
                  @click="closeModal"
              >
                <Close></Close>
              </n-icon>
            </div>
            <div class="title">{{ modalTitle }}</div>
          </div>
        </n-modal>
      </div>
    </div>
  </client-only>
</template>

<style scoped lang="less">
.categories-wrapper {
  box-sizing: border-box;
  width: 100%;
  padding: 10px;

  .categories-content {
    box-sizing: border-box;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 10px;

    .categories-items {
      box-sizing: border-box;
      width: 100%;
      height: 100px;
    }

    .crate-wrapper {
      box-sizing: border-box;
      width: 100%;
      height: 100px;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 2px solid var(--border-color);
      border-radius: 5px;
      cursor: pointer;


      .icon {
        color: var(--font-color);
      }
    }
  }
}

.modal-wrapper {
  box-sizing: border-box;
  width: 270px;
  background-color: var(--card-color);
  box-shadow: 3px 3px 5px rgba(17, 17, 17, 0.4);
  border-radius: 5px;
  padding: 45px 10px 0;
  position: relative;
  overflow: hidden;

  .top-img {
    box-sizing: border-box;
    width: 100%;
    height: 100px;
    display: flex;
    margin-bottom: 15px;
    transition: all 0.45s ease-in-out;

    .img-wrapper {
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 250px;
      height: 100%;
      flex-shrink: 0;
      border: 1px solid var(--border-color);
      border-radius: 5px;
      cursor: pointer;

      .img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 5px;
      }

      .upload {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .upload-wrapper {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }

    .box {
      flex-shrink: 0;
      width: 10px;
      height: 100%;
    }

    .del-wrapper {
      display: flex;
      align-items: center;
      background-color: deeppink;
      padding: 0 10px;
      //margin-left: 10px;
      border-radius: 5px;
      cursor: pointer;

      .icon {
        color: whitesmoke;
      }
    }
  }

  .show-trash {
    transition: all 0.45s ease-in-out;

    &:hover {
      transform: translateX(-50px);
    }
  }

  .sub-btn {
    display: flex;
    justify-content: flex-end;
    padding: 10px 0;
  }

  .close {
    position: absolute;
    top: 5px;
    right: 5px;

    .icon {
      cursor: pointer;
      color: var(--font-color);
      transition: all 0.45s ease-in-out;

      &:hover {
        transform: rotateZ(90deg);
      }
    }
  }

  .title {
    position: absolute;
    top: 5px;
    left: 5px;
    color: var(--font-color);
    font-size: 14px;
  }
}

@media screen and (max-width: 700px) {
  .categories-wrapper {
    .categories-content {
      grid-template-columns: repeat(1, 1fr);
    }
  }
}
</style>
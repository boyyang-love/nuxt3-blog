<script setup lang="ts">
import {NInput, NIcon, NDropdown, NSpace, NCard, NModal, NButton, NEllipsis, NEmpty} from 'naive-ui'
import {
  Menu,
  Search,
  FingerPrint,
  Rocket,
  Exit,
  Planet,
  Home,
  Cube,
  Image,
  Images,
  Create,
  CloudUpload,
  Information,
  List,
  Card,
  Key,
  Close,
} from '@vicons/ionicons5'
import {renderIcon} from '@/utils/renderIcon'
import {useRouter} from 'vue-router'
import {useUserStore} from '@/store/modules/user'
import {updateUserPassword} from '@/api/user'
import {searchBykeyword, type SearchApi} from '@/api/search'
import {useSearchStore} from '@/store/modules/search'

const router = useRouter()
const userStore = useUserStore()
const searchStore = useSearchStore()
const isShowSearch = ref<boolean>(false)
const keyword = ref<string>('')
const searchResult = ref<SearchApi.SearchInfo[]>([])

const options = computed(() => {
  if (userStore.token) {
    return [
      {
        label: '首页',
        key: 4,
        icon: renderIcon(Home),
      },
      {
        label: '账号',
        key: 'message',
        icon: renderIcon(FingerPrint),
        children: [
          {
            label: '登录',
            key: 2,
            icon: renderIcon(Planet),
          },
          {
            label: '注册',
            key: 3,
            icon: renderIcon(Rocket),
          },
          {
            label: '信息',
            key: 1,
            icon: renderIcon(Information),
          },
          {
            label: '卡片',
            key: 9,
            icon: renderIcon(Card),
          },
          {
            label: '密码',
            key: 11,
            icon: renderIcon(Key),
          },
        ],
      },
      {
        label: '博客',
        icon: renderIcon(Cube),
        key: 'blog',
        children: [
          {
            label: '博客列表',
            key: 5,
            icon: renderIcon(List),
          },
          {
            label: '发布博客',
            key: 7,
            icon: renderIcon(Create),
          },
        ],
      },
      {
        label: '图片',
        key: 'images',
        icon: renderIcon(Image),
        children: [
          {
            label: '图片列表',
            key: 6,
            icon: renderIcon(Images),
          },
          {
            label: '上传图片',
            key: 8,
            icon: renderIcon(CloudUpload),
          },
        ],
      },
      {
        label: '退出',
        key: 10,
        icon: renderIcon(Exit),
      },
    ]
  } else {
    return [
      {
        label: '首页',
        key: 4,
        icon: renderIcon(Home),
      },
      {
        label: '账号',
        key: 'message',
        icon: renderIcon(FingerPrint),
        children: [
          {
            label: '登录',
            key: 2,
            icon: renderIcon(Planet),
          },
          {
            label: '注册',
            key: 3,
            icon: renderIcon(Rocket),
          },
        ],
      },
      {
        label: '博客',
        key: 5,
        icon: renderIcon(Cube),
      },
      {
        label: '卡片',
        key: 9,
        icon: renderIcon(Card),
      },
    ]
  }

})
const handleSelect = (key: string | number) => {
  if (key === 1) {
    userStore.showUserInfoModal = true
    return
  }
  if (key === 2) {
    userStore.isSignin = true
    userStore.showSigninModal = true
  }
  if (key === 3) {
    userStore.isSignin = false
    userStore.showSigninModal = true
  }
  if (key === 4) {
    router.push('/home')
  }
  if (key === 5) {
    router.push('/blog')
  }
  if (key === 6) {
    router.push('/wallpaper')
  }
  if (key === 7) {
    router.push('/create')
  }
  if (key === 8) {
    router.push('/upload')
  }
  if (key === 9) {
    router.push('/')
  }
  if (key === 10) {
    window.localStorage.clear()
    router.replace('/').then(() => {
      location.reload()
    })
    return
  }

  if (key === 11) {
    let password = ''
    let repassword = ''
    window.$dialog.create({
      title: '密码修改',
      type: 'info',
      showIcon: true,
      positiveText: '提交修改',
      negativeText: '取消',
      content: () => h(NSpace, {vertical: true, size: 'large'}, () => [
        h(NInput, {
          placeholder: '请输入密码',
          type: 'password',
          showPasswordOn: 'click',
          onChange: (e) => {
            console.log(e)
            password = e
          },
        }, () => []),
        h(NInput, {
          placeholder: '请输入重复密码',
          type: 'password',
          showPasswordToggle: true,
          onChange: (e) => {
            console.log(e)
            repassword = e
          },
        }, () => []),
      ]),
      onPositiveClick: () => {
        if (password.trim() === '' || repassword.trim() === '') {
          window.$message.warning('密码不能为空')
          return false
        }
        if (password !== repassword) {
          window.$message.error('密码不一致')
          return false
        }

        window.$uploadProgress.begin()
        updateUserPassword({password: password}).then(() => {
          window.$uploadProgress.end()
          window.$message.success('密码修改成功')
        }).catch(() => {
          window.$uploadProgress.end()
        })
      },
    })
  }
}

const search = () => {
  isShowSearch.value = true
}

const searchSubmit = () => {
  if (keyword.value.trim() === '') {
    window.$message.warning('搜索内容不能为空')
    return
  }
  searchStore.setKeywords(keyword.value)
  searchBykeyword({keyword: keyword.value, type: 'article'}).then((res) => {
    searchResult.value = res.data.infos
  })
}

const toDeatil = (id: number) => {
  router.push({
    path: '/detail',
    query: {
      id: id,
    },
  }).then(() => {
    isShowSearch.value = false
  })
}

const delKeyword = (keyword: string) => {
  searchStore.delKeyword(keyword)
}

const searchByHistory = (word: string) => {
  keyword.value = word
  searchSubmit()
}
</script>

<template>
  <div class="content-top">
    <div class="search-input">
      <n-icon
          size="20"
          class="icon"
          @click="search"
      >
        <Search></Search>
      </n-icon>
    </div>
    <div class="menu">
      <n-dropdown
          trigger="hover"
          placement="bottom-end"
          :options="options"
          @select="handleSelect"
      >
        <n-icon size="24" class="icon">
          <Menu></Menu>
        </n-icon>
      </n-dropdown>
    </div>
    <n-modal
        v-model:show="isShowSearch"
        class="custom-card"
        size="huge"
        :bordered="false"
        style="
            width: 600px;
            position: fixed;
            top: 100px;
            left: 50%;
            transform: translateX(-50%);
        "
    >
      <n-card
          style="width: 600px"
          :bordered="false"
          size="huge"
          role="dialog"
          aria-modal="true"
      >
        <div class="content-wrapper">
          <div class="search">
            <n-input
                class="input"
                placeholder="请输入关键字"
                v-model:value="keyword"
                @keydown.enter="searchSubmit"
            ></n-input>
            <n-button
                type="default"
                @click="searchSubmit"
            >
              <n-icon
                  size="20"
                  class="icon"
                  @click="search"
              >
                <Search></Search>
              </n-icon>
            </n-button>
          </div>
          <div class="history-word">
            <div
                class="keyword-item"
                v-for="item in searchStore.keywords"
            >
              <span class="text" @click="searchByHistory(item)">{{ item }}</span>
              <div class="del-icon">
                <n-icon
                    size="14"
                    class="icon"
                    @click="delKeyword(item)"
                >
                  <Close></Close>
                </n-icon>
              </div>
            </div>
          </div>
          <n-empty v-if="searchResult.length === 0"></n-empty>
          <div class="search-result" v-else>
            <div
                class="search-result-item"
                v-for="item in searchResult"
                @click="toDeatil(item.id)"
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
        </div>
        <div class="close">
          <n-icon
              size="22"
              class="icon"
              @click="isShowSearch = false"
          >
            <Close></Close>
          </n-icon>
        </div>
      </n-card>
    </n-modal>
  </div>
</template>

<style scoped lang="less">
.content-top {
  box-sizing: border-box;
  padding: 5px 20px;
  width: 100%;
  height: 50px;
  background-color: var(--center-top-bg);
  display: flex;
  align-items: center;
  justify-content: space-between;

  .search-input,
  .menu {
    display: flex;
    align-items: center;

    .icon {
      font-weight: bold;
      cursor: pointer;
      color: var(--font-color);
    }
  }
}

.custom-card {
  .content-wrapper {
    .search {
      box-sizing: border-box;
      display: flex;

      .input {
        margin-right: 20px;
      }
    }

    .history-word {
      display: flex;
      flex-wrap: wrap;
      margin: 10px 0;

      .keyword-item {
        padding: 0 10px 0 0;
        border-radius: 3px;
        margin: 3px 2px;
        cursor: pointer;
        position: relative;

        .text {
          color: var(--font-color-200);
        }

        .del-icon {
          position: absolute;
          top: -5px;
          right: -5px;
          display: none;
          transition: all 0.4s ease-in-out;
        }

        &:hover {
          .del-icon {
            display: inline-block;
          }
        }
      }
    }

    .search-result {
      box-sizing: border-box;
      border-radius: 5px;
      height: 350px;
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
    }
  }

  .close {
    position: absolute;
    top: 5px;
    right: 5px;

    .icon {
      cursor: pointer;
      transition: all 0.45s ease-in-out;
      color: var(--font-color);

      &:hover {
        transform: rotateZ(90deg);
      }
    }
  }
}
</style>
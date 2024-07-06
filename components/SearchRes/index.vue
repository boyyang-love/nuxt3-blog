<script setup lang="ts">
import {NCard, NEllipsis, NIcon, NModal, NEmpty} from 'naive-ui'
import {Close} from '@vicons/ionicons5'
import {useSearchResStore} from '@/store/modules/searchRes'
import {useRouter} from 'vue-router'
import {addImagePrefix} from '~/utils/addImagePrefix'

const searchResStore = useSearchResStore()
const router = useRouter()

const toDetail = (id: number) => {
  router.push({
    path: `/${searchResStore.toType}`,
    query: {
      id: id,
      user_id: searchResStore.user_id
    },
  }).then(() => {
    searchResStore.show = false
  })
}
</script>

<template>
  <n-modal
      :show="searchResStore.show"
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
          <div class="empty" v-if="searchResStore.searchRes.length === 0">
            <n-empty></n-empty>
          </div>
          <div
              class="search-result-item"
              v-for="item in searchResStore.searchRes"
              @click="toDetail(item.id)"
          >
            <div class="left-img">
              <img class="img" :src="addImagePrefix(item.cover)" :alt="item.cover">
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
              @click="searchResStore.show = false"
          >
            <Close></Close>
          </n-icon>
        </div>
      </div>
    </n-card>
  </n-modal>

</template>

<style scoped lang="less">
.blog-list {
  display: flex;
  max-height: 500px;
  overflow-y: auto;

  .search-result {
    box-sizing: border-box;
    width: 100%;

    .empty {
      width: 100%;
      padding: 100px 0;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }


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
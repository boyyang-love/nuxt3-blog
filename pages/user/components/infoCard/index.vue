<script setup lang="ts">
import {NSpace} from 'naive-ui'
import {useRouter} from 'vue-router'

const router = useRouter()
const addNewArticle = () => {
  router.push('/create')
}
</script>

<template>
  <div class="info-card-wrapper">
    <div class="info-top">
      <div class="info-count">
        <span class="name">文章</span>
        <span class="value">100</span>
      </div>
      <div class="info-count">
        <span class="name">壁纸</span>
        <span class="value">500</span>
      </div>
      <div class="info-count">
        <span class="name">关注</span>
        <span class="value">10</span>
      </div>
    </div>
    <div class="info-bottom">
      <n-space>
        <div class="add-new" @click="addNewArticle">
          发布文章
        </div>
        <div class="add-new">
          上传壁纸
        </div>
      </n-space>
    </div>
  </div>
</template>

<style scoped lang="less">
.info-card-wrapper {
  box-sizing: border-box;
  width: 100%;
  padding: 10px;

  .info-top {
    display: flex;
    justify-content: space-around;

    .info-count {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;

      .name {
        font-size: 14px;
        font-weight: bolder;
        color: whitesmoke;
      }

      .value {
        font-size: 13px;
        color: rgb(176, 193, 235);
      }
    }
  }

  .info-bottom {
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px 0;

    .add-new {
      padding: 5px 15px;
      background-color: white;
      cursor: pointer;
      border-radius: 5px;
      font-size: 13px;
      font-weight: bolder;
    }
  }
}
</style>
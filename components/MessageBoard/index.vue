<script setup lang="ts">
import {NInput, NSpace, NEmpty} from 'naive-ui'
import Title from '@/components/Title/index.vue'
import {type Comment, createComment} from '@/api/comment'
import moment from 'moment'
import {useUserStore} from '@/store/modules/user'

const props = defineProps<{
  comments: Comment.CommentInfo[]
}>()

const userStore = useUserStore()
const text = ref<string>('')

const submit = () => {
  if (text.value.trim() === '') {
    window.$message.error('留言不能为空')
    return
  }

  if (!userStore.token) {
    window.$dialog.error({
      title: '提示',
      content: '您需要先登录，才能留言',
    })
    return
  } else {
    createComment({
      content: text.value,
      type: 'website',
    })
  }
}
</script>

<template>
  <div class="message-board-wrapper">
    <div class="title">
      <Title title="最新留言" padding="10px 0" :more="false"></Title>
    </div>
    <div class="empty" v-if="comments.length === 0">
      <n-empty></n-empty>
    </div>
    <div
        v-else
        class="message-info"
        v-for="item in comments"
    >
      <div class="avatar">
        <img class="img" :src="item.user.avatar" alt="">
      </div>
      <div class="message">
        <div class="user-name-time">
          <span class="name">{{ item.user.uid }}</span>
          <span class="point"></span>
          <span class="time">{{ moment(item.created).format('YYYY-MM-DD') }}</span>
        </div>
        <div class="message-content">
          {{ item.content }}
        </div>
      </div>
    </div>
    <div class="comment">
      <n-input
          type="textarea"
          placeholder="请输入您的留言"
          :autosize="{
              maxRows: 5,
              minRows: 3,
          }"
          clearable
          show-count
          maxlength="100"
          :input-props="{
            color: 'rgba(242, 243, 245, 1)'
          }"
          v-model:value="text"
      ></n-input>

      <div class="bottom-btn">
        <div class="btn" @click="submit">发表评论</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.message-board-wrapper {
  box-sizing: border-box;
  border-radius: 5px;
  padding-bottom: 20px;

  .message-info {
    @wh: 45px;
    display: flex;
    padding: 5px 0;

    .avatar {
      box-sizing: border-box;
      width: @wh;
      height: @wh;
      border-radius: 5px;
      overflow: hidden;
      margin-right: 10px;
      display: flex;
      flex-shrink: initial;
      border: 2px solid whitesmoke;


      .img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .message {
      box-sizing: border-box;
      display: flex;
      width: calc(100% - @wh);
      flex-direction: column;

      .user-name-time {
        font-size: 12px;
        font-weight: 500;
        display: flex;
        align-items: center;

        .point {
          display: inline-block;
          box-sizing: border-box;
          width: 3px;
          height: 3px;
          background-color: rgba(17, 17, 17, 1);
          border-radius: 50%;
          margin: 0 5px;
        }

        .time {
          font-size: 12px;
        }
      }

      .message-content {
        color: #1f2b3e;
        font-size: 12px;
        font-weight: bold;
      }
    }
  }

  .comment {
    box-sizing: border-box;
    width: 100%;
    margin: 10px 0;

    .bottom-btn {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      flex-direction: row;
      margin-top: 10px;

      .emoji-wrapper {
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
        padding-top: 10px;

        :deep(.V3Emoji-module__emoji-item___aCxWs) {
          display: flex;
        }
      }

      .face {
        font-size: 18px;
        color: whitesmoke;
        cursor: pointer;
      }

      .btn {
        color: whitesmoke;
        background-color: rgb(82, 99, 138);
        font-size: 10px;
        padding: 5px 10px;
        border-radius: 5px;
        cursor: pointer;
      }
    }
  }
}
</style>
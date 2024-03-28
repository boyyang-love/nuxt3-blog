<script setup lang="ts">
import {type Comment} from '~/api/comment'
import moment from 'moment'

const props = defineProps<{
  info: Comment.CommentInfo
}>()
</script>

<template>
  <div class="message-wrapper">
    <div class="avatar">
      <img class="img" :src="info.user.avatar" alt="">
    </div>
    <div class="message-content">
      <div class="message">
        <div class="user-name-time">
          <span class="name">{{ info.user.username }}</span>
          <span class="point"></span>
          <span class="time">{{ moment(info.created).format('YYYY-MM-DD hh:mm:ss') }}</span>
        </div>
        <div class="message-text">
          {{ info.content }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.message-wrapper {
  margin: 10px 0;
  display: flex;
  padding: 0 10px;

  .avatar {
    box-sizing: border-box;
    width: 45px;
    height: 45px;
    border-radius: 5px;
    overflow: hidden;
    border: 2px solid rgba(17, 17, 17, 1);
    margin-right: 15px;

    .img {
      width: 100%;
      height: 100%;
      object-fit: cover;

    }
  }

  .message-content {
    box-sizing: border-box;
    width: calc(100% - 45px);
    display: flex;

    .message {
      box-sizing: border-box;
      display: flex;
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
          background-color: rgba(17, 17, 17, 0.4);
          border-radius: 50%;
          margin: 0 5px;
        }
      }

      .message-text {
        font-size: 12px;
        text-align: left;
        margin-top: 3px;
        font-weight: 700;
      }
    }

  }
}
</style>
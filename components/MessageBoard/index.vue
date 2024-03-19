<script setup lang="ts">
import {NInput, NSpace} from 'naive-ui'
import V3Emoji from 'vue3-emoji'
import 'vue3-emoji/dist/style.css'
import CardTitle from '@/components/CardTitle/index.vue'
</script>

<template>
  <div class="message-board-wrapper">
    <div class="title">
      <CardTitle></CardTitle>
    </div>
    <div class="message-info" v-for="item in 5">
      <div class="avatar">
        <img class="img" src="@/assets/image/wolp.jpg" alt="">
      </div>
      <div class="message">
        <div class="user-name-time">
          <span class="name">章志平</span>
          <span class="point"></span>
          <span class="time">2023-04-03</span>
        </div>
        <div class="message-content">
          很好，非常好，我喜欢
          很好，非常好，我喜欢
          很好，非常好，我喜欢
          很好，非常好，我喜欢
          很好，非常好，我喜欢
        </div>
      </div>
    </div>
    <div class="comment">
      <n-input
          type="textarea"
          placeholder="请输入您的评论"
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
      ></n-input>


      <div class="bottom-btn">
        <n-space align="center" size="small">
          <div>
            <client-only>
              <V3Emoji
                  :recent="true"
                  skin="dark"
                  size="mid"
                  fulldata
              >
                <div class="emoji-wrapper">
                  <nuxt-icon class="face" name="emoji/FaceActivatedFilled"></nuxt-icon>
                </div>
              </V3Emoji>
            </client-only>
          </div>
          <div class="btn">发表评论</div>
        </n-space>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.message-board-wrapper {
  box-sizing: border-box;
  background-color: rgb(33, 43, 61);
  border-radius: 5px;
  box-shadow: 2px 5px 5px rgba(0, 0, 0, 0.5), -2px 0 5px rgba(0, 0, 0, 0.5);
  padding: 10px;

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
        font-size: 11px;
        font-weight: 500;
        color: rgba(134, 144, 156, 1);
        display: flex;
        align-items: center;

        .point {
          display: inline-block;
          box-sizing: border-box;
          width: 3px;
          height: 3px;
          background-color: rgba(134, 144, 156, 1);
          border-radius: 50%;
          margin: 0 5px;
        }
      }

      .message-content {
        font-size: 11px;
        color: #acc2ef;
        text-align: left;
        margin-top: 3px;
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
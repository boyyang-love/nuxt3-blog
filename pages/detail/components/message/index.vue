<script setup lang="ts">

</script>

<template>
  <div class="message-wrapper">
    <div class="avatar">
      <img class="img" src="@/assets/image/wolp.jpg" alt="">
    </div>
    <div class="message-content">
      <div class="message">
        <div class="user-name-time">
          <span class="name">章志平</span>
          <span class="point"></span>
          <span class="time">2023-04-03</span>
        </div>
        <div class="message-text">
          很好，非常好，我喜欢
          很好，非常好，我喜欢
          很好，非常好，我喜欢
          很好，非常好，我喜欢
          很好，非常好，我喜欢
          很好，非常好，我喜欢
          很好，非常好，我喜欢
          很好，非常好，我喜欢
          很好，非常好，我喜欢
          很好，非常好，我喜欢
          很好，非常好，我喜欢
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
@wh: 55px;
.message-wrapper {
  margin: 10px 0;
  display: flex;
  padding: 0 10px;

  .avatar {
    box-sizing: border-box;
    width: @wh;
    height: @wh;
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
    width: calc(100% - @wh);
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

      .message-text{
        font-size: 12px;
        text-align: left;
        margin-top: 3px;
        font-weight: 700;
      }
    }

  }
}
</style>
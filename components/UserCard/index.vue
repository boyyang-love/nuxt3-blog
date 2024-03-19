<script setup lang="ts">

</script>

<template>
  <div class="user-card-wrapper">
    <div class="avatar">
      <img class="img" src="@/assets/image/wolp.jpg" alt="">
    </div>
    <div class="info">
      <div class="user-name">
        boyyang
      </div>
      <div class="motto">
        第一行没有你，第二行没有你，第三行没有也罢！
      </div>

      <div class="count">
        <div class="count-item">
          <span class="name">文章</span>
          <span class="value">100</span>
        </div>

        <div class="count-item">
          <span class="name">壁纸</span>
          <span class="value">100</span>
        </div>

        <div class="count-item">
          <span class="name">关注</span>
          <span class="value">100</span>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped lang="less">
@wh: 100px;
@top: 35px;
.user-card-wrapper {
  box-sizing: border-box;
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  //align-items: center;
  padding-top: (@wh - @top);
  //border-bottom: 2px solid #acc2ef;
  padding-bottom: 30px;
  background-color: rgb(33, 43, 61);
  border-radius: 5px;
  box-shadow: 2px 5px 5px rgba(0, 0, 0, 0.5), -2px 0 5px rgba(0, 0, 0, 0.5);
  margin-bottom: 10px;


  .avatar {
    position: absolute;
    width: @wh;
    height: @wh;
    top: -@top;
    border-radius: 10px;
    overflow: hidden;
    border: 3px solid whitesmoke;
    box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.5);

    .img {
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .info {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 5px;

    .user-name {
      font-size: 20px;
      color: whitesmoke;
      margin-top: 5px;
    }

    .motto {
      margin-top: 10px;
      font-size: 12px;
      color: #acc2ef;
      text-align: center;
    }

    .count {
      box-sizing: border-box;
      width: 100%;
      display: flex;
      justify-content: space-around;
      margin-top: 20px;

      .count-item {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        .name {
          color: whitesmoke;
          font-size: 13px;
          font-weight: bolder;
        }

        .value {
          font-size: 12px;
          color: #acc2ef;
          margin-top: 6px;
        }
      }
    }
  }

}
</style>
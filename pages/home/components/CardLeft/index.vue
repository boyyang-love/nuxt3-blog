<script setup lang="ts">

</script>

<template>
  <div class="card-wrapper">
    <div class="card-cover">
      <img class="img" src="@/assets/image/wolp.jpg" alt=""/>
    </div>
    <div class="bottom-wrapper">
      <div class="tags">
        <div class="tag">科技</div>
      </div>
      <div class="title">
        前端开发的未来趋势
      </div>
      <div class="sub-title">
        2000年后出生的一代人，他们在社交方面与前几代人有着很大的不同...
      </div>
      <div class="user-info">
        <div class="avatar">
          <img
              src="https://img.jsdesign2.com/assets/img/65718aef99920a4223e2b882.png#efc83912e32238a3f619affeaf71a861"
              alt=""
              class="img"
          >
        </div>
        <div class="info">
          <div class="name">鲁志娟</div>
          <div class="time">
            <span>1972-01-01</span>
            <div class="point"></div>
            <span>21:56:23</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.card-wrapper {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  border-radius: 10px;

  .card-cover {
    box-sizing: border-box;
    border-radius: 5px;
    overflow: hidden;
    border: 2px solid whitesmoke;
    flex: 3;

    .img {
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .bottom-wrapper {
    display: flex;
    flex-direction: column;
    flex: 2;
    .tags {
      display: flex;
      margin: 10px 0;

      .tag {
        padding: 1px 8px;
        color: #1f2b3e;
        background-color: rgb(211, 231, 253);
        border-radius: 4px;
        font-size: 12px;
      }
    }

    .title {
      font-size: 13px;
      font-weight: 700;
      color: whitesmoke;
      margin-bottom: 10px;
    }

    .sub-title {
      font-size: 12px;
      font-weight: 400;
      color: whitesmoke;
    }

    .user-info {
      display: flex;
      margin-top: 10px;

      .avatar {
        box-sizing: border-box;
        width: 38px;
        height: 38px;
        overflow: hidden;
        border-radius: 5px;

        .img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      .info {
        margin-left: 10px;

        .name {
          font-size: 12px;
          font-weight: 500;
          color: whitesmoke;
        }

        .time {
          font-size: 11px;
          font-weight: 400;
          color: rgb(176,193,235);
          display: flex;
          align-items: center;

          .point {
            width: 3px;
            height: 3px;
            border-radius: 100%;
            background-color: whitesmoke;
            margin: 0 5px;
          }
        }
      }
    }

  }
}
</style>
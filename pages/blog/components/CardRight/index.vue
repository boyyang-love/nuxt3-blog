<script setup lang="ts">

</script>

<template>
  <div class="card-wrapper">
    <div class="card-cover">
      <img class="img" src="@/assets/image/wolp.jpg" alt=""/>
    </div>
    <div class="bottom-wrapper">
      <div class="title">
        前端开发的未来趋势
      </div>
      <div class="sub-title">
        2000年后出生的一代人，他们在社交方面与前几代人有着很大的不同...
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.card-wrapper {
  box-sizing: border-box;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 15px;

  .card-cover {
    box-sizing: border-box;
    //width: 150px;
    border-radius: 5px;
    overflow: hidden;
    border: 2px solid whitesmoke;
    flex: 1;
    .img {
      box-sizing: border-box;
      width: 100%;
      aspect-ratio: 3/1.5;
      object-fit: cover;
    }
  }

  .bottom-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
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
      font-size: 12px;
      font-weight: 700;
      color: whitesmoke;
      margin-bottom: 2px;
    }

    .sub-title {
      font-size: 11px;
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
        border-radius: 100%;

        .img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      .info {
        margin-left: 16px;

        .name {
          font-size: 12px;
          font-weight: 500;
          color: whitesmoke;
        }

        .time {
          font-size: 11px;
          font-weight: 400;
          color: whitesmoke;
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
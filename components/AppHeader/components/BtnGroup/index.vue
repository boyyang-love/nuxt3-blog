<script setup lang="ts">

</script>

<template>
  <div class="btn-group-wrapper">
    <div class="user-avatar">
      <nuxt-link to="/user">
        <img
            class="img"
            src="https://img.jsdesign2.com/assets/img/65783b661fc23784eeda78d2.png#716e3652e7cba13c425a5d5f3f101dd1"
            alt=""
        >
      </nuxt-link>
    </div>
    <div class="menu">
      <NuxtIcon
          class="icon"
          name="header/menu"
      />
    </div>
  </div>
</template>

<style scoped lang="less">
.btn-group-wrapper {
  display: flex;
  align-items: center;

  .user-avatar {
    box-sizing: border-box;
    width: 40px;
    height: 40px;
    border-radius: 5px;
    border: 2px solid whitesmoke;
    overflow: hidden;

    .img {
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .menu {
    margin-left: 15px;

    .icon {
      color: whitesmoke;
      font-size: 28px;
    }
  }

}
</style>
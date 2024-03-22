<script setup lang="ts">

</script>

<template>
  <div class="layout-wrapper">
    <!--    <AppHeader/>-->
    <slot/>
    <!--    <AppFooter/>-->
  </div>
</template>

<style scoped lang="less">
//.layout-wrapper {
//  box-sizing: border-box;
//  width: 100vw;
//  display: flex;
//  flex-direction: column;
//  //height: 100vh;
//  //overflow: hidden;
//  //background-size: cover;
//  position: relative;
//  //background: rgb(18,28,45);
//  //background-image: url("@/assets/image/wolp.jpg");
//
//  //&::before {
//  //  content: '';
//  //  position: absolute;
//  //  top: 0;
//  //  left: 0;
//  //  width: 100%;
//  //  height: 100%;
//  //  background: conic-gradient(#edb1f1 4deg 20deg, #3490de 70deg 129deg, #9896f1 199deg 212deg, #8ef6e4 270deg 308deg);
//  //  animation: conic-gradient-move 15s linear infinite;
//  //  filter: blur(30px);
//  //  overflow: hidden;
//  //  z-index: -1;
//  //}
//
//  @keyframes conic-gradient-move {
//    0% {
//      transform: rotateZ(0deg) scale(1.5);
//    }
//
//    100% {
//      transform: rotateZ(360deg) scale(3);
//    }
//  }
//}
</style>
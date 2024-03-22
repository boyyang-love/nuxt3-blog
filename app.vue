<template>
  <NuxtLayout>
    <NuxtPage/>
  </NuxtLayout>
</template>
<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}

body {
  margin: 0;
  background-color: #0F1C2E;
  //background: linear-gradient(45deg, #f6f7fe, #F0F5F9);
}
</style>
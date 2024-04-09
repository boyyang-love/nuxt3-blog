<template>
    <div class="loader"></div>
</template>

<style lang="less" scoped>
.loading-wrapper {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
}
.loader {
  display: block;
  clear: both;
  width: 30px;
  height: 30px;
  margin: 1rem auto;
  border: 0.0625rem var(--font-color) solid;
  border-radius: 0.25rem;
  position: relative;
  background: linear-gradient(45deg, transparent 49%, var(--font-color) 50%, var(--font-color) 50%, transparent 51%, transparent),
  linear-gradient(-45deg, transparent 49%, var(--font-color) 50%, var(--font-color) 50%, transparent 51%, transparent);
  background-size: 1rem 1rem;
  background-position: 0 0;
  -webkit-animation: spTexture 1s infinite linear;
  animation: spTexture 1s infinite linear;
}

@keyframes spTexture {
  from {
    background-position: 0 0;
  }

  to {
    background-position: -1rem 0;
  }
}
</style>

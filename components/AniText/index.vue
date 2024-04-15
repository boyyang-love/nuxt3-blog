<script setup lang="ts">
const props = withDefaults(defineProps<{
  text: string
  size?: string
}>(), {
  size: '17px',
})
</script>

<template>
  <div class="loader">
    <h1 class="text" :data-shadow="text">{{ text }}</h1>
  </div>
</template>

<style scoped lang="less">
.text {
  font-size: v-bind('props.size');
  display: inline-block;
  color: var(--font-color);
  //text-shadow: 2px 2px 0 var(--font-color);
  position: relative;
  z-index: 1;
  padding: 0;
  margin: 0;
}

.text:after {
  content: attr(data-shadow);
  white-space: nowrap;
  position: absolute;
  top: 5px;
  left: 4px;
  z-index: 0;
  text-shadow: none;
  background-image: linear-gradient(45deg, transparent 45%, var(--font-color) 45%, var(--font-color) 55%, transparent 0);
  background-size: 2px 2px;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  animation: shad-anim 15s linear infinite;
}

@keyframes shad-anim {
  0% {
    background-position: 0 0
  }
  0% {
    background-position: 100% -100%
  }
}

</style>
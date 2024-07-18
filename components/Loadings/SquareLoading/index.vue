<script setup lang="ts">

</script>

<template lang="pug">
  - const one = 'Loading'
  - const two = 'Wait...'
  .scene(style=`--hue: ${260}; --saturation: ${Math.floor(Math.random() * 50 + 1) + 50}; --lightness: ${Math.floor(Math.random() * 25) + 50}`)
    .word
      - for (const [index, letter] of one.split('').entries())
      .letter__wrap(style=`--index: ${index}`)
        .letter(data-letter=letter)
          span.letter__panel(aria-hidden='true')= letter
          span.letter__panel(aria-hidden='true')= two[index]
          span.letter__panel(aria-hidden='true')= letter
          span.letter__panel(aria-hidden='true')= two[index]
          span.letter__panel

</template>

<style scoped lang="less">
* {
  box-sizing: border-box;
  transition: all 0.15s ease 0s;
}
:root {
  --movement: 0.85;
  --stop: 0.5;
  --duration: calc((var(--movement) * (1 / var(--stop))));
  --stagger: 0.1125;
  --perspective: 500;
  --size: 50;
  --ease: cubic-bezier(1, -0.52, 0.26, 0.89);
  --bg: #e6e6e6;
  --panel: #fff;
  --color: #0d0d0d;
  --hue: 23;
  --saturation: 100;
  --lightness: 55;
}
@media (prefers-color-scheme: dark) {
  :root {
    --bg: #1a1a1a;
    --panel: #000;
    --color: #f2f2f2;
  }
}
body {
  align-items: center;
  background: var(--bg);
  display: flex;
  justify-content: center;
  min-height: 100vh;
  overflow: hidden;
}
.scene {
  perspective: calc(var(--perspective) * 1px);
}
.word {
  display: flex;
  transform: translate(calc(var(--size) * 0.7px), 0) rotateX(-30deg) rotateY(45deg);
  transform-style: preserve-3d;
}
.letter__wrap {
  -webkit-animation: jump calc(var(--duration) * 1s) calc((var(--stagger, 0) * var(--index, 0)) * 1s) var(--ease) infinite;
  animation: jump calc(var(--duration) * 1s) calc((var(--stagger, 0) * var(--index, 0)) * 1s) var(--ease) infinite;
  transform-origin: bottom center;
  transform-style: preserve-3d;
}
.letter__wrap .letter {
  -webkit-animation: rotate calc(var(--duration) * 4s) calc((var(--stagger, 0) * var(--index, 0)) * 1s) ease infinite;
  animation: rotate calc(var(--duration) * 4s) calc((var(--stagger, 0) * var(--index, 0)) * 1s) ease infinite;
}
.letter {
  color: var(--color);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-size: 2rem;
  font-weight: bold;
  height: calc(var(--size) * 1px);
  margin-right: calc(var(--size) * 0.2px);
  position: relative;
  text-transform: uppercase;
  transform-style: preserve-3d;
  width: calc(var(--size) * 1px);
}
.letter__panel {
  align-items: center;
  background: var(--panel);
  border: 5px hsl(var(--hue), calc(var(--saturation) * 1%), calc(var(--lightness) * 1%)) solid;
  display: flex;
  height: calc(var(--size) * 1px);
  justify-content: center;
  left: 50%;
  position: absolute;
  top: 50%;
  width: calc(var(--size) * 1px);
}
.letter__panel:nth-of-type(1) {
  transform: translate3d(-50%, -50%, 0) translate3d(0, 0, calc(var(--size) * 0.5px));
}
.letter__panel:nth-of-type(2) {
  transform: translate3d(-50%, -50%, 0) rotateX(90deg) translate3d(0, 0, calc(var(--size) * 0.5px));
}
.letter__panel:nth-of-type(3) {
  transform: translate3d(-50%, -50%, 0) rotateX(180deg) translate3d(0, 0, calc(var(--size) * 0.5px));
}
.letter__panel:nth-of-type(4) {
  transform: translate3d(-50%, -50%, 0) rotateX(-90deg) translate3d(0, 0, calc(var(--size) * 0.5px));
}
.letter__panel:nth-of-type(5) {
  transform: translate3d(-50%, -50%, 0) rotateY(-90deg) translate3d(0, 0, calc(var(--size) * 0.5px));
}
@-webkit-keyframes rotate {
  0%, 30.625% {
    transform: rotateX(0deg);
  }
  33.125%, 81.625% {
    transform: rotateX(90deg);
  }
  83.125%, 100% {
    transform: rotateX(180deg);
  }
}
@keyframes rotate {
  0%, 30.625% {
    transform: rotateX(0deg);
  }
  33.125%, 81.625% {
    transform: rotateX(90deg);
  }
  83.125%, 100% {
    transform: rotateX(180deg);
  }
}
@-webkit-keyframes jump {
  0%, 50%, 100% {
    transform: scaleX(1) scaleY(1) translate(0, 0);
  }
  15% {
    transform: scaleX(1.2) scaleY(0.8) translate(0, 0);
  }
  25% {
    transform: scaleX(0.9) scaleY(1.1) translate(0, -100%);
  }
}
@keyframes jump {
  0%, 50%, 100% {
    transform: scaleX(1) scaleY(1) translate(0, 0);
  }
  15% {
    transform: scaleX(1.2) scaleY(0.8) translate(0, 0);
  }
  25% {
    transform: scaleX(0.9) scaleY(1.1) translate(0, -100%);
  }
}

</style>
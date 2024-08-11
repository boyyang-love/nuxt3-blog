<script lang="ts" setup>
const mouse = reactive({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      dir: '',
    },
)

const pos = reactive({
  x: 0,
  y: 0,
})

const clicked = ref<boolean>(false)

const getMouse = (e: any) => {
  mouse.x = e.clientX || e.pageX || e.touches[0].pageX || 0 || window.innerWidth / 2
  mouse.y = e.clientY || e.pageY || e.touches[0].pageY || 0 || window.innerHeight / 2
  mouse.dir = (mouse.x > e.clientX) ? 'left' : 'right'
}

const map = (num: number, in_min: number, in_max: number, out_min: number, out_max: number) => {
  return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min
}

const follow = () => {

  const el = document.querySelector('#ghost') as any
  const mouth = document.querySelector('.ghost__mouth') as any
  const eyes = document.querySelector('.ghost__eyes') as any


  const distX = mouse.x - pos.x
  const distY = mouse.y - pos.y

  const velX = distX / 8
  const velY = distY / 8

  pos.x += distX / 10
  pos.y += distY / 10

  const skewX = map(velX, 0, 100, 0, -50)
  const scaleY = map(velY, 0, 100, 1, 2.0)
  const scaleEyeX = map(Math.abs(velX), 0, 100, 1, 1.2)
  let scaleEyeY = map(Math.abs(velX * 2), 0, 100, 1, 0.1)
  let scaleMouth = Math.min(Math.max(map(Math.abs(velX * 1.5), 0, 100, 0, 10), map(Math.abs(velY * 1.2), 0, 100, 0, 5)), 2)

  if (clicked) {
    scaleEyeY = .4
    scaleMouth = -scaleMouth
  }

  el.style.transform = 'translate(' + pos.x + 'px, ' + pos.y + 'px) scale(.7) skew(' + skewX + 'deg) rotate(' + -skewX + 'deg) scaleY(' + scaleY + ')'
  eyes.style.transform = 'translateX(-50%) scale(' + scaleEyeX + ',' + scaleEyeY + ')'
  mouth.style.transform = 'translate(' + (-skewX * .5 - 10) + 'px) scale(' + scaleMouth + ')'
}

const render = () => {
  requestAnimationFrame(render)
  follow()
}


onMounted(() => {
  nextTick(() => {
    ['mousemove', 'touchstart', 'touchmove'].forEach(e => {
      window.addEventListener(e, getMouse)
    })

    window.addEventListener('mousedown', (e) => {
      e.preventDefault()
      clicked.value = true
    })
    window.addEventListener('mouseup', () => {
      clicked.value = false
    })

    render()
  })
})

</script>

<template>
  <div id="ghost" class="ghost">
    <div class="ghost__head">
      <div class="ghost__eyes"></div>
      <div class="ghost__mouth"></div>
    </div>
    <div class="ghost__tail">
      <div class="ghost__rip"></div>
    </div>
  </div>

  <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
    <defs>
      <filter id="goo">
        <feGaussianBlur
            in="SourceGraphic"
            stdDeviation="10"
            result="ghost-blur"/>
        <feColorMatrix
            in="ghost-blur"
            mode="matrix"
            values="
                1 0 0 0 0
                0 1 0 0 0
                0 0 1 0 0
                0 0 0 16 -7"
            result="ghost-gooey"/>
      </filter>
    </defs>
  </svg>
</template>

<style scoped lang="less">

.ghost {
  position: absolute;
  z-index: 10;
  // filter:url('#goo');
  transform-origin: center;
  width: 90px;
  margin: 20px 0 0 -45px;

  &__eyes,
  &__mouth {
    position: absolute;
    z-index: 1;
    width: 15px;
    height: 15px;
    top: 34px;
    left: 50%;
    transform: translate(-50%);
    border-radius: 50px;
    background: var(--ghost-eye-color);
    margin-left: -20px;
    transform-origin: center;
  }

  &__eyes {
    box-shadow: 40px 0 0 var(--ghost-eye-color);
  }

  &__mouth {
    margin: 0;
    top: 60px;
    transform: scale(0);
    border-radius: 20px 20px 12px 12px;
    width: 20px;
    transform-origin: center bottom;
    overflow: hidden;
  }

  &__tail {
    position: absolute;
    z-index: -1;
    top: 82px;
    height: 55px;
    width: 100%;
    filter: url(#goo);

    &:before {
      content: '';
      background: var(--ghost-body-color);
      position: absolute;
      bottom: 35px;
      left: 0;
      height: 100px;
      width: 100%;
      border-radius: 40px 40px 5px 5px;
    }
  }

  &__rip {
    width: 15px;
    height: 28px;
    background: #fff;
    position: absolute;
    top: 15px;
    left: 0;
    box-shadow: -62px 0 0 #fff, -31px 0 0 #fff, 31px 0 0 #fff, 62px 0 0 #fff, 93px 0 0 #fff;
    border-radius: 50%;
    animation: ghost-rips 1.2s linear infinite;
  }
}

@keyframes ghost-rips {
  0% {
    left: 0;
    top: 12px;
  }
  50% {
    left: 31px;
    top: 20px;
  }
  100% {
    left: 62px;
    top: 12px;
  }
}


svg {
  position: absolute;
}

</style>
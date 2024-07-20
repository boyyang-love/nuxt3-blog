<script setup lang="ts">
import {NAvatar, NEllipsis} from 'naive-ui'

const props = withDefaults(defineProps<{
  name: string
  des: string
  avatar: string
  url: string
}>(), {})

const toDetail = () => {
  window.open(props.url, '_blank')
}
</script>

<template>
  <div class="link-card-wrapper">
    <n-avatar
        :src="props.avatar"
        :size="70"
        class="avatar"
        bordered
    ></n-avatar>
    <div class="info">
      <span class="name" @click="toDetail">{{ props.name }}</span>
      <span class="des">
        <n-ellipsis
            :line-clamp="2"
            :tooltip="false"
        >
          {{ props.des }}
        </n-ellipsis>
      </span>
    </div>
  </div>
</template>

<style scoped lang="less">
.link-card-wrapper {
  box-sizing: border-box;
  width: 100%;
  display: flex;
  background-color: var(--bg-color);

  .avatar {
    flex-shrink: 0;
  }

  .info {
    margin-left: 10px;
    display: flex;
    flex-direction: column;

    .name,
    .des {
      color: var(--font-color);
    }

    .name {
      font-size: 16px;
      cursor: pointer;
    }

    .des {
      font-size: 13px;
    }


  }


}
</style>
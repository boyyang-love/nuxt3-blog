<script setup lang="ts">
import {NInput, NSpace} from 'naive-ui'
import Message from '~/components/Message/index.vue'
import {type Comment, createComment} from '~/api/comment'
import {useUserStore} from '@/store/modules/user'

const props = withDefaults(defineProps<{
      id: number | string
      count: number,
      infos: Comment.CommentInfo[]
    }>(),
    {
      id: 0,
      count: 0,
      infos: () => [] as Comment.CommentInfo[],
    })


const emits = defineEmits<{
  submit: []
}>()

const userStore = useUserStore()

const text = ref<string>('')

const submit = () => {
  if (text.value.trim() === '') {
    window.$message.error('评论内容不能为空')
    return
  }

  createComment({
    article_id: Number(props.id as number),
    type: 'article',
    content: text.value,
  }).then(() => {
    window.$message.success('评论成功')
    text.value = ''
    emits('submit')
  })

}
</script>

<template>
  <div class="message-board-wrapper">
    <div class="title-wrapper">
      <span class="title">评论留言</span>
      <span class="value">{{ count }}</span>
    </div>
    <div class="input" v-if="userStore.token">
      <n-input
          type="textarea"
          maxlength="200"
          show-count
          placeholder="请输入您的评论"
          :autosize="{
              maxRows: 10,
              minRows: 5,
          }"
          v-model:value="text"
      ></n-input>
    </div>
    <div class="btns" v-if="userStore.token">
      <n-space align="center" size="small">
        <div class="btn" @click="submit">发布评论</div>
      </n-space>
    </div>

    <div class="messages">
      <Message
          v-for="item in infos"
          :key="item.id"
          :info="item"
      ></Message>
    </div>
  </div>
</template>

<style scoped lang="less">
.message-board-wrapper {
  box-sizing: border-box;
  width: 100%;

  .title-wrapper {
    margin: 10px 0;

    .title {
      font-size: 13px;
      font-weight: bolder;
    }

    .value {
      font-size: 13px;
      margin: 0 10px;
      font-weight: bolder;
    }
  }

  .input {

  }

  .btns {
    display: flex;
    margin-top: 15px;
    justify-content: flex-end;

    .btn {
      border-radius: 5px;
      box-sizing: border-box;
      padding: 2px 10px;
      color: rgb(245, 245, 245);
      background-color: rgb(85, 98, 135);
      cursor: pointer;
      font-size: 13px;
      font-weight: bolder;
    }

    .face {
      color: whitesmoke;
      font-size: 20px;
    }
  }
}
</style>
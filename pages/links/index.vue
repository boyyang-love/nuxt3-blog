<script setup lang="ts">
import {NInput, NSpace, NButton, NInputGroup} from 'naive-ui'
import {definePageMeta} from '#imports'

definePageMeta({
  layout: false,
})
</script>

<template>
  <nuxt-layout name="custom">
    <client-only>
      <Welcome :show="false">
        <div class="links-wrapper">
          <div class="links-box">
            <div class="title">友链申请</div>
            <div class="user-input">
              <NSpace vertical>
                <div class="label">网站名称:</div>
                <NInput placeholder="请输入网站名称"></NInput>
                <div class="label">网站访问地址:</div>
                <NInput placeholder="请输入网站访问地址"></NInput>
                <div class="label">网站图标:</div>
                <NInput placeholder="请输入网站Icon地址"></NInput>
                <div class="label">邮箱:</div>
                <NInput placeholder="请输入邮箱">

                </NInput>

                <div class="label">验证码:</div>
                <NInputGroup>
                  <NInput placeholder="请输入验证码">

                  </NInput>
                  <NButton type="error">获取验证码</NButton>
                </NInputGroup>
              </NSpace>
            </div>

            <div class="btns">
              <NButton type="primary">提交</NButton>
            </div>
          </div>
        </div>
      </Welcome>
    </client-only>
  </nuxt-layout>
</template>

<style scoped lang="less">
.links-wrapper {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  background-image: url("@/assets/image/bg.png");
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;


  .links-box {
    box-sizing: border-box;
    width: 450px;
    border-radius: 5px;
    background-color: rgba(17, 17, 17, 0.4);
    backdrop-filter: blur(10px) saturate(80%);
    padding: 20px;
    position: relative;


    .title {
      text-align: center;
      color: whitesmoke;
      font-size: 15px;
      font-weight: bolder;
      margin-bottom: 15px;
    }

    .user-input {

      .label {
        color: whitesmoke;
        font-size: 13px;
        font-weight: bolder;
      }
    }

    .btns {
      display: flex;
      justify-content: flex-end;
      margin-top: 15px;
    }
  }
}
</style>
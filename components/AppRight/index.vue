<script setup lang="ts">
import {NEmpty} from 'naive-ui'
import CardTop from '~/components/CardTop/index.vue'
import Title from '~/components/TitleText/index.vue'
import {type Blog} from '~/api/blog'
import {tagList, type Tag} from '@/api/tags'
import {env} from '~/utils/env'
import {refreshNuxtData, useAsyncData} from '#app'
import {$fetch} from 'ofetch/node'
import type {Result} from '~/utils/http/types'
import {useUserStore} from '@/store/modules/user'

const userStore = useUserStore()

const {data} = await useAsyncData(
    'blog_list_top',
    () => $fetch<Result<Blog.ListBlogRes>>('/blog/list',
        {
          baseURL: env.VITE_APP_API_URL,
          method: 'GET',
          params: {
            page: 1,
            limit: 5,
            type: 'top',
          },
          query: {
            key: new Date().getTime(),
          },
          onResponse(ctx): Promise<any> {
            return new Promise((resolve) => {
              const {_data} = ctx.response
              const {data} = _data as Result<Blog.ListBlogRes>

              data.list = data.list.map(l => {
                return {
                  ...l,
                  user: {
                    ...l.user,
                    avatar: `${env.VITE_APP_IMG_URL}${l.user.avatar}`,
                  },
                }
              })
              resolve(ctx)
            })
          },
        },
    ),
)

const tags = ref<Tag.TagInfo[]>([])

const getTagList = () => {
  tagList({type: 'article'}).then((res) => {
    tags.value = res.data.tags
  })
}

watch(() => userStore.token, (token) => {
      if (token) {
        getTagList()
      }
    },
    {
      immediate: true,
    },
)

</script>

<template>
  <div class="app-right">
    <div class="top-article">
      <Title padding="10px 0" :more="false" title="热门文章"></Title>
      <div
          class="empty"
          v-if="data?.data.list.length === 0"
      >
        <n-empty size="small"></n-empty>
      </div>
      <div v-else>
        <CardTop
            v-for="item in data?.data.list"
            :id="item.id"
            :cover="item.cover"
            :key="item.id"
            :title="item.title"
            :sub-title="item.des"
        ></CardTop>
      </div>
    </div>
    <div class="user-tags">
      <Title padding="10px 0" :more="false" title="标签"></Title>
      <div
          class="empty"
          v-if="tags.length <= 0"
      >
        <n-empty size="small"></n-empty>
      </div>
      <div class="tags-wrapper" v-else>
        <div class="tag-item" v-for="item in tags">
          <span class="name">{{ item.tag_name }}</span>
          <span class="value">{{ item.articles.length || 0 }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.app-right {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 10px;

  .top-article {
    .empty {
      box-sizing: border-box;
      width: 100%;
      height: 50px;
    }
  }

  .user-tags {
    .empty {
      height: 100px;
    }

    .tags-wrapper {
      display: flex;
      flex-wrap: wrap;

      .tag-item {
        margin: 5px;
        border-radius: 3px;
        padding: 1px 5px;
        border: 2px solid var(--border-color);
        cursor: pointer;

        background: var(--button-color);
        box-shadow: 5px 5px 5px var(--button-shadow-one),
          -5px -5px 5px var(--button-shadow-two);

        .name {
          font-size: 13px;
          color: var(--font-color);
          font-weight: bolder;
        }

        .value {
          font-size: 13px;
          color: var(--font-color);
          font-weight: bold;
          margin-left: 5px;
        }
      }
    }
  }
}
</style>
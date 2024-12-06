import {Editor, Toolbar} from '@wangeditor-next/editor-for-vue'
import {defineNuxtPlugin} from '#app'
import '@wangeditor-next/editor/dist/css/style.css' // 引入 css


export default defineNuxtPlugin((nuxt) => {
    nuxt.vueApp.component('Editor', Editor)
    nuxt.vueApp.component('Toolbar', Toolbar)
})
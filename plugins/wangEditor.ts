import {Editor, Toolbar} from '@wangeditor/editor-for-vue'
import {defineNuxtPlugin} from '#app'

export default defineNuxtPlugin((nuxt) => {
    nuxt.vueApp.component('WangsEditor', Editor)
    nuxt.vueApp.component('WangsToolbar', Toolbar)
})
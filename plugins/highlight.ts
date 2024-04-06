import hljs from 'highlight.js'
import {defineNuxtPlugin} from '#app'
import 'highlight.js/styles/monokai-sublime.css'

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.directive('highlight',
        {
            mounted(el) {
                let element = el.querySelectorAll('pre code')
                element.forEach((block: any) => {
                    hljs.highlightElement(block)
                })
            },
            getSSRProps(binding, vnode) {
                // 你可以在这里提供SSR特定的props
                return {}
            },
        },
    )
})


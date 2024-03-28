import hljs from 'highlight.js'
//样式文件,我选的是atom-one-dark-reasonable样式 可以通过highlight.js/styles 选择其他css
import 'highlight.js/styles/atom-one-dark-reasonable.css'
import {defineNuxtPlugin} from "#app";
// import 'highlight.js/styles/atom-one-dark.css'
// import 'highlight.js/styles/monokai-sublime.css'


// 这里 挂载highlight

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.directive('highlight', function (el) {
        let element = el.querySelectorAll('pre code');
        element.forEach((block: any) => {
            hljs.highlightBlock(block)
        })
    })
})


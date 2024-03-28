// https://nuxt.com/docs/api/configuration/nuxt-config
import prismjs from 'vite-plugin-prismjs'

export default defineNuxtConfig({
    devtools: {enabled: false},
    modules: ['nuxt-icons', '@pinia/nuxt', '@pinia-plugin-persistedstate/nuxt'],
    build: {
        transpile:
            process.env.NODE_ENV === 'production'
                ? [
                    'naive-ui',
                    'vueuc',
                    '@css-render/vue3-ssr',
                    '@juggle/resize-observer',
                ]
                : ['@juggle/resize-observer'],
    },
    vite: {
        optimizeDeps: {
            include:
                process.env.NODE_ENV === 'development'
                    ? ['naive-ui', 'vueuc', 'date-fns-tz/formatInTimeZone']
                    : [],
        },
    },
    plugins: [
        '~/plugins/highlight.ts',
    ],
    app: {
        // pageTransition: {name: 'page', mode:'in-out'},
    },
    // hooks: {
    //     'pages:extend' (pages) {
    //         // 添加一个路由
    //         pages.push({
    //             name: 'fullScreen',
    //             path: '/fullScreen',
    //             file: '~/pages/fullScreen/index.vue'
    //         })
    //     }
    // }
})

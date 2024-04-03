// https://nuxt.com/docs/api/configuration/nuxt-config
import {sitemap} from './static/sitemap'
import {splitVendorChunkPlugin} from 'vite'

export default defineNuxtConfig({
    experimental: {
        writeEarlyHints: true,
    },
    ssr: true,
    routeRules: {
        '/index': {
            ssr: false,
        },
        '/create': {
            ssr: false,
        },
        '/upload': {
            ssr: false,
        },
        '/wallpaper': {
            ssr: false,
        },
    },
    devtools: {enabled: false},
    modules: [
        'nuxt-icons',
        '@pinia/nuxt',
        '@pinia-plugin-persistedstate/nuxt',
        '@nuxtjs/sitemap',
    ],
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
        analyze: {
            enabled: true,
            filename: "stats.html"
        }
    },
    vite: {
        optimizeDeps: {
            include:
                process.env.NODE_ENV === 'development'
                    ? ['naive-ui', 'vueuc', 'date-fns-tz/formatInTimeZone']
                    : [],
        },
        plugins: [splitVendorChunkPlugin()],
    },
    plugins: [
        '~/plugins/highlight.ts',
        {
            src: '~/plugins/wangEditor.ts',
            mode: 'client',
        },
    ],
    app: {
        head: {
            title: 'boyyang的个人博客',
            meta: [
                {
                    name: 'description',
                    content: 'boyyang',
                },
                {
                    name: 'description',
                    content: '个人博客',
                },
                {
                    name: 'keywords',
                    content: 'boyyang',
                },
                {
                    name: 'keywords',
                    content: '个人博客网站',
                },
                {
                    name: 'keywords',
                    content: '博客网站',
                },
                {
                    name: 'keywords',
                    content: 'wallpaperCollector',
                },
                {
                    name: 'baidu-site-verification',
                    content: 'codeva-5PhqvbeMY2',
                },
            ],
        },
    },
    sitemap: sitemap,
})

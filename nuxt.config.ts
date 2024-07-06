// https://nuxt.com/docs/api/configuration/nuxt-config
import {sitemap} from './static/sitemap'

export default defineNuxtConfig({
    devServer: {
        // host: '0.0.0.0',
        port: 3000,
    },
    ssr: true,
    nitro: {
        compressPublicAssets: true,        // 启动压缩
        prerender: {
            routes: ['/index', '/create', '/upload', '/tags', '/user', '/categories', '/wallpaper'],
        },
    },
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
        '/tags': {
            ssr: false,
        },
        '/user': {
            ssr: false,
        },
        '/categories': {
            ssr: false,
        },
    },
    devtools: {enabled: false},
    modules: [
        '@pinia/nuxt',
        '@pinia-plugin-persistedstate/nuxt',
        '@nuxtjs/sitemap',
        '@nuxtjs/robots',
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
        {
            src: '~/plugins/highlight.ts',
            mode: 'all',
        },
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
                {
                    name: 'msvalidate.01',
                    content: '8707B7AA5CBE39158EA6D66ACB808FA8',
                },
            ],
        },
        // pageTransition: { name: 'page', mode: 'out-in' },
        // layoutTransition: { name: 'layout', mode: 'out-in' }
    },
    sitemap: sitemap as any,
    vue: {
        compilerOptions: {
            directiveTransforms: {
                highlight: () => ({
                    props: [],
                    needRuntime: true,
                }),
            },
        },
    },
})

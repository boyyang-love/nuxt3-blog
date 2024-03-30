// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
    ssr: true,
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
            ],
        },
    },
})

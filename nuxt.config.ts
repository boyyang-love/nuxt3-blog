// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: {enabled: false},
    modules: ['nuxt-icons', 'nuxt-editorjs', '@pinia/nuxt', '@pinia-plugin-persistedstate/nuxt'],
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
                    ? ['naive-ui', 'vueuc', 'date-fns-tz/formatInTimeZone', '@editorjs/editorjs']
                    : [],
        },
    },
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    css: ['~/assets/css/main.css'],
    plugins: [],
    app: {
        pageTransition: { name: 'page', mode: 'out-in' }
    },

})

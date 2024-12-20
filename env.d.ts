/// <reference types="vite/client" />

declare module '*.vue' {
    import type {DefineComponent} from 'vue'
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
    const component: DefineComponent<{}, {}, any>
    export default component
}

interface ImportMetaEnv {
    // 更多环境变量...
    readonly VITE_APP_PORT: string
    readonly VITE_APP_BASE_URL: string
    readonly VITE_APP_API_URL: string
    readonly VITE_APP_IMG_URL: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}

interface CSSProperties {
    [key: `--${string}`]: string
}

declare module '@wangeditor/editor-for-vue'

import {defineStore} from 'pinia'
import {useNuxtApp} from '#app'

export interface ThemeState {
    theme: string
    themeSelectArray: string[],
    naiveTheme: string
    dark: string[],
    light: string[],
}

const useThemeStore = defineStore({
    id: 'app-theme',
    state: (): ThemeState => ({
        theme: '#ffffff',
        themeSelectArray: ['#ffffff', '#0F1C2E', '#20293a', '#ffc6ff'],
        naiveTheme: 'light',
        dark: ['#0F1C2E', '#20293a'],
        light: ['#ffffff', '#ffc6ff'],
    }),
    actions: {
        setTheme(theme: string) {
            this.theme = theme
            if (this.dark.includes(theme)) {
                this.naiveTheme = 'dark'
            } else {
                this.naiveTheme = 'light'
            }
        },
    },
    //开启持久化
    persist: process.client && {
        key: 'app-theme',
        storage: window.localStorage,
        paths: ['theme'],
    },
})

const useThemeStoreWithOut = () => {
    const {$pinia} = useNuxtApp()
    return useThemeStore($pinia)
}

export {
    useThemeStore,
    useThemeStoreWithOut,
}

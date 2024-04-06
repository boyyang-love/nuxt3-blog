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
        themeSelectArray: ['#ffffff', '#0F1C2E'],
        naiveTheme: 'light',
        dark: ['#0F1C2E'],
        light: ['#ffffff'],
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

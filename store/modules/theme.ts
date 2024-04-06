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
        themeSelectArray: ['#101625', '#3B5998', '#f2f0fd', '#1E1E1E', '#FAD9E6'],
        naiveTheme: 'light',
        dark: ['#101625', '#3B5998', '#1E1E1E'],
        light: ['#f2f0fd', '#FAD9E6'],
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
        paths: ['theme', 'naiveTheme'],
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

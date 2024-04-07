import {defineStore} from 'pinia'
import {useNuxtApp} from '#app'

export interface SearchState {
    keywords: string[]
}

const useSearchStore = defineStore({
    id: 'app-search',
    state: (): SearchState => ({
        keywords: [],
    }),

    actions: {
        setKeywords(word: string) {
            const newKeywords = new Set([word, ...this.keywords])
            this.keywords = Array.from(newKeywords).slice(0, 10)
        },

        delKeyword(word: string) {
            this.keywords = this.keywords.filter(k => k !== word)
        },
    },

    //开启持久化
    persist: process.client && {
        key: 'app-search',
        storage: window.localStorage,
        paths: ['keywords'],
    },
})

const useSearchStoreWithOut = () => {
    const {$pinia} = useNuxtApp()
    return useSearchStore($pinia)
}

export {
    useSearchStore,
    useSearchStoreWithOut,
}

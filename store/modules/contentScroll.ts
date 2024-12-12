import {defineStore} from 'pinia'
import {useNuxtApp} from '#app'

export interface ContentScroll {
    scrollTop: number[]
}

const useContentScrollStore = defineStore<
    'app-content-scroll',
    ContentScroll,
    {},
    {
        setScrollTop: (v: number) => void,
        getScrollTop: () => number
    }
>(
    'app-content-scroll',
    {
        state: () => ({
            scrollTop: [],
        }),
        getters: {},
        actions: {
            setScrollTop(val: number) {
                this.scrollTop.push(val)
                console.log(this.scrollTop)
            },
            getScrollTop(): number {
                return this.scrollTop.pop() || 0
            },
        },
        //开启持久化
        persist: import.meta.client && {
            key: 'app-content-scroll',
            storage: window.sessionStorage,
            pick: [],
        },
    },
)

const useContentScrollStoreWithOut = () => {
    const {$pinia} = useNuxtApp()
    return useContentScrollStore($pinia)
}

export {
    useContentScrollStore,
    useContentScrollStoreWithOut,
}

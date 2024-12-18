import {defineStore} from 'pinia'
import {useNuxtApp} from '#app'

export interface ContentScroll {
    scrollTop: ScrollTopItem[]
}

export interface ScrollTopItem {
    id: number,
    num: number
}

const useContentScrollStore = defineStore<
    'app-content-scroll',
    ContentScroll,
    {},
    {
        setScrollTop: (item: ScrollTopItem) => void,
        getScrollTop: (id: number) => number
    }
>(
    'app-content-scroll',
    {
        state: () => ({
            scrollTop: [],
        }),
        getters: {},
        actions: {
            setScrollTop(item: ScrollTopItem) {
                const ids = this.scrollTop.map(s => s.id)
                if(ids.includes(item.id)){
                    this.scrollTop.forEach(s => {
                        if(s.id === item.id){
                            s.num = item.num
                        }
                    })
                }else{
                    this.scrollTop.push({
                        ...item
                    })
                }
            },
            getScrollTop(id: number): number {
                return this.scrollTop.filter(s => s.id === id)[0].num || 0
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

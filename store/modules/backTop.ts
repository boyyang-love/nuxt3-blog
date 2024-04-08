import {defineStore} from 'pinia'
import {useNuxtApp} from '#app'

export interface BackTopState {
    show: boolean
}

const useBackTopStore = defineStore({
    id: 'app-back-top',
    state: (): BackTopState => ({
        show: false,
    }),

    actions: {
        setShow(show: boolean) {
            this.show = show
        },
    },

    //开启持久化
    persist: process.client && {
        key: 'app-back-top',
        storage: window.localStorage,
        paths: [],
    },
})

const useBackTopWithOut = () => {
    const {$pinia} = useNuxtApp()
    return useBackTopStore($pinia)
}

export {
    useBackTopStore,
    useBackTopWithOut,
}

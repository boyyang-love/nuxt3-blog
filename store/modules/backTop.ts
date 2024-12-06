import {defineStore} from 'pinia'
import {useNuxtApp} from '#app'

export interface BackTopState {
    show: boolean
    showClose: boolean
    domRef: HTMLElement | null
}

const useBackTopStore = defineStore<'app-back-top', BackTopState, {}, {
    setShow: (show: boolean) => void,
    setTop: (show: boolean) => void,
    setShowClose: (show: boolean) => void,
}>('app-back-top', {
    state: (): BackTopState => ({
        show: false,
        domRef: null,
        showClose: false,
    }),

    actions: {
        setShow(show: boolean) {
            this.show = show
        },
        setTop() {
            this.domRef && (this.domRef as any).handleClick()
        },
        setShowClose(show: boolean) {
            this.showClose = show
        },
    },

    //开启持久化
    persist: import.meta.client && {
        key: 'app-back-top',
        storage: window.localStorage,
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

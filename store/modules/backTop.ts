import {defineStore} from 'pinia'
import {useNuxtApp} from '#app'

export interface BackTopState {
    show: boolean
    domRef: HTMLElement | null
}

const useBackTopStore = defineStore<'app-back-top', BackTopState, {}, {}>('app-back-top', {
    state: (): BackTopState => ({
        show: false,
        domRef: null,
    }),

    actions: {
        setShow(show: boolean) {
            this.show = show
        },
        setTop() {
            this.domRef && (this.domRef as any).handleClick()
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

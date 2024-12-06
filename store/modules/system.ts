import {defineStore} from 'pinia'
import {useNuxtApp} from '#app'

export interface SystemState {
    showIndexWelcome: boolean
    showUserWelcome: boolean
    showLinkWelcome: boolean
}

const useSysStore = defineStore<'app-system', SystemState, {}, {}>('app-system', {
    state: (): SystemState => ({
        showIndexWelcome: true,
        showUserWelcome: true,
        showLinkWelcome: true,
    }),
    actions: {
        setShowWelcome(show: boolean, type: 'index' | 'user' | 'link') {
            if (type === 'index') {
                this.showIndexWelcome = show
            }

            if (type === 'user') {
                this.showUserWelcome = show
            }

            if (type === 'link') {
                this.showLinkWelcome = show
            }
        },
    },
    //开启持久化
    persist: import.meta.client && {
        key: 'app-system',
        storage: window.sessionStorage,
        pick: ['showIndexWelcome', 'showUserWelcome', 'showLinkWelcome'],
    },
})

const useUserStoreWithOut = () => {
    const {$pinia} = useNuxtApp()
    return useSysStore($pinia)
}

export {
    useSysStore,
    useUserStoreWithOut,
}

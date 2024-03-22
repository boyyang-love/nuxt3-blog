import {defineStore} from 'pinia'
import {useNuxtApp} from '#app'

export interface UserState {
    token: string
}

const useUserStore = defineStore({
    id: 'app-user',
    state: (): UserState => {
        return {
            // 登录成功返回的用户信息
            token: '',
        }
    },
    getters: {},
    actions: {},
    //开启持久化
    persist: process.client && {
        key: 'app-user',
        storage: window.localStorage,
        paths: ['token'],
    },
})

const useUserStoreWithOut = () => {
    const {$pinia} = useNuxtApp()
    return useUserStore($pinia)
}

export {
    useUserStore,
    useUserStoreWithOut,
}

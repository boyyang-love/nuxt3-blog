import {defineStore} from 'pinia'
import {useNuxtApp} from '#app'
import {store} from '@/store'
import type {Signinup} from '~/api/signinup'

export interface UserState {
    token: string
    user_info: Signinup.UserInfo
}

const useUserStore = defineStore({
    id: 'app-user',
    state: (): UserState => ({
        token: '',
        user_info: {} as Signinup.UserInfo,
    }),
    getters: {
        getToken: (state) => {
            return state.token
        },
    },
    actions: {
        setUserInfo(userInfo: Signinup.UserInfo) {
            this.user_info = userInfo
        },
        setToken(t: string) {
            this.token = t
        },

    },
    //开启持久化
    persist: process.client && {
        key: 'app-user',
        storage: window.localStorage,
        paths: ['token', 'user_info'],
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

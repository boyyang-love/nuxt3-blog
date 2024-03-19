import {defineStore} from 'pinia'
import type {User} from '@/api/user/type'
import {userInfo} from '@/api/user'
import {store} from '~/store'
import {useNuxtApp} from '#app'

export interface UserState {
    token: string
    info: User.Info
    detail: User.Detail
    opacity: number
}

const useUserStore = defineStore({
    id: 'app-user',
    state: (): UserState => {
        return {
            // 登录成功返回的用户信息
            token: '',
            // 用户详细信息
            info: {} as User.Info,
            detail: {} as User.Detail,
            opacity: 0.1,
        }
    },
    getters: {
        getToken: (state: UserState): string => state.token,
    },
    actions: {
        setToken(token: string) {
            this.token = token
        },
        async getInfoDetail() {
            let res = await userInfo()
            res.data.user_info.tel = String(res.data.user_info.tel)
            res.data.user_info.qq = String(res.data.user_info.qq)
            this.info = res.data.user_info
            this.detail = res.data.user_detail
        },
    },
    //开启持久化
    persist: process.client && {
        key: 'app-user',
        storage: window.localStorage,
        paths: ['token', 'info', 'detail', 'opacity'],
    },
})

const useUserStoreWithOut = () => {
    const {$pinia} = useNuxtApp()
    return useUserStore($pinia)
}

export {useUserStore, useUserStoreWithOut}

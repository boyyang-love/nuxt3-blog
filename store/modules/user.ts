import {defineStore} from 'pinia'
import {useNuxtApp} from '#app'
import type {Signinup} from '~/api/signinup'

export interface UserState {
    token: string
    user_info: Signinup.UserInfo
    showUserInfoModal: boolean
    isSignin: boolean
    showSigninModal: boolean
}

const useUserStore = defineStore<'app-user', UserState, { getToken: (s: UserState) => string }, {}>('app-user', {
    state: (): UserState => ({
        token: '',
        user_info: {
            username: 'boyyang',
            motto: '第一行没有你，第二行没有你，第三行没有也罢！',
            avatar: 'BOYYANG/default/avatar.png',
            cover: 'BOYYANG/default/bg.png',
        } as Signinup.UserInfo,
        showUserInfoModal: false,
        isSignin: true,
        showSigninModal: false,
    }),
    getters: {
        getToken: (state): string => {
            return state.token || ''
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
    persist: import.meta.client && {
        key: 'app-user',
        storage: window.localStorage,
        pick: ['token', 'user_info'],
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

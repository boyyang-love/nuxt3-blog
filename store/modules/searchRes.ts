import {defineStore} from 'pinia'
import {useNuxtApp} from '#app'
import {type SearchApi, searchByCategoriesId} from '~/api/search'
import {env} from '~/utils/env'
import {useRouter} from 'vue-router'

export interface SearchState {
    toType: ToType
    show: boolean
    user_id: number
    searchRes: SearchApi.SearchInfo[]
}

export type ToType = 'detail' | 'details'

const useSearchResStore = defineStore({
    id: 'app-search-res',
    state: (): SearchState => ({
        toType: 'detail',
        show: false,
        user_id: 0,
        searchRes: [],
    }),

    actions: {
        async search(id: number, user_id: number) {
            const res = await searchByCategoriesId({
                id: id,
                user_id: user_id,
            })

            this.user_id = user_id
            this.searchRes = res.data.infos
        },
        setToType(type: ToType) {
            this.toType = type
        },
    },

    //开启持久化
    persist: process.client && {
        key: 'app-search-result',
        storage: window.localStorage,
        paths: [],
    },
})

const useSearchResStoreWithOut = () => {
    const {$pinia} = useNuxtApp()
    return useSearchResStore($pinia)
}

export {
    useSearchResStore,
    useSearchResStoreWithOut,
}

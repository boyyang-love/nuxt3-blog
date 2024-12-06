import {defineStore} from 'pinia'
import {useNuxtApp} from '#app'
import {type SearchApi, searchByCategoriesId} from '~/api/search'

export interface SearchState {
    toType: ToType
    show: boolean
    user_id: number
    searchRes: SearchApi.SearchInfo[]
}

export type ToType = 'detail' | 'details'

const useSearchResStore = defineStore<'app-search-res', SearchState, {}, {}>('app-search-res', {
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
    persist: import.meta.client && {
        key: 'app-search-result',
        storage: window.localStorage,
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

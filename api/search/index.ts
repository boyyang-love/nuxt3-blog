import {http} from '@/utils/http'

export declare namespace SearchApi {
    export interface SearchRes {
        infos: SearchInfo[]
    }

    export interface SearchInfo {
        id: number
        uid: string
        created: number
        title: string
        des: string
        cover: string
    }
}

export const searchBykeyword = (params: { keyword: string, type: 'article' | 'images' }) => {
    return http.request<SearchApi.SearchRes>({
        url: '/search',
        method: 'GET',
        params,
    })
}
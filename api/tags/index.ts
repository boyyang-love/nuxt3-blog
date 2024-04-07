import {http} from '@/utils/http'

export namespace Tag {

    export interface ListTagRes {
        tags: TagInfo[],
    }

    export interface TagInfo {
        id: number
        uid: string
        tag_name: string
        user_id: number
        articles: number[]
    }
}

export const tagList = (params: { type: 'image' | 'article' }) => {
    return http.request<Tag.ListTagRes>({
        url: '/tag/list',
        method: 'GET',
        params,
    })
}

export const tagCreate = (data: { name: string, type: 'image' | 'article' }) => {
    return http.request({
        url: '/tag/create',
        method: 'POST',
        data,
    })
}

export const tagDelete = (data: { id: number }) => {
    return http.request({
        url: '/tag/delete',
        method: 'POST',
        data,
    })
}
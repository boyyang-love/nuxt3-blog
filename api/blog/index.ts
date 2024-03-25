import {http} from '~/utils/http'

export namespace Blog {
    export interface CreateBlogReq {
        title: string
        des: string
        cover: string
        content: string
        tags?: string[] | number[]
    }

    export interface ListBlogRes {
        count: number
        list: ListBlogItem[]
    }

    export interface ListBlogSearchByIdRes {
        info : ListBlogItem
    }

    export interface ListBlogItem {
        id: number
        uid: string
        created: number
        updated: number
        title: string
        des: string
        cover: string
        content: string
        user_id: number
        user: UserInfo
        tag: Tag[]
    }

    export interface UserInfo {
        username: string
        avatar: string
        motto: string
    }

    export interface Tag {
        id: number
        uid: string
        tag_name: string
        type: string
    }
}
export const createBlog = (data: Blog.CreateBlogReq) => {
    return http.request({
        url: '/blog/create',
        method: 'POST',
        data,
    })
}

export const listBlog = (params: { page: number, limit: number }) => {
    return http.request<Blog.ListBlogRes>({
        url: '/blog/list',
        method: 'GET',
        params,
    })
}

export const searchBlogById = (params: { id: number }) => {
    return http.request<Blog.ListBlogSearchByIdRes>({
        url: '/blog/search/id',
        method: 'GET',
        params,
    })
}
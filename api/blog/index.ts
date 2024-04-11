import {http} from '~/utils/http'
import {type Comment} from '@/api/comment'
import type {List} from 'postcss/lib/list'

export namespace Blog {
    export interface CreateBlogReq {
        title: string
        des: string
        cover: string
        content: string
        keywords: string
        tags?: string[] | number[]
    }

    export interface UpdateBlogReq {
        id: number
        title: string
        des: string
        cover: string
        content: string
        keywords: string
        tags?: string[] | number[]
    }

    export interface UpdateBlogRes {
        message: string
    }

    export interface DeleteBlogReq {
        id: number
    }

    export interface DeleteBlogRes {
        message: string
    }

    export interface ListBlogRes {
        count: number
        list: ListBlogItem[]
    }

    export interface ListBlogSearchByIdRes {
        info: ListBlogItem
    }

    export interface ListBlogSearchByIdsRes {
        info: ListBlogItemByids[]
    }

    export type ListBlogItemByids = Pick<ListBlogItem, 'id' | 'uid' | 'title' | 'des' | 'cover'>

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
        keywords: string
        user: UserInfo
        tag: Tag[]
        comment: Comment.CommentInfo[]
    }

    export interface UserInfo {
        id: number
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

    export interface ListBlogSearchByUserIdRes {
        count: number
        infos: ListBlogSearchByUserIdInfo[]
    }

    export interface ListBlogSearchByUserIdInfo {
        id: number
        title: string
        des: string
        cover: string
        created: number
        updated: number
    }
}
export const createBlog = (data: Blog.CreateBlogReq) => {
    return http.request({
        url: '/blog/create',
        method: 'POST',
        data,
    })
}

export const listBlog = (params: { page: number, limit: number, type: 'created' | 'recently' | 'top' }) => {
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

export const updateBlog = (data: Blog.UpdateBlogReq) => {
    return http.request<Blog.UpdateBlogRes>({
        url: '/blog/update',
        method: 'POST',
        data,
    })
}

export const deleteBlog = (data: Blog.DeleteBlogReq) => {
    return http.request<Blog.DeleteBlogRes>({
        url: '/blog/delete',
        method: 'POST',
        data,
    })
}

export const searchBlogByIds = (data: { ids: number[] }) => {
    return http.request<Blog.ListBlogSearchByIdsRes>({
        url: '/blog/search/ids',
        method: 'POST',
        data,
    })
}

export const searchBlogByUserId = (data: { page: number, limit: number, id: number }) => {
    return http.request<Blog.ListBlogSearchByUserIdRes>({
        url: '/blog/search/userid',
        method: 'POST',
        data,
    })
}
import {http} from '@/utils/http'

export namespace Comment {
    export interface CommentListReq {
        id: number
        type: 'article' | 'comment' | 'website'
    }

    export interface CommentListRes {
        count: number
        info: CommentInfo[]
    }

    export interface CommentInfo {
        id: number
        created: number
        content: string
        article_id: number
        comment_id: number
        website_user_id: number
        user_id: number
        type: string
        user: UserInfo
    }

    export interface UserInfo {
        id: number
        uid: string
        username: string
        avatar: string
    }

    export interface CommentCreateReq {
        content: string
        article_id?: number
        comment_id?: number
        website_user_id?: number
        type: 'article' | 'comment' | 'website'
    }

    export interface CommentCreateRes {
        message: string
    }
}

export const listComment = (params: Comment.CommentListReq) => {
    return http.request<Comment.CommentListRes>({
        url: '/comment/list',
        method: 'GET',
        params,
    })
}

export const createComment = (data: Comment.CommentCreateReq) => {
    return http.request<Comment.CommentCreateRes>({
        url: '/comment/create',
        method: 'POST',
        data,
    })
}
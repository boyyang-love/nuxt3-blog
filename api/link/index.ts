import {http} from '@/utils/http'

export declare namespace LinkApi {

    export interface CreateLinkReq {
        website_name: string
        website_url: string
        website_icon: string
        website_desc: string
        email: string
        code: number | string
    }

    export interface ListLinkReq {
        page: number
        limit: number
        status: number
    }

    export interface ListLinkRes {
        count: number
        list: ListLinkItem[]
    }

    export interface ListLinkItem {
        website_name: string
        website_url: string
        website_icon: string
        website_desc: string
        status: number
    }
}

export const createLink = (data: LinkApi.CreateLinkReq) => {
    return http.request({
        url: '/link/create',
        method: 'POST',
        data,
    })
}

export const listLink = (params: LinkApi.ListLinkReq) => {
    return http.request<LinkApi.ListLinkRes>({
        url: '/link/list',
        method: 'get',
        params,
    })
}


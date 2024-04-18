import {http} from '@/utils/http'

export namespace Category {

    export interface CategoryListRes {
        info: CategoryInfo[]
    }

    export interface CategoryInfo {
        id: number
        name: string
        cover: string
        des: string
    }

    export type CategoryCreateReq = Omit<CategoryInfo, 'id'>
}

export const categoryCreate = (data: Category.CategoryCreateReq) => {
    return http.request<Category.CategoryListRes>({
        url: '/categories/create',
        method: 'POST',
        data,
    })
}

export const categoryDelete = (data: { id: number }) => {
    return http.request({
        url: '/categories/delete',
        method: 'POST',
        data,
    })
}

export const categoryUpdate = (data: Category.CategoryInfo) => {
    return http.request({
        url: '/categories/update',
        method: 'POST',
        data,
    })
}

export const categoryList = (params: { user_id: number }) => {
    return http.request<Category.CategoryListRes>({
        url: '/categories/info',
        method: 'GET',
        params,
    })
}
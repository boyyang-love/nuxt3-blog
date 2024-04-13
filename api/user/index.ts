import {http} from '@/utils/http'

export namespace User {
    export interface UpdateUserInfoReq {
        id: number
        username: string
        avatar: string
        cover: string
        motto: string
        address: string
        tel: number
        email: string
        qq: number
        wechat: string
        git_hub: string
    }

    export interface UserInfoByIdRes {
        id: number
        username: string
        motto: string
        avatar: string
        cover: string
        blog_count: number
        wallpaper_count: number
        tags_count: number
    }
}
export const updateUserInfo = (data: Partial<User.UpdateUserInfoReq>) => {
    return http.request({
        url: '/user/update',
        method: 'POST',
        data,
    })
}

export const updateUserPassword = (data: { password: string }) => {
    return http.request({
        url: '/user/update/password',
        method: 'POST',
        data,
    })
}

export const getUserInfoById = (params: { id: number }) => {
    return http.request<User.UserInfoByIdRes>({
        url: '/user/info',
        method: 'GET',
        params,
    })
}
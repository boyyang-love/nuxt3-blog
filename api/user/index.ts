import {http} from '@/utils/http'

export namespace User {
    export interface UpdateUserInfoReq {
        id: number
        username: string
        avatar: string
        motto: string
        address: string
        tel: number
        email: string
        qq: number
        wechat: string
        git_hub: string
    }

    export interface UpdateUserInfoRes {
        message: string
    }
}
export const updateUserInfo = (data: Partial<User.UpdateUserInfoReq>) => {
    return http.request<User.UpdateUserInfoRes>({
        url: '/user/update',
        method: 'POST',
        data,
    })
}
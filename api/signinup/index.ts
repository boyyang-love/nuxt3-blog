import {http} from '~/utils/http'

export namespace Signinup {
    export interface SignupReq {
        username: string
        password: string
        email: string
    }

    export interface SigninReq {
        username: string
        password: string
    }

    export interface SigninRes {
        token: string
        user_info: UserInfo
    }

    export interface UserInfo {
        id: number
        uid: string
        username: string
        avatar: string
        account: string
        motto: string
        address: string
        tel: string
        email: string
        qq: string
        wechat: string
        git_hub: string
    }
}
export const signup = (data: Signinup.SignupReq) => {
    return http.request({
        url: '/user/signup',
        method: 'POST',
        data: data,
    }, {
        serializeParams: false,
    })
}

export const signin = (data: Signinup.SigninReq) => {
    return http.request<Signinup.SigninRes>({
        url: '/user/signin',
        method: 'POST',
        data,
    })
}
import type {RequestOptions, Result, TransForm} from './types'
import type {AxiosError, AxiosResponse} from 'axios'
import qs from 'qs'
import {useUserStore} from '@/store/modules/user'
import {useRouter} from 'vue-router'

const transForm: TransForm = {
    beforeRequestHook(config, opt) {
        const {
            serializeParams,
            joinTime,
            withToken,
        } = opt

        // post 序列化参数
        if (serializeParams) {
            if (config.method?.toUpperCase() === 'POST') {
                config.data = qs.stringify(config.data)
            }
        }
        // get 添加时间戳
        if (joinTime) {
            if (config.method?.toUpperCase() === 'GET') {
                config.params = {
                    ...config.params,
                    _t: new Date().getTime(),
                }
            }
        }
        // 是否加上 token
        if (withToken) {
            const userStore = useUserStore()
            config.headers = {
                ...config.headers,
                [opt.tokenKey as string]: opt.token || userStore.token,
            }
        }

        return config
    },

    transformRequestData(res: AxiosResponse<Result>, opt) {
        const {
            isShowMessage,
            isShowSuccessMessage,
            isShowErrorMessage,
            isReturn,
        } = opt


        const {code, msg, data} = res.data

        if (isShowMessage) {
            if (isShowSuccessMessage && code === 1) {
            }

            if (isShowErrorMessage && code === 0) {
            }
        }

        if (!isReturn) {
            return {data: {code: 0, msg: ''}}
        }


        return res
    },

    responseInterceptors(res: AxiosResponse<Result, any>): AxiosResponse<Result, any> {
        return res
    },

    requestCatch(e: AxiosError, options: RequestOptions) {
        const router = useRouter()
        if (e?.response?.status === 401) {
            window.localStorage.clear()
            router.replace({name: 'Login'}).then(() => {
            })
        }
    },
}

export {
    transForm,
}
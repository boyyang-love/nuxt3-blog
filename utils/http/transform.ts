import type {RequestOptions, Result, TransForm, ResultErr} from './types'
import type {AxiosError, AxiosResponse} from 'axios'
import qs from 'qs'
import {useUserStore} from '@/store/modules/user'
import {emit} from '@/utils/emit'

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

    transformRespData(res: AxiosResponse<Result>, opt) {

        if (res.data.code === 1 && res.data.msg !== "ok" && res.data.msg) {
            window.$message.success(res.data.msg)
        }

        return res
    },

    responseInterceptors(res: AxiosResponse<Result, any>): AxiosResponse<Result, any> {
        return res
    },

    respCatch(e: AxiosError<ResultErr, any>, options: RequestOptions) {
        if (e.response?.status === 401) {
            window.$notification.create({
                type: 'error',
                title: '提示',
                content: 'token过期，请重新登录',
            })
        }

        if (e.response?.status === 413) {
            window.$notification.create({
                type: 'error',
                title: '提示',
                content: '图片过大',
            })
        }


        if (e.response?.data && e.response.data.msg) {
            window.$message.error(e.response.data.msg)
        }

        window.$uploadProgress.end()

        return e.response?.data as ResultErr
    },
}

export {
    transForm,
}
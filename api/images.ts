import {http} from '@/utils/http'

export const imagesList = (params: { page: number, limit: number }) => {
    return http.request({
        method: 'GET',
        url: '/tray',
        params: params,
    })
}
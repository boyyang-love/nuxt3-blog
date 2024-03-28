import {http} from '@/utils/http'

export const sendEmail = (data: { email: string }) => {
    return http.request({
        url: '/email/code',
        method: 'POST',
        data,
    })
}
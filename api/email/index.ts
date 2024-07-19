import {http} from '@/utils/http'

export const sendEmail = (data: { email: string, type: 'blog' | 'link' }) => {
    return http.request({
        url: '/email/code',
        method: 'POST',
        data,
    })
}
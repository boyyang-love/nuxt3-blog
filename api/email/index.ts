import {http} from '@/utils/http'

export const sendEmail = (data: { email: string, type: 'blog' | 'link', subject: string }) => {
    return http.request({
        url: '/email/code',
        method: 'POST',
        data,
    })
}
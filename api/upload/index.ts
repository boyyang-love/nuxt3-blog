import {http} from '@/utils/http'

export namespace Upload {
    export interface UploadRes {
        file_name: string
        path: string
    }

    export interface UploadListItem {
        id: number
        file_name: string
        file_path: string
    }

    export interface UploadListRes {
        count: number
        infos: UploadListItem[]
    }

}

export const uploadFile = (data: { file_name: string, file: File, dir: string }) => {
    const formData = new FormData()
    formData.append('file_name', data.file_name)
    formData.append('dir', data.dir)
    formData.append('file', data.file)


    return http.request<Upload.UploadRes>(
        {
            method: 'POST',
            url: '/file/upload',
            data: formData,
        },
        {
            serializeParams: false,
        },
    )
}

export const uploadList = (params: { page: number, limit: number, type: 'blog' | 'image' | 'avatar' }) => {
    return http.request<Upload.UploadListRes>({
        url: '/file/list',
        method: 'GET',
        params,
    })
}
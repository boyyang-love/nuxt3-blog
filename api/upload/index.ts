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
        status: boolean
        w: number
        h: number
    }

    export interface UploadListRes {
        count: number
        infos: UploadListItem[]
    }

    export type FileType = 'images' | 'blog' | 'bg' | 'avatar' | 'categories'

    export interface UploadDeleteReq {
        id: number
        file_path: string
        type: FileType
    }

    export interface UploadDeleteRes {
        message: string
    }

    export type UploadListPublicItem = UploadListItem

    export interface UploadListPublicRes {
        count: number
        infos: UploadListPublicItem[]
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
            timeout: 1000 * 60 * 3
        },
        {
            serializeParams: false,
        },
    )
}

export const uploadList = (params: { page?: number, limit?: number, type: Upload.FileType}) => {
    return http.request<Upload.UploadListRes>({
        url: '/file/list',
        method: 'GET',
        params,
    })
}

export const uploadDelete = (data: Upload.UploadDeleteReq) => {
    return http.request<Upload.UploadDeleteRes>({
        url: '/file/delete',
        method: 'POST',
        data,
    })
}

export const uploadListPublic = (params: { page?: number, limit?: number, id: number }) => {
    return http.request<Upload.UploadListPublicRes>({
        url: '/file/list/public',
        method: 'GET',
        params,
    })
}

export const uploadStatus = (data: { id: number, status: boolean }) => {
    return http.request({
        url: '/file/status',
        method: 'POST',
        data,
    })
}
import {type UploadInst, type UploadFileInfo, type UploadCustomRequestOptions} from 'naive-ui'
import {uploadFile} from '@/api/upload'
import {env} from '@/utils/env'

export const useFileUpload = (dir = "blog") => {
    const uploadRef = ref<UploadInst | null>()
    const imgUrl = ref<string>()
    const onChange = (options: { fileList: UploadFileInfo[] }) => {
        const data = {
            file_name: options.fileList[0].name,
            file: options.fileList[0].file as File,
            dir: dir,
        }
        uploadFile(data).then(res => {
            imgUrl.value = `${env.VITE_APP_IMG_URL}${res.data.path}`
            options.fileList[0].status = 'finished'
        })
    }

    const customRequest = (
        {
            file,
            data,
            headers,
            withCredentials,
            action,
            onFinish,
            onError,
            onProgress,
        }: UploadCustomRequestOptions) => {
        window.$loadingBar.start()
        uploadFile({
            file_name: file.name,
            file: file.file as File,
            dir: 'blog',
        }).then(res => {
            imgUrl.value = `${env.VITE_APP_IMG_URL}${res.data.path}`
            onFinish()
            window.$loadingBar.finish()
            window.$message.success(`文件[${file.name}]上传成功`)
        })
    }
    return {
        imgUrl,
        uploadRef,
        onChange,
        customRequest,
    }
}
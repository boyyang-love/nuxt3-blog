import {type UploadInst, type UploadFileInfo, type UploadCustomRequestOptions} from 'naive-ui'
import {uploadFile} from '@/api/upload'

interface UploadSucess {
    FileInfo: FileInfo
}

interface FileInfo {
    file_name: string
    file_baseurl: string
    file_url: string
}

export const useFileUpload = (dir = 'blog', success?: (info: UploadSucess) => void) => {
    const uploadRef = ref<UploadInst | null>()
    const imgUrl = ref<string>()
    const imgBase64 = ref<string>()
    const fileInfo = reactive<{ file_name: string | null | undefined }>({file_name: ''})

    const uploadFileInfo = ref<UploadFileInfo | null>()

    const onChange = (options: { fileList: UploadFileInfo[] }) => {
        uploadFileInfo.value = options.fileList[0]
        const file = options.fileList[0]?.file

        fileInfo.file_name = file?.name

        const blob = new Blob([file as File], {type: file?.type})

        const render = new FileReader()
        render.readAsDataURL(blob)
        render.onload = () => {
            imgBase64.value = render.result as string
        }
    }

    const submit = () => {
        if (uploadFileInfo.value) {
            const file = uploadFileInfo.value?.file as File
            window.$loadingBar.start()
            window.$uploadProgress.begin()
            uploadFile({
                file_name: fileInfo?.file_name as string,
                file: file,
                dir: dir,
            }).then(res => {
                imgUrl.value = res.data.path
                success?.({
                    FileInfo: {
                        file_name: file.name,
                        file_baseurl: res.data.path,
                        file_url: imgUrl.value,
                    },
                })
                window.$loadingBar.finish()
                window.$uploadProgress.end()
                fileInfo.file_name = ''
                imgBase64.value = ''
                uploadFileInfo.value = null
            })
        } else {
            window.$message.error('没有获取到文件信息')
        }
    }

    const customRequest = ({file, onFinish}: UploadCustomRequestOptions) => {
        window.$loadingBar.start()
        window.$uploadProgress.begin()
        uploadFile({
            file_name: file.name,
            file: file.file as File,
            dir: dir,
        }).then(res => {
            imgUrl.value = res.data.path
            onFinish()
            success?.({
                FileInfo: {
                    file_name: file.name,
                    file_baseurl: res.data.path,
                    file_url: imgUrl.value,
                },
            })
            window.$uploadProgress.end()
            window.$loadingBar.finish()
        })
    }

    return {
        imgUrl,
        imgBase64,
        uploadRef,
        fileInfo,
        onChange,
        customRequest,
        submit,
    }
}
import {uploadFile} from '~/api/upload'
import {type IToolbarConfig, type IEditorConfig,} from '@wangeditor-next/editor'

type InsertFnType = (url: string, alt: string, href: string) => void
import {env} from '@/utils/env'
import {ref} from 'vue'

const insertedImages = ref<string[]>([])

const useConfig = () => {
    const toolbarConfig: Partial<IToolbarConfig> = {
        excludeKeys: ['insertVideo', 'uploadVideo'],
    }
    const editorConfig: Partial<IEditorConfig> = {
        placeholder: '请输入内容',
        MENU_CONF: {
            uploadImage: {
                async customUpload(file: File, insertFn: InsertFnType) {  // TS 语法
                    window.$loadingBar.start()
                    window.$uploadProgress.begin()
                    const res = await uploadFile({file_name: file.name, file: file, dir: 'blog'})
                    window.$loadingBar.finish()
                    window.$uploadProgress.end()

                    insertFn(`${env.VITE_APP_IMG_URL}/${res.data.path}`, file.name, `${env.VITE_APP_IMG_URL}/${res.data.file_name}`)
                },
            } as any,
            insertImage: {
                onInsertedImage(imageNode: any | null) {  // TS 语法
                    // onInsertedImage(imageNode) {                    // JS 语法
                    if (imageNode == null) return
                    const {src, alt, url, href} = imageNode
                    insertedImages.value.push(src)
                },
            },
        },
        scroll: false,
    }

    return {
        insertedImages,
        toolbarConfig,
        editorConfig,
    }
}

export {
    useConfig,
}
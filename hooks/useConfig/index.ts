import {uploadFile} from '~/api/upload'

type InsertFnType = (url: string, alt: string, href: string) => void
import {env} from '@/utils/env'
import {ref} from 'vue'

const insertedImages = ref<string[]>([])
const useConfig = () => {
    const toolbarConfig = {}
    const editorConfig = {
        placeholder: '请输入内容',
        MENU_CONF: {
            uploadImage: {
                async customUpload(file: File, insertFn: InsertFnType) {  // TS 语法
                    window.$loadingBar.start()
                    const res = await uploadFile({file_name: file.name, file: file, dir: 'blog'})
                    window.$loadingBar.finish()

                    insertFn(`${env.VITE_APP_IMG_URL}/${res.data.path}`, file.name, `${env.VITE_APP_IMG_URL}/${res.data.file_name}`)
                },
            },
            insertImage: {
                onInsertedImage(imageNode: any | null) {  // TS 语法
                    // onInsertedImage(imageNode) {                    // JS 语法
                    if (imageNode == null) return
                    const { src, alt, url, href } = imageNode
                    insertedImages.value.push(src)
                },
            }
        },
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
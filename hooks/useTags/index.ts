import {NInput} from 'naive-ui'
import {type Tag, tagList, tagCreate} from '~/api/tags'

type TagType = 'image' | 'article'
export const useTags = (type: TagType) => {
    const list = ref<Tag.TagInfo[]>([])

    const getTags = () => {
        tagList({type: type}).then((res) => {
            list.value = res.data.tags
        })
    }

    const createNewTag = (type: TagType) => {
        let tagName = ''
        window.$dialog.create({
            title: '创建标签',
            positiveText: '创建',
            negativeText: '取消',
            onPositiveClick: () => {
                if (tagName.trim() === '') {
                    window.$message.warning('标签名称不能为空')
                    return false
                } else {
                    tagCreate({name: tagName, type: type}).then(() => {
                        getTags()
                    })
                }
            },
            content: () => h(NInput, {
                placeholder: '请输入标签名称',
                style: {
                    marginTop: '20px',
                },
                onChange: (e) => {
                    tagName = e
                },
            }, () => []),
        })

    }

    onMounted(() => {
        getTags()
    })


    return {
        list,
        getTags,
        createNewTag,
    }
}
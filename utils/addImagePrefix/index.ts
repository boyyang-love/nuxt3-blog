import {env} from '~/utils/env'

const addImagePrefix = (url: string) => {
    return `${env.VITE_APP_IMG_URL}${url}`
}

export {
    addImagePrefix,
}
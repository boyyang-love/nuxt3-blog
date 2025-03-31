import {env} from '~/utils/env'

const addImagePrefix = (url: string) => {
    if (url.includes("http")) {
        return url
    }
    return `${env.VITE_APP_IMG_URL}${url}`
}

export {
    addImagePrefix,
}
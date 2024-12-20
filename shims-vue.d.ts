import {MessageApi, DialogApi, NotificationApi, LoadingBarApi} from 'naive-ui'

declare global {
    interface Window {
        $message: MessageApi
        $dialog: DialogApi
        $notification: NotificationApi
        $loadingBar: LoadingBarApi
        $uploadProgress: {
            begin: () => void;
            end: () => void;
        },
        confetti: any,
        THREE: any
        VANTA: {
            RINGS: any
            WAVES: any
            NET: any
            FOG: any
            CELLS: any
            BIRDS: any
            TRUNK: any
            GLOBE: any
            HALO: any
        }
    }
}

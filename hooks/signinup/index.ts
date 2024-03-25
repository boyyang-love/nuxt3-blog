import {reactive} from 'vue'
import {signup, signin} from '@/api/signinup'
import {useUserStoreWithOut} from '@/store/modules/user'
import {env} from '~/utils/env'

export const useSigninup = () => {
    const data = reactive({
        username: '',
        password: '',
        isShow: false,
    })

    const userStore = useUserStoreWithOut()

    const signinSub = () => {
        if (data.username.trim() !== '' && data.password.trim() !== '') {
            signin(
                {
                    username: data.username,
                    password: data.password,
                },
            ).then((res) => {
                res.data.user_info.avatar = `${env.VITE_APP_IMG_URL}${res.data.user_info.avatar}`
                userStore.setToken(res.data.token)
                userStore.setUserInfo(res.data.user_info)
                window.$message.success('登录成功')
                data.isShow = false
            })
        }
    }

    const signupSub = () => {

    }

    return {
        data,
        signinSub,
        signupSub,
    }
}
import {reactive} from 'vue'
import {signup, signin} from '@/api/signinup'
import {sendEmail} from '@/api/email'
import {useUserStoreWithOut} from '@/store/modules/user'
import {env} from '~/utils/env'
import {emailRegex} from '@/utils/emailRegex'

export const useSigninup = () => {
    const data = reactive({
        username: '',
        email: '',
        password: '',
        repassword: '',
        code: '',
        isShow: false,
        emailSendDisable: false,
        emailSendDisableTime: 60,
    })

    const userStore = useUserStoreWithOut()

    const signinupSub = () => {
        if (userStore.isSignin) {
            signinSub()
        } else {
            signupSub()
        }
    }

    const signinSub = () => {
        if (data.username.trim() !== '' && data.password.trim() !== '') {
            window.$uploadProgress.begin()
            signin(
                {
                    username: data.username,
                    password: data.password,
                },
            ).then((res) => {
                res.data.user_info.avatar = `${env.VITE_APP_IMG_URL}${res.data.user_info.avatar}`
                res.data.user_info.cover = `${env.VITE_APP_IMG_URL}${res.data.user_info.cover}`
                userStore.setToken(res.data.token)
                userStore.setUserInfo(res.data.user_info)
                window.$message.success('登录成功')
                window.$uploadProgress.end()
                userStore.showSigninModal = false
            }).catch((err) => {
                window.$uploadProgress.end()
                window.$message.error(err.msg)
            })
        } else {
            window.$message.warning('账号和密码为必填项')
        }

    }


    const signupSub = () => {
        if (data.username.trim() !== '' && data.password.trim() !== '' && data.code != '') {
            if (data.password !== data.repassword) {
                window.$message.warning('密码不一致')
                return
            }

            window.$uploadProgress.begin()
            signup({
                username: data.username,
                password: data.password,
                code: data.code,
                email: data.email,
            }).then(() => {
                window.$uploadProgress.end()
                window.$message.success('账号注册成功')
                userStore.isSignin = true
            }).catch((err) => {
                window.$uploadProgress.end()
                window.$message.error(err.msg)
            })
        } else {
            window.$message.warning('用户名，密码，邮箱，code为必填项')
        }
    }

    const sendEmailCode = () => {
        if (data.email.trim() === '') {
            window.$message.warning('请输入邮箱')
            return
        }

        if (!emailRegex(data.email)) {
            window.$notification.create({
                type: 'error',
                title: '提示',
                content: '邮箱格式错误',
            })
            return
        }
        sendEmail({email: data.email}).then(() => {
            window.$notification.create({
                type: 'success',
                title: '提示',
                content: '验证码已经发送到邮箱，请注意查收',
            })
            data.emailSendDisable = true
            const t = setInterval(() => {
                data.emailSendDisableTime--
                if (data.emailSendDisableTime <= 0) {
                    data.emailSendDisableTime = 60
                    data.emailSendDisable = false
                    clearInterval(t)
                }
            }, 1000)
        })
    }

    return {
        data,
        signinupSub,
        sendEmailCode,
    }
}
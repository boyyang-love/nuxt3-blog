import {reactive} from 'vue'
import {signup, signin} from '@/api/signinup'
import {sendEmail} from '@/api/email'
import {useUserStoreWithOut} from '@/store/modules/user'
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
                userStore.setToken(res.data.token)
                userStore.setUserInfo(res.data.user_info)
                window.$uploadProgress.end()
                userStore.showSigninModal = false
            }).catch(() => {
                window.$uploadProgress.end()
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
                userStore.isSignin = true
            }).catch(() => {
                window.$uploadProgress.end()
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
        sendEmail({
            email: data.email,
            type: 'blog',
            subject: '博客注册',
        }).then(() => {
            window.$notification.create({
                type: 'success',
                title: '提示',
                content: '验证码已经发送到邮箱，请注意查收',
                duration: 5000,
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
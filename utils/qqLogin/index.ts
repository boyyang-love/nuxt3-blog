const loginByQQ = (route: any) => {
    const state = JSON.stringify({path: route.path, query: route.query})
    window.sessionStorage.setItem('state', state)
    const url = `https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=${import.meta.env.VITE_APP_QQ_APP_ID}&state=${state}&redirect_uri=${encodeURIComponent(import.meta.env.VITE_APP_QQ_REDIRECTURI)}`
    
    const width = 600
    const height = 700
    const left = (window.innerWidth - width) / 2 + window.screenX
    const top = (window.innerHeight - height) / 2 + window.screenY
    const w = window.open(url, '_blank', `width=${width},height=${height},left=${left},top=${top}`)

    // 检查是否被弹窗拦截
    if (!w || w.closed || typeof w.closed === 'undefined') {
        window.$message.warning('弹窗被拦截，请允许弹窗后重试')
        return
    }

    // 监听来自回调页面的消息
    const handler = (event: MessageEvent) => {
        // 验证消息来源和类型
        if (event.data?.type === 'qq-login-success') {
            window.removeEventListener('message', handler)
            // 登录成功，刷新页面加载用户信息
            window.location.reload()
        } else if (event.data?.type === 'qq-login-cancel') {
            window.removeEventListener('message', handler)
            window.$message.info('已取消QQ登录')
        }
    }
    window.addEventListener('message', handler)

    // 备用方案：如果窗口关闭但没有收到消息，清理监听器
    const t = setInterval(() => {
        if (w && w.closed) {
            clearInterval(t)
            window.removeEventListener('message', handler)
        }
    }, 500)
}

export {
    loginByQQ,
}

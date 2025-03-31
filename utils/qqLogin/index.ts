const loginByQQ = (route: any) => {
    const state = JSON.stringify({path: route.path, query: route.query})
    window.sessionStorage.setItem('state', state)
    const url = `https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=${import.meta.env.VITE_APP_QQ_APP_ID}&state=${state}&redirect_uri=${encodeURIComponent(import.meta.env.VITE_APP_QQ_REDIRECTURI)}`
    window.open(url, '_blank')
}

export {
    loginByQQ,
}
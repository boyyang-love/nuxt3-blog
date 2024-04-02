import axios from 'axios'

let baseUrl = 'http://www.boyyang.cn:9527/blog/list'
const sitemap = {
    hostname: 'http://www.boyyang.cn/',
    path: '/sitemap.xml',
    cacheTime: 1000 * 60 * 60 * 24,
    gzip: true,
    generate: false,
    exclude: [
        '/wallpaper',
        '/index',
        '/create',
        '/upload',
        '/blog/components/CardRight',
        '/detail/components/messageBoard',
        '/wallpaper/components/card',
    ],
    defaults: {
        changefred: 'always',
        lastmod: new Date(),
        priority: 0.8,
    },
    urls: async () => {
        let url = [
            {
                url: `/home`,
                changefreq: 'daily',
                lastmod: new Date(),
                priority: 1,
            },
            {
                url: `/blog`,
                changefreq: 'daily',
                lastmod: new Date(),
                priority: 1,
            },
        ]
        // 请求接口  在循环添加生成
        let res = await axios.get(baseUrl, {
            params: {
                page: 1,
                limit: 1000,
            },
        })
        if (res.data.code === 1) {
            let list = res.data.data.list
            let detailList = list.map((item: any) => ({
                url: `/detail/?id=${item.id}`,
                changefreq: 'daily',
                priority: 0.9,
            }))
            url = [
                ...url,
                ...detailList,
            ]
        }

        return url
    },
}
export {sitemap}
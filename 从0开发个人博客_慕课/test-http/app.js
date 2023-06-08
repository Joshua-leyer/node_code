const http = require('http')
const querystring = require('querystring')

const log = console.log.bind(console)

/**
 * 处理 GET 请求
 */
// const server = http.createServer((req, res) => {
//     log(`查看 req , 请求的url`, req.url)
//     let url = req.url
//     req.query = querystring.parse(url.split('?')[1])
//     log(`query:`, req.query)
//     res.end(
//         JSON.stringify(req.query)
//     )
// })

/**
 * POST 请求
 */
// const server = http.createServer((req, res) => {
//     if (req.method == 'POST') {
//         // 数据格式
//         log('content-type', req.headers['content-type'])
//         let postData = ''
//         // 根本上 POST 请求, 传递的数据并不是一下子把所有数据都传递给后端的,所以后端接受的时候是有一个
//         // 数据流 的概念。 这就需要后端服务器要开一个异步的函数，或者或单独的一个小线程之类的，一直在接受
//         // 数据，数据接受完，告诉 JS 主线程，然后调用回调函数

//         // 什么时候数据来了，什么时候触发 'dada' 是写死的，不能改
//         req.on('data', chunk => {
//             postData += chunk.toString()
//         })
//         // 何时结束何时触发
//         req.on('end', () => {
//             log(postData)
//             res.end('ok') // 要在 on 的回调函数中 返回请求响应, 因为 on 是一个异步函数.
//         })
//     }
// })

const server = http.createServer((req, res) => {
    const method = req.method
    const url = req.url
    const path = url.split('?')[0]
    const query = querystring.parse(url.split('?')[1])


    res.setHeader('Content-type', 'application/json')
    const resData = {
        method,
        url,
        path,
        query
    }

    if (method == 'GET') {
        res.end(
            JSON.stringify(resData)
        )
    }
    if (method == 'POST') {
        let postData = ''
        req.on('data', chunk => {
            postData += chunk.toString()
        })
        req.on('end', () => {
            resData.postData = postData
            res.end( 
                JSON.stringify(resData)
            )
        })
    }
})

server.listen(3000, () => {
    log('http://localhost:3000/')
})



const querystring = require('querystring')

const handleBlogRouter = require('./src/blog')
const handleUserRouter = require('./src/user')


const log = console.log.bind(console)


// 解析接收路由中 post 的 data 数据
const getPostData = (req) => {

    const promise = new Promise((resolve, reject)=>{

        if (req.method !== 'POST') {
            resolve({})
            return   // 如果没有 return ，下面的代码还会继续执行，另外 resolve()是一个 异步函数
                    // 异步函数会被加载到任务队列中。
        }
        // 注意这里  content-type 要写小写，， 真TM 
        // 不是 application/json 就忽略。 注意这里 !操作
        if (req.headers['content-type'] !== 'application/json') {

            resolve({})
            return  
        }
        let postData = ''
        req.on('data', chunk => {
            postData += chunk.toString()
        })
        req.on('end',()=>{
            if (!postData) {
                resolve({})
                return
            }
            console.log(`post data is`, postData)
            resolve(
                JSON.parse(postData)
            )
        })
    })
    return promise
}


const serverHandle = (req, res) => {
    res.setHeader('Content-Type', 'application/json')

    const url = req.url
    req.path = url.split('?')[0]
    console.log(`url is `, url)
    // 解析 query
    req.query = querystring.parse(url.split('?')[1])
    log(`req.query is`, req.query)

    // 处理 POST
    getPostData(req).then(postData => {
        // 把 请求发送过来的内容挂载到 req 上面
        req.body = postData

        // 处理 blog 路由
        const blogResult = handleBlogRouter(req, res)
        if (blogResult) {
            blogResult.then(blogData => {
                    res.end(
                        JSON.stringify(blogData)
                    )
            })
            // 不加 return 会继续往下走的
            return
        }


        // 处理 user 路由
        const userResult = handleUserRouter(req, res)
        if (userResult) {
            userResult.then(userData => {
                res.end(
                    JSON.stringify(userData)
                )
            })
            return 
        }

        // 上面全都未命中
        res.writeHead(404, {"Content-Type": "text/plain"})
        res.write("404 not found")
        res.end()
    })

}

module.exports = serverHandle
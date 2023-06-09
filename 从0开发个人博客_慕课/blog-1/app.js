const querystring = require('querystring')
const { get, set } = require('./src/db/redis')

const handleBlogRouter = require('./src/blog')
const handleUserRouter = require('./src/user')


const log = console.log.bind(console)


const SESSION_DATA = {
    "test": 'lan424'
}

const getCookieExpires = () => {
    const d = new Date()
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
    return d.toGMTString()
}

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
   
    // 解析 cookie
    req.cookie = {}
    const cookieStr = req.headers.cookie || ''
    cookieStr.split(';').forEach(item => {
        if (!item) {
            return
        }
        let arr = item.split('=')
        let key = arr[0].trim() 
        let val = arr[1].trim() 
        req.cookie[key] = val
    })
    console.log(`解析到的 cookie :`, req.cookie)

    // 解析 session
    /*
    let needSetcookie = false
    let userId = req.cookie.userid
    if (userId) {
        if (!SESSION_DATA[userId]) {
            SESSION_DATA[userId] = {}
        }
    } else {
        console.log(`配置要设置的cookie 和 session `)
        needSetcookie = true
        userId = `${Date.now()}_${Math.random()}`
        // 注意这里挂载到 req上面，思想就是 这个 req 对象会走过整个路由过程。 具有携带信息的功能。
        // 这里其实就相当于Session 给提前拦截了，如果发现cookie中的 sessionid， session中保存的有，
        // 那么就把 这个userId 挂载到 req.session 上面。 后续的 路由就可以根据这个 req.session 来判断是否有登陆过或者存储过一些信息。
        // 这里蛮重要的， 结果教程几句带过。甚至没有重点说
        SESSION_DATA[userId] = {}
        console.log(`配置的东西是`, userId, SESSION_DATA)
    }

    // 把 session[key] 挂载到 req.session上面，到时候修改 req.session ，由于对象浅拷贝引用的原因。这里的Session本地数据也会被修改。

    req.session = SESSION_DATA[userId]
    */

      // GET redis 替换 session
    let needSetCookie = false; 
    let userId = req.cookie.userid;
    if( !userId ){ 
        needSetCookie = true;
        userId = `${ Date.now() }_${ Math.random() }`
        set(userId, {}) //初始化 session
    }
    // 获取 session
    req.sessionId = userId
    get(req.sessionId).then( sessionData => {
        console.log('sessionData', sessionData)
        if( sessionData == null ) {
            set(req.sessionId, {})
            req.session = {}
        } else {
            req.session = sessionData
        }

        return getPostData(req);
    })
    .then( postData => {
        // 把 请求发送过来的内容挂载到 req 上面
        req.body = postData

        // 处理 blog 路由
        const blogResult = handleBlogRouter(req, res)
        if (blogResult) {
            blogResult.then(blogData => {
                    if (needSetcookie) {
                        res.setHeader('Set-Cookie',`userid=${userId}; path=/; httpOnly; expiress=${getCookieExpires()}`)
                    }
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
                if (needSetcookie) {
                    console.log(`需要设置cookie`)
                    res.setHeader('Set-Cookie',`userid=${userId}; path=/; httpOnly; expiress=${getCookieExpires()}`)
                }
                // console.log(`修改session 以后session 数据是`, SESSION_DATA)
                res.end(
                    JSON.stringify(userData)
                )
            }).catch(err => {
                if (needSetcookie) {
                    res.setHeader('Set-Cookie',`userid=${userId}; path=/; httpOnly; expiress=${getCookieExpires()}`)
                }
                res.end(
                    JSON.stringify(err)
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
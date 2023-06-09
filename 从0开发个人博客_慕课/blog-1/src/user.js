const { login } = require('./controller/user')
const { SuccessModel, ErrorModel } = require('./model/resmodel')
const { set } = require('./db/redis')

const getCookieExpires = () => {
    const d = new Date()
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
    return d.toGMTString()
}


const handleUserRouter = (req, res) => {
    const method = req.method
    // const url = req.url
    // const path = url.split('?')[0]
    console.log(`req.path is`, req.path)
    if (method == 'POST' && req.path == '/api/user/login') {

        const { username, password } = req.body

        const result = login(username, password)
        return result.then( val => {
            console.log(`val`, val)
            if (val.username) {
                // 设置 session
                req.session.username = val.username
                req.session.realname = val.realname
                console.log(`req.session is :`, req.session)
                // 同步到 redis 
                set(req.sessionId, req.session)
                // console.log(`修改req.session 下的数据`)
                // req.session["test"] = 'aaaa'
                return new SuccessModel()
            }
            return new ErrorModel('登录错误')
        })
        
    }

    if (method == 'GET' && path == '/api/user/login-test') {
        // 在 路由处理之前 session 就已经拦截处理，把 http 请求携带的 cookie 挂载到 re.session 上面了
        if (req.session.username) {
            return Promise.resolve(
                new SuccessModel({ 
                    session: req.session 
                })
            )
        }
        return Promise.reject(
            new ErrorModel('尚未登录')
        )
    }

}

module.exports = handleUserRouter
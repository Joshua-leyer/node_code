const http = require('http');
const slice = Array.prototype.slice

class LikeExpress {
    constructor() {
        this.routes = {
            all: [],
            get: [],
            post: []
        }
    }
    register(path) {
        const info = {}
        // 有时候是中间件, 直接传递进来的是一个函数， app.use()的用法. use也就是所有的路由都会走的一个函数处理
        if (typeof path === 'string') {
            info.path = path
            // 从二个参数开始，转换为数组 存入 stack
            info.stack = slice.call(arguments, 1) // 数组
        } else {
            info.path = "/"
            info.stack = slice.call(arguments, 0)
        }
        return info
    }

    use() {
        const info = this.register.apply(this, arguments)
        this.routes.all.push(info)
    }
    get() {
        const info = this.register.apply(this, arguments)
        this.routes.get.push(info)
    }
    post() {
        const info = this.register.apply(this, arguments)
        this.routes.post.push(info)
    }
    callBakc() {
        return (erq, res) => {
            res.json = (data) => {
                res.setHeader('Content-Type', 'application/json')
                res.end(
                    JSON.stringify(data)
                )
            }
            const url = req.url
            const method = req.method.toLowerCase()
            看不懂了，先不学这里了。
        }
    }
    listen(...args) {
        const server = http.createServer(this.callBakc())
        server.listen(...args)
    }
}


module.exports = () => { 
    return new LikeExpress()
}
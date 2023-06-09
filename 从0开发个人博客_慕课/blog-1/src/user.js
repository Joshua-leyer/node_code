const { login } = require('./controller/user')
const { SuccessModel, ErrorModel } = require('./model/resmodel')


const handleUserRouter = (req, res) => {
    const method = req.method
    const url = req.url
    const path = url.split('?')[0]

    if (method == 'POST' && path == '/api/user/login') {
        let {username, password} = req.body
        const result = login(username, password)
        return result.then((data) => {
            console.log(data)
            if (data.username) {
                return new SuccessModel()
            }
            return new ErrorModel('登录错误')
        })
        
    }

}

module.exports = handleUserRouter
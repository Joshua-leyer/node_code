class BaseModel {
    constructor(data, message) {
        // 传递参数的写法, 正常规定 data 是对象类型,但是如果我们只传入了字符串类型, 就用这种方式判断.
        // 用 data 形参当做 message使用, 而且这只是内部的兼容。
        if (typeof data === 'string') {
            this.message = data
            data = null
            message = null
        }
        if (data) {
            this.data = data
        }
        if (message) {
            this.message = message
        }
    }
}

class SuccessModel extends BaseModel {
    constructor(data, message) {
        super(data, message)
        this.errno = 0
    }
}

class ErrorModel extends BaseModel {
    constructor(data, message) {
        super(data, message)
        this.errno = -1
    }
}

module.exports = {
    SuccessModel,
    ErrorModel
}


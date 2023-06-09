const env = process.env.NODE_ENV // 获取环境变量,不需要引用
// 这里的值是 package.json script 里面定义的
let MYSQL_CONFIG

if(env == 'dev') {
    MYSQL_CONFIG = {
        host: 'localhost',
        user: 'root',
        password: '',
        port: '3306',
        database: 'myblog'
    }
}

// 按理说 ， 这里不应该使用这个配置，应该是线上使用的配置
if (env == 'production') {
    MYSQL_CONFIG = {
        host: 'localhost',
        user: 'root',
        password: '',
        port: '3306',
        database: 'myblog'
    }
}

module.exports = {
    MYSQL_CONFIG
}





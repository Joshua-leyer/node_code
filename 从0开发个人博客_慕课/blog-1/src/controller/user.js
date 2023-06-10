const {exec, escape} = require('../db/mysql')


const login = (username, password) => {
    console.log(username, password)
    // 通过 escape() 函数执行过滤一下语句
    username = escape(username)
    password = escape(password)
    
    // 注意这里 '' 单引号去掉
    const sql = `
        select username, realname from users where username=${username} and password=${password}
    `
    return exec(sql).then((rows) => {
            return rows[0] || {}
        })

} 
 
module.exports = {
    login
}
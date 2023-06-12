const mysql = require('mysql')
const {MYSQL_CONFIG} = require('../conf/db')


const con = mysql.createConnection(MYSQL_CONFIG)

con.connect()

// 执行 mysql 查询语句
function exec(sql) {
    // const sql = 'select * from users';
    const promise = new Promise((resolve, reject) => {
        con.query(sql, (err, result) => {
            if (err) {
                reject(err)
            }
            resolve(result)
        })    
    })
    return promise
}

module.exports = {
    exec,
    escape: mysql.escape
}




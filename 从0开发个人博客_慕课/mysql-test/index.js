const mysql = require('mysql')

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    port: '3306',
    database: 'myblog'
})

con.connect()

const sql = 'select * from users';
con.query(sql, (err, result) => {
    if (err) {
        return console.log(err)
    }
    console.log(result)
})

con.end()




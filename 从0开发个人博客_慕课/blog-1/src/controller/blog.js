const {exec} = require('../db/mysql')

// queryString URL参数的方式传递过来的
const getList = (author, keyword) => {
    // 1=1 永远成立，显然写不写都一样。不过写了的作用就是占位置
    // 避免 author keyword 没有值 ，导致sql 语句报错
    let sql = `select * from blogs where 1=1 `
    if (author) {
        sql += `and author='${author}' `
    }
    if (keyword) {
        sql += `and title like '%${keyword}%' `
    }
    sql += `order by createtime desc;`
    // 返回 promise
    return exec(sql)
}


const getDetail = (id) => {
    const sql = `select * from blogs where id='${id}' `
    // back Promise 对象
    return exec(sql).then(rows => {
        return rows[0]
    })
}

// data = {} , 兼容如果 data 没有就默认 {}
const newBlog = (data = {}) => {
    const title = data.title
    const content = data.content
    const author = data.author
    const createtime = Date.now()
    const sql = `
        insert into blogs (title, content, author, createtime)
        values ('${title}','${content}','${author}', ${createtime});
    `
    return exec(sql).then((insertData) => {
        console.log(`insertData is`, insertData)
        return {
            id: insertData.insertId
        }
    })

}

const updateBlog = (id, data = {}) => {
    const title = data.title
    const content = data.content
    const sql = `
        update blogs set title='${title}', content='${content}' 
        where id='${id}'
    `
    return exec(sql).then((updateResult) => {
        console.log(`updateResult is`, updateResult)
        if (updateResult.affectedRows > 0) {
            return true
        }
        return false
    })
}

const deleteBlog = (id, author) => {
    const sql = `
        delete from blogs where id='${id}' and author='${author}'
    `
    return exec(sql).then((deleteResult) => {
        console.log(`deleteResult is`, deleteResult)
        if (deleteResult.affectedRows > 0) {
            return true
        }
        return false
    })}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    deleteBlog
}
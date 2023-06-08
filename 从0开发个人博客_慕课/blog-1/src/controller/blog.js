const  getList = (author, keyword) => {
    return [
        {
            _id: 1,
            title: '标题1',
            content: '内容',
            author: 'joshua'
        }
    ]
}


const getDetail = (id) => {
    return {
        id: 1,
        title: '标题1',
        content: '内容',
        createTime: 125123,
        author: 'joshua'
    }
}

// data = {} , 兼容如果 data 没有就默认 {}
const newBlog = (data = {}) => {
    console.log(`newblog 获取到数据`, data)
    return {
        id: data
    }
}

const updateBlog = (id, data = {}) => {
    console.log(`updateBlog `, data)
    return true
}
const deleteBlog = (id) => {
    console.log(`deleteBlog`, id)
    return true
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    deleteBlog
}
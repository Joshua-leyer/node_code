const {getList, getDetail, newBlog, updateBlog, deleteBlog} = require('./controller/blog')
const { SuccessModel, ErrorModel} = require('./model/resmodel')


const handleBlogRouter = (req, res) => {
    const method = req.method
    const url = req.url
    const path = url.split('?')[0]
    const id = req.query.id || ''

    if (method == 'GET' && path == '/api/blog/list') {
        console.log(`req.query`, req.query)
        const author = req.query.author || ''
        const keyword = req.query.keyword || ''
        
        const blogListData = getList(author, keyword)

        return new SuccessModel(blogListData)
    }

    if (method == 'GET' && path == '/api/blog/detail') {
        // const id = req.query.id || ''
        const blogDeatilData = getDetail(id)
        return new SuccessModel(blogDeatilData)
    }

    if (method == 'POST' && path == '/api/blog/new') {
        const blogData = req.body
        const data = newBlog(blogData)
        return new SuccessModel(data)
    }

    if (method == 'POST' && path == '/api/blog/update') {
        const result = updateBlog(id, req.body)
        if (result) {
            return new SuccessModel()
        } else {
            return new ErrorModel('更新失败')
        }
    }

    if (method == 'POST' && path == '/api/blog/delete') {
        const result = deleteBlog(id)
        if (result) {
            return new SuccessModel()
        } else {
            return new ErrorModel('删除失败')
        }

    }
}

module.exports = handleBlogRouter
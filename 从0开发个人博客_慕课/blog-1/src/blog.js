const {getList, getDetail, newBlog, updateBlog, deleteBlog} = require('./controller/blog')
const { SuccessModel, ErrorModel} = require('./model/resmodel')


const handleBlogRouter = (req, res) => {
    const method = req.method
    const url = req.url
    const path = url.split('?')[0]
    const id = req.query.id || ''

    if (method == 'GET' && path == '/api/blog/list') {
        // console.log(`req.query`, req.query)
        const author = req.query.author || ''
        const keyword = req.query.keyword || ''
        
        // const blogListData = getList(author, keyword)
        // return new SuccessModel(blogListData)
        const resultPromise = getList(author, keyword)
        return resultPromise
                .then(listData => {
                    return new SuccessModel(listData)
                })
                .catch(err => {
                    return new ErrorModel(err)
                })
    }

    if (method == 'GET' && path == '/api/blog/detail') {
        // const id = req.query.id || ''
        // const blogDeatilData = getDetail(id)
        // return new SuccessModel(blogDeatilData)
        const resultPromise = getDetail(id)
        return resultPromise
                .then(data => {
                    return new SuccessModel(data)
                })
    }

    if (method == 'POST' && path == '/api/blog/new') {
        // 假数据. 开发登录功能以后传递这个数据.
        req.body.author = 'joshua4'
        const blogData = req.body
        const resultPromise = newBlog(blogData)
        return resultPromise
                .then(data => {
                    return new SuccessModel(data)
                })
    }

    // 通过 querystring id=  传参锁定哪个 blog
    if (method == 'POST' && path == '/api/blog/update') {
        
        const result = updateBlog(id, req.body)
        return result.then(val => {
                if (val) {
                    return new SuccessModel()
                } else {
                    return new ErrorModel('更新失败')
                }   
            })
        
    }

    if (method == 'POST' && path == '/api/blog/delete') {
        // 假数据
        req.body.author = 'joshua4'

        const result = deleteBlog(id, req.body.author)
        return result.then(val => {
            if (val) {
                return new SuccessModel()
            } else {
                return new ErrorModel('删除失败')
            }
        })


    }
}

module.exports = handleBlogRouter
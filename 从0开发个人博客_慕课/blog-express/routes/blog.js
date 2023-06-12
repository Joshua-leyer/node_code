var express = require('express');
const router = express.Router();

const {getList, getDetail, newBlog, updateBlog, deleteBlog} = require('../controller/blog')
const { SuccessModel, ErrorModel} = require('../model/resmodel')
const loginAuth = require('../middleware/loginAuth');
const { login } = require('../controller/user');
/* GET home page. */
router.get('/list', function(req, res, next) {
           // console.log(`req.query`, req.query)
           const author = req.query.author || ''
           const keyword = req.query.keyword || ''
           
           // const blogListData = getList(author, keyword)
           // return new SuccessModel(blogListData)
           const result = getList(author, keyword)
           return result
                   .then(listData => {
                       res.json(new SuccessModel(listData))
                   })
                   .catch(err => {
                       res.json(new ErrorModel(err))
                   })
});

/* GET home page. */
router.get('/detail', function(req, res, next) {
    const result = getDetail(req.query.id)
    return result.then(data => {
        res.json(new SuccessModel(data))
    })
});

router.post('/new', loginAuth, (req, res, next) => {
    // 假数据. 开发登录功能以后传递这个数据.
    req.body.author = req.session.username

    const result = newBlog(req.body)
    return result
            .then(data => {
                res.json(new SuccessModel(data))
            })
})

router.post('/update', loginAuth, (req, res, next) => {
    const result = updateBlog(req.query.id, req.body)
    return result.then(val => {
            if (val) {
                res.json(new SuccessModel())
            } else {
                res.json(new ErrorModel('更新失败'))
            }   
        })
})

router.post('/delete', loginAuth, (req, res, next) => {
    req.body.author = 'joshua4'
    const author = req.session.username;

    const result = deleteBlog(req.query.id, author)
    return result.then(val => {
        if (val) {
            res.json(new SuccessModel())
        } else {
            res.json(new ErrorModel('删除失败'))
        }
    })
})

module.exports = router;

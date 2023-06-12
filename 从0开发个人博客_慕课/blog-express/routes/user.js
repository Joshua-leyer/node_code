var express = require('express');
const router = express.Router();
const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resmodel')


/* GET home page. */
router.post('/login', function(req, res, next) {

    const { username, password } = req.body

    const result = login(username, password)
    return result.then( val => {
        if (val.username) {
            // 设置 session
            req.session.username = val.username
            req.session.realname = val.realname

            res.json(new SuccessModel())
            
        } else {
            res.json(new ErrorModel('登录错误'))
        }
    })
});

router.get('/login-test', (req, res, next) => {
    const session = req.session
    if (session.username) {
        res.json({
            errno: 0,
            msg: '测试登录成功'
        })
        return 
    }
    res.json({
        errno: -1,
        msg: '测试登录失败'
    })
});

router.get('/session-test', (req, res, next) => {
    const session = req.session
    if (session.viewNum == null) {
        session.viewNum = 0
    }
    session.viewNum ++;
    res.json({
        viewNum: session.viewNum
    })
})

module.exports = router;

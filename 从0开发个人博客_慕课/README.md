# Learn Log

joshua 看的教程是旧版

2022年时候出了个新版， 已经看到6章节了。好气。


- 功能需求:
    + 首页、作者主页、博客详情页
    + 登录页
    + 管理中心、新建页、编辑页

> 注意： 初步学习目标.不必追求都能看懂代码 能理解“存储”和“接口”的概念即可


- test-http/ 原生实现基本的get  post请求处理

- ./muke_320_blog.sql 是简单的mySql 的增删改查的语句

- blog-1/ 第四章节完成的内容
- redis-test/ redis 的学习
- file-test/ 日志测试
- utils/ log.js 里面封装了记录日志，也就是写文件操作，把req对象下的一些请求头拿过来存到文件当中
- 

## 1 & 2章

+ test-http/ 原生实现基本的get ， post请求处理



> + corss-env
    使用 cross-env 设置环境变量，NODE_ENV=dev 似乎意思是说全局上定义了这个变量 NODE_ENV
    "dev": "cross-env NODE_ENV=dev nodemon ./bin/www.js"
    "prd": "cross-env NODE_ENV=production nodemon ./bin/www.js"


## 3章

注意学习他这个文件项目结构，app.js 负责什么逻辑代码，bin/www.js负责什么逻辑，等等

:grey_question: 为什么路由处理和 controller 要分开 :grey_question:
:speech_balloon: 路由要负责的就是，来什么路由，返回对应的数据， 至于怎么对根据路由对数据操作的。写到controller里面，代码看起来好

> :shit:
> 原生 req 获取 content-type 时候要写成小写.
>```js
>console.log(`headers 是` req.headers['content-type'] )
>```

## 4章节

- 原生node 处理http请求.
- 搭建开发环境
- 仅仅初步搭建开发接口，不连接数据库和登录问题

- ##### queryString

    node.js 自带的一个模块. 可以解析 querystring 参数

    >Tip: 其实在学习过程中，J觉得函数的名字是什么并不重要，重要的思想。但是这些接口怎么用，传递什么格式参数，不清楚代码也没办法写。ε=(´ο｀*)))唉，总是两难。一定要学会看官方文档，这相当重要。几乎所有教程都不会教你怎么看官方文档，这最终写代码的时候，只会照葫芦画瓢。


- bin/ 文件夹 里面存放着项目基本配置的东西


- 路由接口设置: src/router/blog.js  里面有5个接口
        src/router/user.js 里面有1个登录接口

- /src/model/resModel.js 相应消息的类定义. 里面的 判断兼容几个参数的写法可以学习.

- 重新学习一下 类 


:grey_exclamation: POST 请求，接受数据是异步接收的。


:walking: 有时候会想，这个教程最开始用原生开发一个 web 应用，到底有没有必要学。跟着敲代码。能对我有什么帮助


:star2: req res 两个对象，有个挂载的思路，需要知道。几乎所有的中间件函数，过滤数据，或者传递数据都是通过这种方式，给下一个执行函数的



## 5章 存储


- 学习他的 conf/db.js 配置mysql连接的写法。
学习promise的用法，多数时候网络上教程，按部就班的讲，真正的写的时候，思想上很重要。
否则，是不知道怎么使用promise的。什么时候用。

- 重新理解 Promise

- 学习这里的 exec 封装  /src/db/mysql.js

- 理解学习 cross-dev
[process.env.NODE_ENV](https://blog.csdn.net/sinat_17775997/article/details/123305622)


- mysql-test/ 测试练习 使用mysql库

    - ./muke_320_blog.sql 是简单的mySql 的增删改查的语句

    - 其中 select 语句返回的都是数组，即使只有一个数据

    - node.js 对 mysql 8.0 的新的密码验证方式不支持，需要修改一下新的方式为旧的
    [Client does not support authentication](https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server)


+ promise 传递的函数是一个异步操作，执行器。

```js
function exec(sql) {
    // const sql = 'select * from users';
    const promise = new Promise((resolve reject) => {
        con.query(sql (err result) => {
            if (err) {
                reject(err)
            }
            resolve(result)
        })    
    })
    return promise
}
module.exports = {
    exec
}
```

>吐槽! 不知道是他教程的原因，总之觉得他的这种写法，链式的关联太过于粘合了。
>例如， 在getList 函数中来来回回返回3个Promise 。 理论上只有对数据库操作是异步操作，怎么就用到这么多Promise。
>整理。 首先app.js  serverHandle函数 是最初处理请求函数，所有的都在这里面；
>getPostData() 判断并接收POST请求的数据的， 由于POST请求传送数据是异步的，所以这里有一个Promise
>:weary:虽然教程不太好，但是不得不承认的是， 这一套下来，差不多对 Promise 有更深层次的理解了。


  - :yellow_heart: 学习一个知识点就是 node http库，处理请求的时候 req res对象 是在整个击中路由到处理完成，的过程中。这两俩对象是都走一遍的。所以他们俩有可以携带一些数据的思路


## 6章 登录

介于现在注册方式很多了，不只是单纯的用户名登录和注册，微信，第三方关联等等。 所以课程重点讲登录。
主要学习 如何利用cookie这个东西来实现登录验证的功能

本教程用的还是 session


:star: response 响应 http请求头中 Set-Cookie 字段内容的含义

:star: cookie 有一个便捷的地方就是 如果响应头有 Set-Cookie 字段，那么浏览器会 **自动** 把这个值复制到 cookie 中。


--------------------------
:star::star::star: 艹 设置 session 的坑 TM 的，是过不去了
为什么设置保存session 却要使用req 对象？
```js
    设置 session
    req.session.username = data.username
    req.session.realname = data.realname
```

joshua 猜测(TM 的又要猜) 网络上一帮傻逼教程。

:star:__涉及到对象，浅拷贝引用的概念__:star:

after a while ... 


:books: 果然是对象的引用。 这个知识点是最基础的  __对象数据浅拷贝__ 知识点

    req.session = SESSION_DATA

这句代码就是把 SESSION_DATA 浅拷贝给req.session 下，这样 这个session 就可以跟着 req跑完整个 路由处理了。也就能在
处理的时候使用，修改session了。太TM 草了。
由于代码的距离比较远，还真不好想到。

这帮傻逼教程不知道是心知肚明，自己也搞不懂，照葫芦画瓢还是咋回事。就是不讲。这么关键的一个步骤

---------------------------

 :trophy: :custard:


session 使用 redis 。 来做处理。 session 访问非常的频繁，对性能要求很高。 在整个请求的入口地方就需要做出判断。


#### redis 的使用

在目录下 启动 cmd 

redis-server redis.windows.conf

[redis 的使用](https://blog.csdn.net/jiankang66/article/details/89876947)


cmd 连接 redis > redis-cli

！注意 本教程使用的redis 版本是 3.x ， 最新的4.x 接口不一样了，会无法正常运行。

教程使用的是 2.x版本，joshua 使用3.x 还能够正常使用

教程缺失了 一个配置 redis的使用。 烦死了:anger: :rage::rage::rage: 真的心累呀

毫不例外的，这个项目又要烂尾了。算了重点还是知识点的学习吧。气死。

学着学着，发现教程少了一节。

在网上找到了 其他人的代码，
[aaamrh/learn-nodejs-blog](https://github.com/aaamrh/learn-nodejs-blog/tree/master/blog1/src)


## 7章 日志

日志存储到文件中， node操作文件就需要学习 __流__ 的概念。  见个人的 oneNote 笔记

file-test/ 日志测试

utils/log.js 封装了如何写日志的函数 

## 8章 安全

- sql注入，窃取数据库内容

    通过sql语句拼接，进行的攻击手段

    预防措施，使用mysql escape函数处理输入内容
    ```js
    select username, realname from users where username='${username}' and password='${password}'
    ```
    例如上面的sql语句，如果username 用户输入文本的时候 输入这样的内容: username --
    那么在sql 语句会变成这样
    ```js
    select username, realname from users where username='username --' and password='${password}'
    ```
    在sql语法中 -- 是注释的意思，这样的操作会导致，用户密码判断失效。就能直接登录成功。


    :sunglasses: 通过 escape() 函数执行过滤一下语句

        username = escape(username)
        password = escape(password)
    
- SXX 攻击，窃取前端的 cookie

    页面内容掺杂JS代码，以获取网页信息。

    :sunglasses: 解决方法，就是转换字符串，从而让那一段JS代码无法运行。
    如下代码 
    ```js
        <script>alert(document.cookie)</script>
    ```
    如果用户输入的是这个代码，那么当，再次请求回来的时候。 浏览器会检测到script ，自动执行其中的内容。

    :sunglasses:
        npm i xss 库可以解决，本质就是过滤一下前端发送过来的信息。

- 加密
    数据库一般也不要直接存储密码明文，要利用某个加密算法对明文进行加密解密。 这里单独选择某个加密库即可。

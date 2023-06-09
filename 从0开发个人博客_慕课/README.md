# Learn Log

- 功能需求:
    + 首页、作者主页、博客详情页
    + 登录页
    + 管理中心、新建页、编辑页

> 注意： 初步学习目标.不必追求都能看懂代码 能理解“存储”和“接口”的概念即可


- test-http/ 原生实现基本的get  post请求处理

- ./muke_320_blog.sql 是简单的mySql 的增删改查的语句

- blog-1/ 第四章节完成的内容


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









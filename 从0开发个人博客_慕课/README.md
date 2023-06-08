# Learn Log

功能需求:
首页、作者主页、博客详情页
登录页
管理中心、新建页、编辑页

注意： 初步学习目标.不必追求都能看懂代码, 能理解“存储”和“接口”的概念即可

##### 吐槽 , 教程中缺少了创建项目的步骤

## 1，2章

test-http/ 原生实现基本的get , post请求处理



### corss-env
使用 cross-env 设置环境变量。

```js
    "dev": "cross-env NODE_ENV=dev nodemon ./bin/www.js",
    "prd": "cross-env NODE_ENV=production nodemon ./bin/www.js"
```

## 3章

注意学习他这个文件项目结构，app.js 负责什么逻辑代码，bin/www.js负责什么逻辑，等等

为什么路由处理和 controller 要分开 。
A ： 路由要负责的就是，来什么路由，返回对应的数据， 至于怎么对根据路由对数据操作的。写到controller里面，代码看起来好

！！！坑 ：
原生req获取 content-type 时候要写成小写.
```js
        // 注意这里  content-type 要写小写，， 真TM 
        console.log(`headers 是`, req.headers['content-type'] )
```

## 4章节

- 原生node 处理http请求.
- 搭建开发环境
- 仅仅初步搭建开发接口，不连接数据库和登录问题

### queryString

node.js 自带的一个模块. 可以解析 querystring 参数

Tip: 其实在学习过程中，J觉得函数的名字是什么并不重要，重要的思想。但是这些接口怎么用，传递什么格式参数，不清楚代码也没办法写。ε=(´ο｀*)))唉，总是两难。一定要学会看官方文档，这相当重要。几乎所有教程都不会教你怎么看官方文档，这最终写代码的时候，只会照葫芦画瓢。


bin/ 文件夹, 里面存放着项目基本配置的东西


路由接口设置: src/router/blog.js  里面有5个接口
        src/router/user.js 里面有1个登录接口

/src/model/resModel.js 相应消息的类定义. 里面的 判断兼容几个参数的写法可以学习.

- 重新学习一下 类 


post请求，接受数据是异步接收的。


！！！ 有时候会想，这个教程最开始用原生开发一个 web 应用，到底有没有必要学。跟着敲代码。能对我有什么帮助


*** req, res 两个对象，有个挂载的思路，需要知道。几乎所有的中间件函数，过滤数据，或者传递数据都是通过这种方式，给下一个执行函数的

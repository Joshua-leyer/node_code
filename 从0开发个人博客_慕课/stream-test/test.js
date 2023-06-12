// 标准输入输出
// process.stdin.pipe(process.stdout)

// const http = require('http')
// const server = http.createServer((req, res)=>{
//   if(req.method === 'POST'){
//     req.pipe(res)
//   }
// })

// server.listen(8002)


// // stream 复制文件
// const fs = require('fs')
// const path = require('path')

// const fname1 = path.resolve(__dirname, 'data.txt')
// const fname2 = path.resolve(__dirname, 'data-bak.txt')

// const readStream = fs.createReadStream( fname1 )
// const writeStream = fs.createWriteStream( fname2 )

// readStream.pipe( writeStream )

// readStream.on('data', (chunk)=>{
//   console.log(chunk.toString())
// })

// readStream.on('end', () => {
//   console.log(' copy done ')
// })


// 流式读文件
const http = require('http')
const fs = require('fs')
const path = require('path')

const fname1 = path.resolve(__dirname, 'data.txt')

const server = http.createServer((req, res)=>{
  if(req.method === 'GET'){
    const readStream = fs.createReadStream( fname1 )  // 以流的方式读取一个文件，存到 readStream 对象中
    readStream.pipe(res) // readSream 就是一个第一个水桶， pipe 函数是把第一个水桶与 res 连接 。 一个对象可以理解就是一个水桶
                        // A.pipe(B) 
    }
})

server.listen(8002)

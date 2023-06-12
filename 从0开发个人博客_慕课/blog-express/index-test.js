const express = require('express');
const app = express();

app.use((req, res, next) => {
    console.log(`第一个中间`)
    next()
    console.log('next()以后仍然会执行我')
})

app.use((req, res, next) => {
    setTimeout(() => {
        console.log(`定时器`)
    },2000)
    next()
})
app.get('/', (req, res) => {
    res.send({
        nema: 1
    })
})

app.listen(3002, () => {
    console.log(`http://localhost:3002`)
})
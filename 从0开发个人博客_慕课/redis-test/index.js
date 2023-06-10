const redis = require('redis');


const redisClient = redis.createClient(6379, '127.0.0.1')
redisClient.on('error', err => {
    console.error(err)
})

redisClient.set('myname', 'lin', redis.print)
redisClient.get('myname',(err, val) => {
    if (err) {
        console.log(err)
        return 
    }
    console.log(val)
    redisClient.quit()
})
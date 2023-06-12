const redis = require('redis')
const { REDIS_CONFIG } = require('../conf/db')


const redisClient = redis.createClient(REDIS_CONFIG.port, REDIS_CONFIG.host)
redisClient.on('error', err => {
    console.error(err)
})


function set(key, val) {
    if (typeof val === 'object') {
        val = JSON.stringify(val)
    }
    redisClient.set(key, val, redis.print)
}

function get(key) {
    // get 是一个异步
    return new Promise((resolve, reject) => {
        redisClient.get(key, (err, val) => {
            if (err) {
                reject(err)
                return 
            }
            if (val == null) {
                resolve(null)
            }
            try {
                resolve(
                    // 变成对象
                    JSON.parse(val)
                )
            } catch (ex) {
                resolve(val)
            }
        })
    })

}

// redisClient.quit()

module.exports = {
    set,
    get
}
const redis = require('redis')
const { REDIS_CONF } = require('../conf/db')

// 创建客户端
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)

// 监控 error
redisClient.on('error', err => {
    console.log(err)
})

function set(key, val) {
    // 如果 val 是对象，转换成字符串
    if (typeof val === 'object') {
        val = JSON.stringify(val)
    }
    redisClient.set(key, val, redis.print)
}

function get(key) {
    const promise = new Promise((resolve, reject) => {
        redisClient.get(key, (err, val) => {
            // 处理报错
            if (err) {
                reject(err)
                return
            }
            // 处理空
            if (val === null) {
                resolve(null)
                return
            }
            // 处理 json 格式
            //try, catch 兼容 json 转换的格式， 如果是 json 格式，直接返回一个 json 对象，如果不是 json，直接返回
            try {
                resolve(JSON.parse(val))
            } catch (err) {
                resolve(val)
            }
        })
    })
    return promise
}

module.exports = {
    set,
    get
}
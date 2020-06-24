const { exec, escape } = require('../db/mysql')
const { genPassword } = require('../utils/cryp')

const login = (username, password) => {
    username = escape(username)
    // 加密密码
    password = genPassword(password)
    password = escape(password)
    // escape 用到能拼接成 sql 语句的所有的变量，并且加了 escape 之后不用加单引号
    const sql = `select username, realname from users where username=${username} and password=${password};`
    return exec(sql).then(rows => {
        return rows[0] || {}
    })
}

module.exports = {
    login
}
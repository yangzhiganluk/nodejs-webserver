const { exec, escape } = require('../db/mysql')
const xss = require('xss')

const getList = (author, keyword) => {
    author = escape(author)
    let sql = `select * from blogs where 1=1 `
    if (author) {
        sql += `and author=${author} `
    }
    if (keyword) {
        sql += `and title like '%${keyword}%' `
    }
    sql += `order by createtime desc;`
    return exec(sql)
}

const getDetail = (id) => {
    id = escape(id)
    let sql = `select * from blogs where id=${id};`
    return exec(sql).then(rows => {
        return rows[0]
    })
}

const newBlog = (blogData = {}) => {
    // blogData 是一个博客对象， 包含 title content author属性
    // console.log('newBlog blogData... ', blogData)
    let { title, content, author } = blogData
    title = xss(escape(title))
    content = xss(escape(content))
    author = xss(escape(author))
    const createtime = Date.now()
    const sql = `insert into blogs (title, content, createtime, author)
     values (${title}, ${content}, ${createtime}, ${author});`
    
    return exec(sql).then(insertData => {
        console.log('insertData is ', insertData)
        return {
            id: insertData.insertId
        }
    })
}

const updateBlog = (id, blogData = {}) => {
    // id 就是要更新博客的id
    // blogData 是一个博客对象, 包含 title content 属性
    // console.log('updateBlog id blogData...', id, blogData)
    let { title, content } = blogData
    title = xss(escape(title))
    content = xss(escape(content))
    const sql = `update blogs set title=${title}, content=${content} where id=${id};`
    return exec(sql).then(updateData => {
        console.log('updateData is ', updateData)
        if (updateData.affectedRows > 0) {
            return true
        }
        return false
    })
}

const delBlog = (id, author) => {
    id = escape(id)
    author = escape(author)
    // id 就是要删除博客的id
    const sql = `delete from blogs where id=${id} and author=${author}`;
    return exec(sql).then(delData => {
        console.log('delData is ', delData)
        if (delData.affectedRows > 0) {
            return true
        }
        return false
    })

}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}
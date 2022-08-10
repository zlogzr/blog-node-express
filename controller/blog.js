const xss = require('xss')
const { exec } = require('../db/mysql')

const getList = (author, keyword) => {
  let sql = `select * from blogs where 1=1 `
  if (author) {
    sql += `and author='${author}' `
  }
  if (keyword) {
    sql += `and title like '%${keyword}%' `
  }
  sql += `order by createtime desc;`

  // 返回 promise
  return exec(sql)
}

const getDetail = id => {
  const sql = `select * from blogs where id='${id}'`
  return exec(sql).then(rows => rows[0])
}

const newBlog = (blogData = {}) => {
  // blogData 是一个博客对象，包含 title content author 属性
  const title = xss(blogData.title)
  const content = xss(blogData.content)
  const author = blogData.author
  const createTime = Date.now()

  const sql = `
        insert into blogs (title, content, createtime, author)
        values ('${title}', '${content}', ${createTime}, '${author}');
    `

  return exec(sql).then(insertData => ({
    id: insertData.insertId
  }))
}

const updateBlog = (id, blogData = {}) => {
  // id 就是要更新博客的 id
  // blogData 是一个博客对象，包含 title content 属性
  const title = xss(blogData.title)
  const content = xss(blogData.content)

  const sql = `
        update blogs set title='${title}', content='${content}' where id=${id}
    `
  return exec(sql).then(updateData => updateData.affectedRows > 0)
}

const delBlog = (id, author, role) => {
  // id 就是要删除博客的 id
  let sql = ''
  if (role === 0) {
    sql = `delete from blogs where id='${id}' and author='${author}';`
  } else {
    sql = `delete from blogs where id='${id}';`
  }
  return exec(sql).then(delData => delData.affectedRows > 0)
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
}

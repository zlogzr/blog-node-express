const { exec, escape } = require('../db/mysql')
const { genPassword } = require('../utils/cryp')

const login = (username, password) => {
  // 防止sql注入，将特殊字符转换
  username = escape(username)
  // password = genPassword(password) // 生成加密密码
  password = escape(password)

  const sql = `
        select * from users where username=${username} and password=${password}
    `
  return exec(sql).then(rows => rows[0] || {})
}

const register = (username, password) => {
  // 防止sql注入，将特殊字符转换
  username = escape(username)
  // password = genPassword(password) // 生成加密密码
  password = escape(password)
  const createtime = Date.now()

  const sql = `
        insert into users (username, 'password', createtime) value (${username},${password},${createtime})
    `
  return exec(sql).then(insertData => ({
    id: insertData.insertId
  }))
}

module.exports = {
  login,
  register
}

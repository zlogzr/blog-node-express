const { exec, escape } = require('../db/mysql')
const { genPassword } = require('../utils/cryp')

const login = (username, password) => {
  // 防止sql注入，将特殊字符转换
  username = escape(username)
  password = genPassword(password) // 生成加密密码
  password = escape(password)

  const sql = `
        select username, realname, role from users where username=${username} and password=${password}
    `
  return exec(sql).then(rows => rows[0] || {})
}

const register = (username, password, realname) => {
  // 防止sql注入，将特殊字符转换
  username = escape(username)
  password = genPassword(password) // 生成加密密码
  password = escape(password)
  realname = escape(realname)

  const sql = `
        insert into users (username, 'password', realname, role) value (${username},${password},${realname},0)
    `
  return exec(sql).then(rows => rows[0] || {})
}

module.exports = {
  login,
  register
}

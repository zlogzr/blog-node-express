var express = require('express')
var router = express.Router()

const { login, register } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../utils/util')

router.post('/login', function (req, res, next) {
  const { username, password } = req.body
  const result = login(username, password)
  result.then(data => {
    if (!data.username) {
      res.json(new ErrorModel('登录失败'))
      return
    }
    // 设置 session
    req.session.id = data.id
    req.session.username = data.username
    req.session.realname = data.realname
    req.session.role = data.role
    res.json(new SuccessModel('登录成功'))
  })
})

router.post('/register', function (req, res, next) {
  const { username, password } = req.body
  const result = register(username, password)
  result.then(data =>
    res.json(data.id ? new SuccessModel(data, '注册成功') : new ErrorModel('注册失败'))
  )
})

module.exports = router

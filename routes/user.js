var express = require('express')
var router = express.Router()

const { login } = require('../controller/user')
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
    req.session.username = data.username
    req.session.realname = data.realname
    req.session.role = data.role
    res.json(new SuccessModel())
  })
})

router.post('/register', function (req, res, next) {
  const { username, password } = req.body
  const result = register(username, password)
  result.then(data => {
    if (!data.username) {
      res.json(new ErrorModel('注册失败'))
      return
    }
    // 设置 session
    req.session.username = data.username
    req.session.realname = data.realname
    req.session.role = data.role
    res.json(new SuccessModel())
  })
})

module.exports = router

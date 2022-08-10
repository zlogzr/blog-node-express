var express = require('express')
var router = express.Router()

const { getList, getDetail, newBlog, updateBlog, delBlog } = require('../controller/blog')

const { ErrorModel, SuccessModel } = require('../utils/util')

router.get('/list', function (req, res, next) {
  let author = req.query.author || ''
  const keyword = req.query.keyword || ''

  if (req.session.role === 0) {
    // 普通用户 强制查询自己的博客
    author = req.session.username
  }

  const result = getList(author, keyword)
  result.then(listData => {
    res.json(new SuccessModel(listData))
  })
})

router.get('/detail', (req, res, next) => {
  const result = getDetail(req.query.id)
  result.then(data => {
    res.json(new SuccessModel(data))
  })
})

router.post('/new', (req, res, next) => {
  req.body.author = req.session.username
  const result = newBlog(req.body)
  result.then(data => {
    res.json(new SuccessModel(data))
  })
})

router.post('/update', (req, res, next) => {
  const result = updateBlog(req.query.id, req.body)
  result.then(val => {
    if (val) {
      res.json(new SuccessModel())
    } else {
      res.json(new ErrorModel('更新博客失败'))
    }
  })
})

router.post('/del', (req, res, next) => {
  const author = req.session.username
  const role = req.session.role

  const result = delBlog(req.query.id, author, role)
  result.then(val => {
    res.json(val ? new SuccessModel() : new ErrorModel('删除博客失败'))
  })
})

module.exports = router

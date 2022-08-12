var express = require('express')
var router = express.Router()

const { getList, getDetail, newBlog, updateBlog, delBlog } = require('../controller/blog')

const { ErrorModel, SuccessModel } = require('../utils/util')
const loginCheck = require('../middleware/loginCheck')

router.get('/list', function (req, res, next) {
  let author = req.query.author || ''
  const keyword = req.query.keyword || ''

  const result = getList(author, keyword)
  result.then(listData => {
    res.json(listData ? new SuccessModel(listData, '查询博客成功') : new ErrorModel('查询博客失败'))
  })
})

router.get('/detail', (req, res, next) => {
  const result = getDetail(req.query.id)
  result.then(data => {
    res.json(data ? new SuccessModel(data, '查询博客详情成功') : new ErrorModel('查询博客详情失败'))
  })
})

router.post('/new', loginCheck, (req, res, next) => {
  req.body.author = req.session.username
  const result = newBlog(req.body)
  result.then(data => {
    res.json(data.id ? new SuccessModel(data, '新建博客成功') : new ErrorModel('新建博客失败'))
  })
})

router.post('/update', loginCheck, (req, res, next) => {
  if (req.session.role === 0 && req.query.id !== req.session.id) {
    res.json(new ErrorModel('权限不足'))
  }
  const result = updateBlog(req.query.id, req.body)
  result.then(val =>
    res.json(val ? new SuccessModel('更新博客成功') : new ErrorModel('更新博客失败'))
  )
})

router.post('/del', loginCheck, (req, res, next) => {
  if (req.session.role === 0 && req.query.id !== req.session.id) {
    res.json(new ErrorModel('权限不足'))
  }

  const result = delBlog(req.query.id)
  result.then(val => {
    res.json(val ? new SuccessModel('删除博客成功') : new ErrorModel('删除博客失败'))
  })
})

module.exports = router

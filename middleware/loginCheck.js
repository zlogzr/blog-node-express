const { ErrorModel } = require('../utils/util')

module.exports = (req, res, next) => {
  if (req.session.username) {
    next()
    return
  }
  res.json(new ErrorModel('尚未登录'))
}

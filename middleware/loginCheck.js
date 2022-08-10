const { getResData } = require("../utils/util");

module.exports = (req, res, next) => {
  if (req.session.username) {
    next();
    return;
  }
  res.json(getResData(null, "尚未登录"));
};

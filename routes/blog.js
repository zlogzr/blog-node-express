var express = require("express");
var router = express.Router();

const {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog,
} = require("../controller/blog");

const { getResData } = require("../utils/util");
// import { getResData } from "../utils/util";

router.get("/list", function (req, res, next) {
  let author = req.query.author || "";
  const keyword = req.query.keyword || "";

  // if (req.query.isadmin) {
  //   // 管理员界面
  //   const loginCheckResult = loginCheck(req);
  //   if (loginCheckResult) {
  //     // 未登录
  //     return loginCheckResult;
  //   }
  //   // 强制查询自己的博客
  //   author = req.session.username;
  // }

  const result = getList(author, keyword);
  result.then((listData) => {
    res.json(getResData(listData));
  });
});

module.exports = router;

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// 7.5 在路由中添加参数的实例
router.get('/:id', function(req, res, next){
	res.send('show Content for user id:'+req.params.id);
});

module.exports = router;

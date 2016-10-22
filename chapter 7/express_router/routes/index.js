var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post("/", function(req, res) {
	res.send(req.body);
});

// 7.7-7.8 实例
router.get('/renderUse',function(req,res) {
	// you would probably get this data from a data store
	var user = {
		first_name: "Lord",
		surname: "Lucan",
		address: "I'm not telling",
		facebook_friends: "1356200"
	};
	// Note how the user object is passed as local variable to the view
	res.render("chapterCanShu.jade",{title:"User",user:user});	
});
module.exports = router;

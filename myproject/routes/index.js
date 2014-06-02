var express = require('express');
var router = express.Router();

var mongoose = require('mongoose') ;     // 导入组件
var models = require('./models') ;    // 导入自定义组件
var User = models.User ;       // 使用User模型，对应的users表
mongoose.connect('mongodb://localhost/test') ;    // 连接数据库


/* GET home page.
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' ,content: 'The Express is a struture of  Node.js !!!!',name:'刘文磊'});
});
 */

router.index = function(req, res){
 res.render('index', { title: 'Express' });
};

router.login = function(req, res){
 res.render('login', { title: '用户登录' });
};
router.doLogin = function(req, res){
        var query_doc= {userid:req.body.userid , password:req.body.password} ;      // mongoDB
        // 如果要想接收请求，通过req对象
        User.count(query_doc,function(err,doc){
        			console.log("count======"+doc);
		        	if(doc==0){
		        	        res.redirect("/login") 
		        	}else{
		        		res.redirect("/welcome?uid=" + req.body.userid+"&password="+req.body.password) ;      // 地址重写	
		        	}
        	});
};
router.logout = function(req, res){
 res.render('login', { title: '用户注销' });
};
router.welcome = function(req, res){
        // 如果是地址栏参数使用req.query.参数名称接收
        var user = {userid : req.query.uid ,password :req.query.password  }
 res.render('welcome', { title: '程序首页' , user:user });
};

module.exports = router;
 
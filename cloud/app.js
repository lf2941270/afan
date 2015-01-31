// 在 Cloud code 里初始化 Express 框架
var express = require('express');
var app = express();
var avosExpressCookieSession = require('avos-express-cookie-session');

// App 全局配置
app.set('views','cloud/views');   // 设置模板目录
app.set('view engine', 'ejs');    // 设置 template 引擎
app.use(express.bodyParser());    // 读取请求 body 的中间件

// 启用 cookieParser
app.use(express.cookieParser('Your Cookie Secure'));
// 使用 avos-express-cookie-session 记录登录信息到 cookie
app.use(avosExpressCookieSession({ cookie: { maxAge: 3600000 }}));

// 使用 Express 路由 API 服务 /hello 的 HTTP GET 请求
app.get('/hello', function(req, res) {
  res.render('hello', { message: 'Congrats, you just set up your app!' });
});

app.get('/login', function(req, res) {
	// 渲染登录页面
	res.render('login.ejs');
});
// 点击登录页面的提交将出发下列函数
app.post('/login', function(req, res) {
	AV.User.logIn(req.body.username, req.body.password).then(function() {
		//登录成功，avosExpressCookieSession会自动将登录用户信息存储到cookie
		//跳转到profile页面。
		console.log('signin successfully: %j', req.AV.user);
		res.redirect('/profile');
	},function(error) {
		//登录失败，跳转到登录页面
		res.redirect('/login');
	});
});
//查看用户profile信息
app.get('/profile', function(req, res) {
	// 判断用户是否已经登录
	if (req.AV.user) {
		// 如果已经登录，发送当前登录用户信息。
		res.send(req.AV.user);
	} else {
		// 没有登录，跳转到登录页面。
		res.redirect('/login');
	}
});

//调用此url来登出帐号
app.get('/logout', function(req, res) {
	//avosExpressCookieSession将自动清除登录cookie信息
	AV.User.logOut();
	res.redirect('/profile');
});
// 最后，必须有这行代码来使 express 响应 HTTP 请求
app.listen();
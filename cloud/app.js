// 在 Cloud code 里初始化 Express 框架
var express = require('express');
var app = express();
var routes = require('cloud/routes.js');
var avosExpressCookieSession = require('avos-express-cookie-session');

// App 全局配置
app.set('views','cloud/views');   // 设置模板目录
app.set('view engine', 'ejs');    // 设置 template 引擎
app.use(express.bodyParser());    // 读取请求 body 的中间件

// 启用 cookieParser
app.use(express.cookieParser('Your Cookie Secure'));
// 使用 avos-express-cookie-session 记录登录信息到 cookie
app.use(avosExpressCookieSession({ cookie: { maxAge: 3600000 }}));

routes(app);
// 最后，必须有这行代码来使 express 响应 HTTP 请求
app.listen();
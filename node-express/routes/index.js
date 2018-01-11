var express = require('express');
var router = express.Router();
var fetch = require('node-fetch'); // npm install --save node-fetch 安装

var TOKEN_COOKIE = 'x-bce-iot-viz-token';
/* GET home page. */
router.get('/', async function (req, res, next) {
	if (req.cookies[TOKEN_COOKIE]) {
		next();
	} else {
		// 请求一个token
		const tokenResp = await fetch('http://localhost:8080/tokens/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ttl: 180})  // 3分钟有效期
		});

		const tokenJson = await tokenResp.json();
		// 把token写入返回的cookie里，然后渲染页面
		res.cookie(TOKEN_COOKIE, tokenJson.token, {httpOnly: false, maxAge: 180000});
		// res.send(tokenJson)
		next();
	}
}, function (req, res, next) {
	res.render('index', { title: 'Express' });
});


module.exports = router;

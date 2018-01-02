const express = require('express');
const app = express();

//设置跨域访问
app.all('*', function (req, res, next) {
	// 设置允许访问的请求头
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
	res.header("X-Powered-By", ' 3.2.1');
	res.header("Content-Type", "application/json;charset=utf-8");
	next();
});

app.get('/', function (req, res) {
	if (req.query.status === 'hello') {
		res.send('ok');
		return

	}
	if (req.query.name === 'lidong' && req.query.age === '26') {
		res.send('hello');
		return true
	}
	else {
		res.send('error');
		return true

	}

});

app.listen('8080', function () {
	console.log('running at 8080')
});
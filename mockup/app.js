/**
 * @file mockup
 * @description 数据模拟
 * @author jinech@yonyou
 */

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// create express instance
const app = express();
// require api
const api = require('./config/api');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
/*配置请求*/
app.get('/', (_req, res) => {
	res.send('express app');
});

const baseUrl = '/api/*';
app.put(baseUrl, api.put);
app.get(baseUrl, api.get);
app.post(baseUrl, api.post);
app.delete(baseUrl, api.delete);
app.options(baseUrl, (_req, res) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Credentials', true);
	res.header(
		'Access-Control-Allow-Headers',
		'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild',
	);
	res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
	res.sendStatus(200); /*让options请求快速返回*/
});

module.exports = app;

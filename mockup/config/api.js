/**
 * @file api
 */
const fs = require('fs');
const { isPromise } = require('util/types');

const getDataFromPath = (apiName, method, params, res) => {
	if (apiName) {
		fs.access(
			// 提取请求路径中的js文件
			`mockup\\${apiName.substring(1)}.js`,
			// 回调函数，检查请求的路径是否有效失败返回一个错误参数
			async function (err) {
				if (!err) {
					// 每次请求都清除模块缓存重新请求
					delete require.cache[require.resolve('..' + apiName)];
					try {
						const result = await require('..' + apiName).getData(method, params);
						addApiResult(res, result);
					} catch (e) {
						console.error(e.stack);
						res
							.status(500)
							.send(apiName + ' has an error,please check the code.');
					}
				} else {
					addApiResult(res);
				}
			},
		);
	} else {
		addApiResult(res);
	}
};
const addApiHead = (res) => {
	res.setHeader('Content-Type', 'application/json;charset=utf-8');
	// 跨域
	res.header('Access-Control-Allow-Origin', '*');
	res.header(
		'Access-Control-Allow-Headers',
		'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild',
	);
	res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
	res.header('Total-Count', 100);
	// 控制http缓存
	res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
	res.header('Pragma', 'no-cache');
	res.header('Expires', 0);
};
const addApiResult = (res, result) => {
	if (result) {
		setTimeout(() => {
			res.send(result);
		}, 800);
	} else {
		res.status(404).send();
	}
};
// get
exports.get = function (req, res) {
	addApiHead(res);
	getDataFromPath(req.path, 'GET', req.query, res);
};
// post
exports.post = function (req, res) {
	addApiHead(res);
	getDataFromPath(req.path, 'POST', req.body, res);
};
// delete
exports.delete = function (req, res) {
	addApiHead(res);
	getDataFromPath(req.path, 'DELETE', req.body, res);
};
// put
exports.put = function (req, res) {
	addApiHead(res);
	getDataFromPath(req.path, 'PUT', req.body, res);
};

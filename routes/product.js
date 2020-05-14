var express = require('express');
var router = express.Router();
var http = require("http");
var request = require('request');
var axios = require('axios');
var winston = require('winston');
var querystring = require('querystring')
var url = 'http://192.168.31.140:8090/'
/* GET home page. */
router.get('/list', function(req, res) {
	request({
		method: 'get',
		uri: url + 'backend/src/list',
		headers: {
			'Shiyun-Session-Token': '1t48xVIiCgjJczpchHNu'
		},
		qs: req.query,
	}, function(error, response, body) {
		console.log(body)
		res.json(JSON.parse(body));
	})
});
router.get('/srcDelete', function(req, res) {
	console.log(req.query)
	request({
		method: 'post',
		uri: url + 'backend/src/delete',
		headers: {
			'Shiyun-Session-Token': '1t48xVIiCgjJczpchHNu',
		},
		body:JSON.stringify({
			srcid:37
		})
	}, function(error, response, body) {
		console.log(body)
		res.json(JSON.parse(body));
	})
});




module.exports = router;

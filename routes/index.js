var express = require('express');
var router = express.Router();
var url = require('url');
const mysql = require('./mysql.js');

//拦截全部请求
router.all('/', function (req, res, next) {
    console.log("触发请求");
    next();
});
// 该路由使用的中间件
router.use(function timeLog(req, res, next) {
    // console.log('Time: ', Date.now());
    next();
});
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: '首11页' });//输出index页面
    // res.send('Hello World!');//向页面输出"hello world"
});

router.get('/app/obj/query', function (req, res, next) {
    req.getConnection(function (err, conn) {
        if (err) {
            return next(err);
        } else {
            var params = url.parse(req.url, true).query;
            let str = mysql.searchData(params);
            conn.query(str, [], function (err, result) {
                if (err) {
                    return next(err);
                } else {
                    res.send({ data: result });
                }
            });
        }
    });
});

router.post('/app/obj/update', function (req, res, next) {
    req.getConnection(function (err, conn) {
        if (err) {
            return next(err);
        } else {
            let fn = req.body.id ? mysql.updateData : mysql.insertData;
            let str = fn(req.body);
            conn.query(str, [], function (err, result) {
                if (err) {
                    return next(err);
                } else {
                    res.send(200, { success: true });
                }
            });
        }
    });
});
router.get('/app/obj/del', function (req, res, next) {
    req.getConnection(function (err, conn) {
        if (err) {
            return next(err);
        } else {
            conn.query(mysql.deleteData(req.query), [], function (err, result) {
                if (err) {
                    return next(err);
                } else {
                    res.send(200, { success: true });
                }
            });
        }
    });
});


module.exports = router;

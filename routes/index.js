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
    console.log('Time: ', Date.now());
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
            conn.query('select * from websites', [], function (err, result) {
                if (err) {
                    return next(err);
                } else {
                    // console.log(result, 'result');
                    res.send({ data: result });
                    // res.render('user', { info: result });
                }
            });

            // conn.query('select * from websites', [], function (err, result) {
            //     if (err) {
            //         return next(err);
            //     } else {
            //         // console.log(result, 'result');
            //         res.send({ data: result });
            //         // res.render('user', { info: result });
            //     }
            // });
        }
    });
});

// router.post('/add', function (req, res, next) {
//     var json = req.body;
//     var insert = 'INSERT INTO userInfo(name,age) VALUES ("' + json.username + '",' + json.age + ')';
//     req.getConnection(function (err, conn) {
//         if (err) {
//             return next(err);
//         } else {
//             conn.query(insert, [], function (err, result) {
//                 if (err) {
//                     return next(err);
//                 } else {
//                     res.send(200, { c: 200 });
//                 }
//             });
//         }
//     });
// });
// router.get('/delete', function (req, res, next) {
//     console.log(req);
//     var json = req.query.id;
//     var del = 'delete from userInfo where id=' + json;
//     req.getConnection(function (err, conn) {
//         if (err) {
//             return next(err);
//         } else {
//             conn.query(del, [], function (err, result) {
//                 if (err) {
//                     return next(err);
//                 } else {
//                     res.send(200, { c: 200 });
//                 }
//             });
//         }
//     });
// });
// router.post('/edi', function (req, res, next) {
//     console.log(req.body);
//     var json = req.body;
//     var del = 'update userInfo set name="' + json.username + '",age=' + json.age + ' where id=' + json.id;
//     req.getConnection(function (err, conn) {
//         if (err) {
//             return next(err);
//         } else {
//             conn.query(del, [], function (err, result) {
//                 if (err) {
//                     return next(err);
//                 } else {
//                     res.send(200, { c: 200 });
//                 }
//             });
//         }
//     });
// });

module.exports = router;

var express = require('express');
var users = require('../models/person');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
    var userId = -1;
    var username = '曾曾曾';
    users.getUserByName(username,function (userInfos) {
        console.log(userInfos);
        if(userInfos.length == 0) {
            users.create(username,function (add_result) {
                userId = add_result.insertId;
            })
        }else {
            userId = userInfos[0].F_ID;
        }

        var result = {
            userId: userId
        };
        res.send(result);
    });

});

/**
 * 查找是否有F_User = username
 * POST /person/
 * username=''
 */
router.post('/',function (req, res) {
    var userId = -1;
    var avatorUrl = '';
    var username = req.body.username;
    // console.log(username);
    // var username = '李四';
    users.getUserByName(username,function (userInfos) {
        console.log(userInfos);
        if(userInfos.length === 0) {
            users.create(username,function (add_result) {
                userId = add_result.insertId;
                var result = {
                    userId: userId,
                    avatorUrl:avatorUrl
                };
                res.send(result);
            })
        }else {
            userId = userInfos[0].F_ID;
            avatorUrl = userInfos[0].F_PhotoUrl;
            var result = {
                userId: userId,
                avatorUrl: avatorUrl
            };
            res.send(result);
        }


        console.log(result);

    });
});

/**
 * 用于更新某个用户的头像使用的
 */
router.post('/update',function (req, res) {
    var user_id = req.body.user_id;
    var avator_url = req.body.avator_url;
    var result = {
        code: 1
    };
    users.updateUserById(user_id,avator_url,function (update_res) {
        console.log(update_res);
        res.send(result);
    })

});



module.exports = router;
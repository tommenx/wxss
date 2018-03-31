var express = require('express');
var activity = require('../models/activity');
var apply = require('../models/apply');
var moment = require('moment');
var router = express.Router();

router.post('/', function (req, res, next) {
    var result = {
        code: 1
    };
    res.send(result);
});

/**
 * /activity/create
 * POST
 * 创建新的签到活动
 */
router.post('/create', function (req, res, next) {
    var F_CreaterId = req.body.createrId;
    var F_Caption = req.body.activity_name;
    var F_Desc = req.body.activity_desc;
    var F_Location = req.body.location;
    var F_Lat = req.body.lat;
    var F_Lng = req.body.lng;
    var F_SatrtDate = req.body.startDate;
    var F_EndDate = req.body.endDate;
    var F_IfFace = req.body.ifFace;
    var F_IfPhoto = req.body.ifPhoto;
    var F_IfLocation = req.body.ifLocation;
    var act = {
        F_CreaterId: F_CreaterId,
        F_Caption: F_Caption,
        F_Desc: F_Desc,
        F_Location: F_Location,
        F_Lat: F_Lat,
        F_Lng: F_Lng,
        F_StartDate: F_SatrtDate,
        F_EndDate: F_EndDate,
        F_IfFace: F_IfFace,
        F_IfPhoto: F_IfPhoto,
        F_IfLocation: F_IfLocation
    };
    // console.log(act);
    activity.create(act,function (act_res) {
        console.log(act_res);
        apply.apply(F_CreaterId,act_res.insertId,function (apply_res) {
            var insert_res = {
                code:1
            };
            res.send(insert_res);
        })
    });

});
/**
 * activity/getall
 * 返回所有的活动，结束了则是completed,还在进行中是processing
 */
router.post('/getall',function (req,res,next) {
    var user_id = req.body.userId;
    var now = moment();
    var completed = [];
    var processing = [];
    console.log(now);
    activity.getall(user_id,function (activitys) {
        for(var i = 0; i < activitys.length; i ++){
            activitys[i].F_StartDate = moment(activitys[i].F_StartDate).format('YYYY-MM-DD');
            activitys[i].F_EndDate = moment(activitys[i].F_EndDate).format('YYYY-MM-DD');
            //<0说明在endDate在现在之前---已经结束了
            if(moment(activitys[i].F_EndDate).diff(now)<0){
                completed.push(activitys[i]);
            }else {
                processing.push(activitys[i]);
            }
        }
        var res_getall = {
            'completed':completed,
            'processing':processing
        };
        res.send(res_getall);
    })
});

router.get('/getall',function (req,res,next) {
    var now = moment();
    var completed = [];
    var processing = [];
    console.log(now);
    activity.getall(function (activitys) {
        for(var i = 0; i < activitys.length; i ++){
            activitys[i].F_StartDate = moment(activitys[i].F_StartDate).format('YYYY-MM-DD');
            activitys[i].F_EndDate = moment(activitys[i].F_EndDate).format('YYYY-MM-DD');
            //<0说明在endDate在现在之前---已经结束了
            if(moment(activitys[i].F_EndDate).diff(now)<=0){
                completed.push(activitys[i]);
            }else {
                processing.push(activitys[i]);
            }
        }
        var res_getall = {
            'completed':completed,
            'processing':processing
        };
        res.send(res_getall);
    });
});
/**
 * 模糊查询所有的活动
 */
router.post('/like',function (req,res,next) {
    // var re = {
    //     code:1
    // };
    // res.send(re);
    var str = req.body.str;
    // var str = '火锅';
    var now = moment();
    var completed = [];
    var processing = [];
    activity.getallLike(str,function (activitys) {
        for(var i = 0; i < activitys.length; i ++){
            activitys[i].F_StartDate = moment(activitys[i].F_StartDate).format('YYYY-MM-DD');
            activitys[i].F_EndDate = moment(activitys[i].F_EndDate).format('YYYY-MM-DD');
            //<0说明在endDate在现在之前---已经结束了
            if(moment(activitys[i].F_EndDate).diff(now)<0){
                completed.push(activitys[i]);
            }else {
                processing.push(activitys[i]);
            }
        }
        var res_getall = {
            'completed':completed,
            'processing':processing
        };
        res.send(res_getall);
    })
});

/**
 * /activity/actInfo
 */
router.post('/actInfo',function (req,res,next) {
    var id = req.body.id;
    // var id = 28;
    activity.getInfo(id,function (activitys) {
        for(var i = 0;i < activitys.length;i ++){
            activitys[i].F_StartDate = moment(activitys[i].F_StartDate).format('YYYY-MM-DD');
            activitys[i].F_EndDate = moment(activitys[i].F_EndDate).format('YYYY-MM-DD');
        }
        apply.getApplyNumByActId(id,function (nums) {
            var result = {
                'infos':activitys,
                'nums':nums
            };
            res.send(result);
        })

    });
});

/**
 * /activity/haveApply
 */
router.post('/haveApply',function (req,res,next) {
    var activity_id = req.body.activityId;
    var user_id = req.body.userId;
    var have = false;
    // var activity_id = 28;
    // var user_id = 100;
    activity.haveApplyed(activity_id,user_id,function (result) {
        if(result.length != 0){
            have = true;
        }
        var response = {
            'code':have
        };
        res.send(response);
    })
});

/**
 * /activity/apply
 */
router.post('/apply',function (req,res,next) {
    var activity_id = req.body.activityId;
    var user_id = req.body.userId;
    apply.apply(user_id,activity_id,function (result) {
        var re = {
            'code':result
        };
        res.send(re);
    });
});

module.exports = router;
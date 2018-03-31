var express = require('express');
var router = express.Router();
var check = require('../models/check');
var moment = require('moment');

// router.get('/',function (req,res,next) {
//
// });



/**
 * /check
 * userid activityid photourl
 */
router.post('/',function (req,res,next) {
    var userId = req.body.userId;
    var activityId = req.body.activityId;
    var photoUrl = req.body.photoUrl;
    check.check(userId,activityId,photoUrl,function (insert_res) {
        console.log(insert_res);
        var result = {
            code:1
        };
        res.send(result);
    })

});

router.get('/details',function (req,res,next) {
    // var activity_id = req.body.id;
     var activity_id = 31;
    check.getDetailById(activity_id,function (details) {
        check.getDateById(activity_id,function (dates) {
            for(var i = 0; i < details.length; i ++) {
                details[i].F_CheckDate = moment(details[i].F_CheckDate).format('YYYY-MM-DD');
            }
            for(var i = 0; i < dates.length; i ++) {
                dates[i].F_CheckDate = moment(dates[i].F_CheckDate).format('YYYY-MM-DD');
            }
            var response = {
                'dateNum':dates.length,
                'dates':dates,
                'details':details
            }
            res.send(response);

            // res.send(details);
            // res.send(details)
        })

    })
});

/**
 * /check/details
 * activity_id
 */
router.post('/details',function (req,res,next) {
   var activity_id = req.body.id;
   //  var activity_id = 25;
   check.getDetailById(activity_id,function (details) {
       check.getDateById(activity_id,function (dates) {
           for(var i = 0; i < details.length; i ++) {
               details[i].F_CheckDate = moment(details[i].F_CheckDate).format('YYYY-MM-DD');
           }
           for(var i = 0; i < dates.length; i ++) {
               dates[i].F_CheckDate = moment(dates[i].F_CheckDate).format('YYYY-MM-DD');
           }
           var response = {
               'dateNum':dates.length,
               'dates':dates,
               'details':details
           }
           res.send(response);

           // res.send(details);
           // res.send(details)
       })

   })
});
/**
 * 查找某个活动某天的签到情况
 */
router.post('/details/date',function (req,res,next) {
    var activity_id = req.body.activityId;
    var check_date = req.body.checkDate;
    // var activity_id = 31;
    // var check_date = "2018-01-17";
    console.log(activity_id,check_date);
    check.getDetailByIdAndDate(activity_id,check_date,function (details) {
        for(var i = 0; i < details.length; i ++) {
            details[i].F_CheckDate = moment(details[i].F_CheckDate).format('YYYY-MM-DD');
        }
        var response = {
            'details':details
        }
        console.log(check_date,details);
        res.send(response);
    })

});

router.post('/dateCheck',function (req,res,next) {
    var check_date = req.body.checkDate;
    check.getCheckByDate(check_date,function (checks) {
        console.log(checks);
    })
});

router.get('/test',function (req,res,next) {
    var time = moment.unix(1509672700).format('YYYY-MM-DD HH:mm');
    res.send(time);

})
module.exports = router;
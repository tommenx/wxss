var db = require('../utils/dbConnection');
var moment = require('moment');



module.exports = {
    /**
     * TODO
     * 用户对某个签到活动进行报名
     * @param user
     */
    apply: function apply(user_id,activity_id,callback) {
        var sql = 'INSERT INTO t_apply (F_ID,F_ApplyerId,F_ActivityId,F_ApplyDate)VALUES(0,?,?,?)';
        var now = moment().format('YYYY-MM-DD');
        var params = [user_id,activity_id,now];
        db.connection.query(sql,params,function (err,res) {
            var re = true;
            if(err){
                console.log(err.message);
                return;
            }
            callback(re);
        })
    },
    getApplyNumByActId: function applyNum(activity_id,callback) {
        var sql = 'SELECT COUNT(*) AS NUMS FROM t_apply WHERE F_ActivityId = ? GROUP BY F_ActivityId';
        var params = [activity_id];
        db.connection.query(sql,params,function (err,res) {
            if(err){
                console.log(err);
                return;
            }
            // console.log(res[0].NUMS);
            if(res[0]==null){
                callback(0)
            }else{
                callback(res[0].NUMS);
            }
        });
    }


}
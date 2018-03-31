var db = require('../utils/dbConnection');
module.exports = {
    create: function create (a,callback) {
        var sql = 'INSERT INTO T_activity(F_ID,F_CreaterId,F_Caption,F_Desc,F_Location,F_Lat,F_Lng,F_StartDate' +
            ',F_EndDate,F_IfFace,F_IfPhoto,F_IfLocation)' +
            ' VALUES(0,?,?,?,?,?,?,?,?,?,?,?)';
        var params=[a.F_CreaterId,a.F_Caption,a.F_Desc,a.F_Location,a.F_Lat,a.F_Lng,a.F_StartDate,a.F_EndDate
            ,a.F_IfFace,a.F_IfPhoto,a.F_IfLocation];

        db.connection.query(sql,params,function (err,res) {
            if(err) {
                console.log('INSERT ACTIVITY:', err.message);
                return;
            }

            callback(res);
            console.log('INSERT ACTIVITY SUCCESS');
        });
    },

    getall: function (user_id,callback) {
        var sql = 'SELECT * FROM v_apply_activity WHERE F_ApplyerId=? ';
        var params = [user_id];
        db.connection.query(sql,params,function (err,res) {
            if(err){
                console.log(err);
                return;
            }
            callback(res);
        })
    },
    
    getallLike:function (str,callback) {
        var sql = 'SELECT * FROM T_activity WHERE F_Caption LIKE ? ';
        str = '%' + str + '%';
        var params = [str];
        db.connection.query(sql,params,function (err,res) {
            if(err){
                console.log(err);
                return;
            }
            callback(res);
        })
    },
    getInfo:function (activityId,callback) {
        var sql = 'SELECT * FROM v_activity_info WHERE F_ActivityId = ?';
        var params = [activityId];
        db.connection.query(sql,params,function (err,res) {
            if(err){
                console.log(err.message);
                return;
            }
            callback(res);

        })
    },
    haveApplyed:function (activity_id,user_id,callback) {
        var sql = 'SELECT * FROM t_apply WHERE F_ApplyerId = ? AND F_ActivityId = ?';
        var params = [user_id,activity_id];
        db.connection.query(sql,params,function (err,res) {
            if(err){
                console.log(err);
                return;
            }
            console.log(res);
            callback(res);
        })
    }
}
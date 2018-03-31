var db = require('../utils/dbConnection');
var moment = require('moment');
module.exports = {
    check: function (user_id,activity_id,photo_url,callback) {
        var sql = 'INSERT INTO T_check(F_ID,F_ActivityId,F_UserID,F_CheckDate,F_PhotoUrl)VALUES(0,?,?,?,?)';
        var now = new Date();
        var params = [activity_id, user_id, now, photo_url];
        console.log(params);
        db.connection.query(sql,params,function (err,result) {
            if(err){
                console.log(err.message);
                return;
            }
            console.log("INSERT CHECK SUCCESS",result.insertId);
            callback(result);

        });
    },

    getDetailById: function getDetailById(activity_id,callback) {
        var sql = 'SELECT * FROM v_check_detail WHERE F_ActivityId = ?';
        var params = [activity_id];
        db.connection.query(sql,params,function (err,res) {
            if(err){
                console.log(err);
                return;
            }
            // console.log(res);
            callback(res);
        })
    },

    getDateById: function getDateById(activity_id,callback) {
        var sql = 'SELECT DISTINCT F_CheckDate FROM v_check_detail WHERE F_ActivityId = ?';
        var params = [activity_id];
        db.connection.query(sql,params,function (err,res) {
            if(err){
                console.log(err);
                return;
            }
            console.log(res);
            callback(res);
        })
    },
    getCheckByDate: function getCheckByDate(check_date,callback) {
        var sql = 'SELECT * FROM v_check_detail WHERE F_CheckDate = ?'
        var params = [check_date];
        db.connection.query(sql,params,function (err,res) {
            if(err){
                console.log(err);
                return;
            }
            console.log(res);
            callback(res);
        })
    },
    getDetailByIdAndDate: function getDetailByIdAndDate(activity_id,date,callback) {
        var sql = 'SELECT * FROM v_check_detail WHERE F_ActivityId = ? AND F_CheckDate = ?';
        var params = [activity_id,date];
        db.connection.query(sql,params,function (err,res) {
            if(err){
                console.log(err);
                return;
            }
            // console.log(res);
            callback(res);
        })
    },

}
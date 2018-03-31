var db = require('../utils/dbConnection');



module.exports = {
    /**
     * 第一次使用的时候创建用户，通过检索是否在数据库中有记录
     * @param user
     */
    create: function create(user,callback) {
        var sql = 'INSERT INTO T_user(F_ID,F_Name)VALUES(0,?)';
        var params = [user];
        db.connection.query(sql,params,function (err,result) {
            if(err){
                console.log(err.message);
                return;
            }
            console.log("INSERT SUCCESS",result.insertId);
            callback(result);

        });
        // connetction.end();
    },
    /**
     * 通过用户名查找用户
     * @param name
     */
    getUserByName: function getUserByName(name,callback) {
        var sql = 'SELECT * FROM T_user WHERE F_Name=?';
        var params = [name];
        // var sql = 'SELECT * FROM T_user';
        db.connection.query(sql,params,function (err,result) {
           if(err){
               console.log(err.message);
               return;
           }
           // console.log(result);
           callback(result);
        });
    },

    /**
     * 传入用户名,并将用户的信息更新
     * @param name
     */
    updateUserById: function updateUserByName(user_id,avator_url,callback) {
        var sql = 'UPDATE T_user SET F_PhotoUrl = ? WHERE F_ID = ?';
        var params = [avator_url,user_id];
        db.connection.query(sql,params,function (err,result) {
            if(err){
                console.log(err.message);
                return;
            }
            callback(result);
        })
    }

}
var config = require('../configs/config');
var mysql = require('mysql');
var connection = mysql.createConnection({
    host            : config.dbhost,
    user            : config.dbuser,
    password        : config.dbpassword,
    database        : config.database,
    port            : config.dbport
});
connection.connect();

module.exports = {
    connection: connection
}


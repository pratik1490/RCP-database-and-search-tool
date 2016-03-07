var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    port     : 3306,
    user     : 'root',
    //password : '< MySQL password >',
    database : 'realclearpolitics'
});

connection.connect(function(error){
    if(!error){
        console.log("Database connected ...\n\n");
    }
    else{
        console.log("Error connecting database\n\n" +error);
    }
});

module.exports.getAllAgencies=function(callback){
    connection.query('SELECT * from Agency', function(err, rows, fields) {
        if (!err){
            callback(rows);
        }
        else
            console.log('Error while performing Query.');
        });  
        //connection.end();
};

module.exports.getAgencyByID=function(id,callback){
    connection.query('SELECT * from Agency WHERE Id = ' + id, function(err, rows, fields) {
        if (!err){
            callback(rows);
        }
        else
            console.log('Error while performing Query.');
        });  
        //connection.end();
};

module.exports.getAgencyByName=function(name,callback){
    connection.query('SELECT * from Agency WHERE Name = "' + name +'"', function(err, rows, fields) {
        if (!err){
            callback(rows);
        }
        else
            console.log('Error while performing Query.');
        });  
        //connection.end();
};
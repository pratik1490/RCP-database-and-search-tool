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

module.exports.getAllStories=function(callback){
    connection.query('SELECT * from Item', function(err, rows, fields) {
        if (!err){
            callback(rows);
        }
        else
            console.log('Error while performing Query.');
        });  
        //connection.end();
};

module.exports.getStoryByID=function(id,callback){
    connection.query('select a.*, b.Name as AuthorName, c.Name as AgencyName from Item a, Author b, Agency c where a.AuthorId = b.Id and a.AgencyId = c.Id and a.Id = ' + id, function(err, rows, fields) {
        if (!err){
            callback(rows);
        }
        else
            console.log('Error while performing Query.');
        });  
        //connection.end();
};

module.exports.getStoryByAuthor=function(authorId,callback){
    connection.query('select a.*, b.Name as AuthorName, c.Name as AgencyName from Item a, Author b, Agency c where a.AuthorId = b.Id and a.AgencyId = c.Id and a.AuthorId = ' + authorId, function(err, rows, fields) {
        if (!err){
            callback(rows);
        }
        else
            console.log('Error while performing Query.');
        });  
        //connection.end();
};

module.exports.getStoryByDate =function(date,callback){
    connection.query('select a.*, b.Name as AuthorName, c.Name as AgencyName from Item a, Author b, Agency c where a.AuthorId = b.Id and a.AgencyId = c.Id and PubDate = "' + date + '"  order by PubDate', function(err, rows, fields) {
        if (!err){
            callback(rows);
        }
        else
            console.log('Error while performing Query.');
        });  
        //connection.end();
};

module.exports.getStoryByDateRange =function(range,callback){
    var dates = range.split(',');
    
    connection.query('select a.*, b.Name as AuthorName, c.Name as AgencyName from Item a, Author b, Agency c where a.AuthorId = b.Id and a.AgencyId = c.Id and (PubDate BETWEEN "'+dates[1]+'" AND "'+dates[0]+'") order by PubDate', function(err, rows, fields) {
        if (!err){
            callback(rows);
        }
        else
            console.log('Error while performing Query.');
        });  
        //connection.end();
};

module.exports.getStoryBySearchTitle =function(search,date1,date2,callback){
    connection.query('select a.*, b.Name as AuthorName, c.Name as AgencyName from Item a, Author b, Agency c where a.AuthorId = b.Id and a.AgencyId = c.Id and match(a.Title) against("'+search+'") and (PubDate BETWEEN "'+date1+'" AND "'+date2+'") order by PubDate', function(err, rows, fields) {
        if (!err){
            callback(rows);
        }
        else
            console.log('Error while performing Query.');
        });  
        //connection.end();
};

module.exports.getStoryBySearchAuthor =function(search,date1,date2,callback){
    connection.query('select a.*, b.Name as AuthorName, c.Name as AgencyName from Item a, Author b, Agency c where a.AuthorId = b.Id and a.AgencyId = c.Id and match(b.Name) against("'+search+'") and (PubDate BETWEEN "'+date1+'" AND "'+date2+'") order by PubDate', function(err, rows, fields) {
        if (!err){
            callback(rows);
        }
        else
            console.log('Error while performing Query.');
        });  
        //connection.end();
};

module.exports.getStoryBySearchAgency =function(search,date1,date2,callback){
    connection.query('select a.*, b.Name as AuthorName, c.Name as AgencyName from Item a, Author b, Agency c where a.AuthorId = b.Id and a.AgencyId = c.Id and match(c.Name) against("'+search+'") and (PubDate BETWEEN "'+date1+'" AND "'+date2+'") order by PubDate', function(err, rows, fields) {
        if (!err){
            callback(rows);
        }
        else
            console.log('Error while performing Query.');
        });  
        //connection.end();
};

module.exports.updateViews =function(id,callback){
    var views; 
    connection.query('select Views from Item where Id = '+id, function(err, rows, fields) {
        if (!err){
           views = parseInt(rows[0].Views);
            views = views+1;
            connection.query('update Item set Views = ' + views + ' where Id = ' + id, function(err, rows, fields) {
                if (!err){
                    callback(rows);
                }
                else
                    console.log('Error while performing Query.'+ err);
                });  
        }
        else
            console.log('Error while performing Query.');
        });  
    
        //connection.end();
};
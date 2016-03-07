var express = require('express');
var crawler = express();
var author = require('./author');
var agency = require('./agency');
var story = require('./story');

var port = process.env.PORT || 3000;
var crawlerRouter = express.Router();

crawler.use('/api', crawlerRouter);

//AUTHOR
//../authors (all authors)
//../authors?name="abc" (with name =abc)
crawlerRouter.route('/authors')
    .get(function (req, res) {
        if (req.query.name) {
            author.getAuthorByName(req.query.name, function(r){
                res.send({
                    result: 'success',
                    err:    '',
                    json:   r,
                    length: r.length
                });
            });
        }
        else{
            author.getAllAuthors(function(r){
                res.send({
                    result: 'success',
                    err:    '',
                    json:   r,
                    length: r.length
                });
            });
        }
    });

//../authors/1
crawlerRouter.route('/authors/:id')
    .get(function(req,res){
        //req.params.id //this will be id passed to get single item
        author.getAuthorByID(req.params.id,function(r){
            res.send({
                result: 'success',
                err:    '',
                json:   r,
                length: r.length
            });
        });
    });

//AGENCY
crawlerRouter.route('/agency')
    .get(function (req, res) {
        if (req.query.name) {
            agency.getAgencyByName(req.query.name, function(r){
                res.send({
                    result: 'success',
                    err:    '',
                    json:   r,
                    length: r.length
                });
            });
        }
        else{
            agency.getAllAgencies(function(r){
                res.send({
                    result: 'success',
                    err:    '',
                    json:   r,
                    length: r.length
                });
            });
        }
    });

crawlerRouter.route('/agency/:id')
    .get(function(req,res){
        //req.params.id //this will be id passed to get single item
        agency.getAgencyByID(req.params.id,function(r){
            res.send({
                result: 'success',
                err:    '',
                json:   r,
                length: r.length
            });
        });
    });

//STORY
crawlerRouter.route('/stories')
    .get(function (req, res) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        if (req.query.date) {
            story.getStoryByDate(req.query.date, function(r){
                res.send({
                    result: 'success',
                    err:    '',
                    json:   r,
                    length: r.length
                });
            });
        }
        else if (req.query.range) {
            story.getStoryByDateRange(req.query.range, function(r){
                res.send({
                    result: 'success',
                    err:    '',
                    json:   r,
                    length: r.length
                });
            });
        }
        else if (req.query.title) {
            story.getStoryBySearchTitle(req.query.title,req.query.date1,req.query.date2, function(r){
                res.send({
                    result: 'success',
                    err:    '',
                    json:   r,
                    length: r.length
                });
            });
        }
        else if (req.query.author) {
            story.getStoryBySearchAuthor(req.query.author,req.query.date1,req.query.date2, function(r){
                res.send({
                    result: 'success',
                    err:    '',
                    json:   r,
                    length: r.length
                });
            });
        }
        else if (req.query.agency) {
            story.getStoryBySearchAgency(req.query.agency,req.query.date1,req.query.date2, function(r){
                res.send({
                    result: 'success',
                    err:    '',
                    json:   r,
                    length: r.length
                });
            });
        }
        else{
            story.getAllStories(function(r){
                res.send({
                    result: 'success',
                    err:    '',
                    json:   r,
                    length: r.length
                });
            });
        }
    });

crawlerRouter.route('/stories/:id')
    .get(function(req,res){
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        story.getStoryByID(req.params.id,function(r){
            res.send({
                result: 'success',
                err:    '',
                json:   r,
                length: r.length
            });
        });
    });

crawlerRouter.route('/updateViews/:id')
    .post(function(req,res){
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        story.updateViews(req.params.id,function(r){
            res.send({
                result: 'success',
                err:    '',
                json:   r,
                length: r.length
            });
        });
    });



crawler.get('/',function(req,res){
    res.send('Hello world');
});

crawler.listen(port,function(){
    console.log('Running service on ' + port);
});
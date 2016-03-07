var gulp = require('gulp');
var nodemon = require('gulp-nodemon');

gulp.task('default',function(){
    nodemon({
        script:'crawler.js', //which file need to be run
        ext:'js', //extension of file that need to be run
        env:{
            PORT:8000  //predefined port, that will be used in crawler.js
        },
        igonre:['./node_modules/**'] //this will ignore changes under node_modules (install new npm packages or update or delete)
    })
    .on('restart',function(){
        console.log('service restarted');
    });
});
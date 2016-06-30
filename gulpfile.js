
var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var sass = require('gulp-sass');

gulp.task('sass', function () {
  gulp.src('./public/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./public/sass/**/*.scss', ['sass']);
});

// start our server and listen for changes
gulp.task('server', function() {
    // configure nodemon
    nodemon({
        // the script to run the app
        script: './bin/www',
        // this listens to changes in any of these files/routes and restarts the application
        ext: 'js jade'
        
    });
});

gulp.task('default', ['server', 'sass:watch']);

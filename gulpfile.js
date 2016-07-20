
var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var sass = require('gulp-sass');
var pug = require('gulp-pug');

gulp.task('sass', function () {
  gulp.src('./public/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./public/sass/**/*.scss', ['sass']);
});

gulp.task('views', function buildHTML() {
  return gulp.src('./public/app_client/pug/*.pug')
  .pipe(pug({
    pretty: true
  }))
  .pipe(gulp.dest('./public/app_client/views'));
});

gulp.task('pug:watch', function () {
  gulp.watch('./public/app_client/pug/**/*.pug', ['views']);
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

gulp.task('default', ['server', 'sass:watch', 'pug:watch']);

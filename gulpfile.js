
var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var sass = require('gulp-sass');
var pug = require('gulp-pug');
var livereload = require('gulp-livereload');
var notify = require('gulp-notify');

gulp.task('sass', function () {
  gulp.src('./public/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(livereload())
    .pipe(gulp.dest('./public/css'));
});


gulp.task('views', function buildHTML() {
  return gulp.src('./public/app_client/pug/**/*.pug')
  .pipe(pug({
    pretty: true
  }))
  .pipe(livereload())
  .pipe(gulp.dest('./public/app_client/views'));
});


gulp.task('livereload', function () {
  livereload({start: true});
});

// start our server and listen for changes
gulp.task('server', function() {
    livereload.listen();

    gulp.watch('./public/sass/**/*.scss', ['sass']);
    gulp.watch('./public/app_client/pug/**/*.pug', ['views']);
    // configure nodemon
    nodemon({
        // the script to run the app
        script: './bin/www',
        // this listens to changes in any of these files/routes and restarts the application
        ext: 'js pug',
        env: {
          'NODE_ENV': 'development'
        }

    }).on('restart', function () {
      gulp.src('./bin/www')
      .pipe(livereload())
      .pipe(notify('Reloading page, please wait...'));
    });
});

gulp.task('default', ['livereload', 'server']);

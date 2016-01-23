var gulp = require('gulp')
var concat = require('gulp-concat')
var filesize = require('gulp-filesize')
var minify = require('gulp-minify-css')
var connect = require('gulp-connect')
var rename = require('gulp-rename')

var projectDirectory = __dirname
console.log(projectDirectory)
gulp.task('connect', function () {
  connect.server({
    root: projectDirectory,
    livereload: true,
    port: 9000
  })
})

gulp.task('js', function () {
  gulp.src(projectDirectory + '/js/*.js')
    .pipe(concat())
    .pipe(minify())
    .pipe(gulp.dest('./dist/js'))
})

gulp.task('css', function () {
  gulp.src(projectDirectory + '/css/*.css')
    .pipe(concat())
    .pipe(minify())
    .pipe(rename('main.css'))
    .pipe(gulp.dest('./dist/styles'))
})

gulp.task('css-reload', function () {
  gulp.src(projectDirectory + '/css/*.css')
    .pipe(connect.reload())
})

gulp.task('html', function () {
  gulp.src(projectDirectory + '/*.html')
    .pipe(connect.reload())
})

gulp.task('js-reload', function () {
  gulp.src(projectDirectory + '/js/*.js')
    .pipe(connect.reload())
})

gulp.task('watch', function () {
  gulp.watch([projectDirectory + '/*.html'], ['html'])
  gulp.watch([projectDirectory + '/css/*.css'], ['css-reload'])
  // gulp.watch([projectDirectory + '/dist/styles/*.css'], ['css-reload'])
  gulp.watch([projectDirectory + '/js/*.js'], ['js-reload'])
})

gulp.task('default', ['connect', 'watch'])

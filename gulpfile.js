var gulp = require('gulp');
var pug = require('gulp-pug');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');
var connect = require('gulp-connect');

var paths = {
    // css
    sassWatch: './docs/sass/**/*.sass',
    css: './docs/css', //儲存到根目錄底下的css資料夾
    // html
    pugWatch: './pug/**/*.pug',
    html: 'docs', //儲存到根目錄底下的html資料夾
    // js
    jsWatch: './docs/js/**/*.js',
    // html
    htmlWatch: './docs/**/*.html'
};


gulp.task('sass', function() {
    return gulp.src(paths.sassWatch)
        .pipe(plumber({ errorHandler: notify.onError('Error: <%= error..message %>') }))
        .pipe(sass({ outputStyle: 'expanded' }))
        .pipe(gulp.dest(paths.css))
        .pipe(connect.reload());
});

gulp.task('js', function() {
    return gulp.src(paths.jsWatch)
        .pipe(connect.reload());
});
gulp.task('pug', function() {
    return gulp.src(paths.pugWatch)
        .pipe(plumber({ errorHandler: notify.onError('Error: <%= error..message %>') }))
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest(paths.html))
});
gulp.task('html', ['pug'], function() {
    return gulp.src(paths.htmlWatch)
        .pipe(connect.reload());
});

gulp.task('watch', function() {
    gulp.watch(paths.pugWatch, ['pug']);
    gulp.watch(paths.sassWatch, ['sass']);
    gulp.watch(paths.jsWatch, ['js']);
    gulp.watch(paths.htmlWatch, ['html']);
});

gulp.task('server', function() {
    connect.server({
        root: 'docs',
        port: 8880,
        livereload: true
    });
    console.log('server: http://localhost:' + 8880)
});
gulp.task('default', ['watch', 'pug', 'server']);
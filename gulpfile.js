var gulp = require('gulp');
var ngAnnotate = require('gulp-ng-annotate');
var uglify = require('gulp-uglify');
var stylus = require('gulp-stylus');
var nib = require('nib');
var rename = require('gulp-rename');

var appFolder = './app/';
var prodFolder = './prod/';


// Build Tasks //
gulp.task(js);
gulp.task(less);
gulp.task('build', gulp.parallel(js, less));
gulp.task(watch);

// Default //
gulp.task('default', watch);



function serve() {
    server.start({
        port: 80,
        directory: argv.prod ? './prod' : './app'
    });
}

function watch() {
    gulp.watch('./src/**', gulp.parallel(js, less));
}

function js() {
    return gulp.src('./src/nz-toggle.js')
        .pipe(ngAnnotate())
        .pipe(gulp.dest('./dist/'))
        .pipe(uglify())
        .pipe(rename('nz-toggle.min.js'))
        .pipe(gulp.dest('./dist/'));
}

function less() {
    gulp.src('./src/nz-toggle.styl')
        .pipe(stylus({
            use: nib()
        }))
        .pipe(gulp.dest('./dist/'));

    return gulp.src('./src/nz-toggle.styl')
        .pipe(stylus({
            use: nib(),
            compress: true,
        }))
        .pipe(rename('nz-toggle.min.css'))
        .pipe(gulp.dest('./dist/'));
}

var gulp = require('gulp');
var sass = require('gulp-sass');
var del = require('del');

gulp.task('fonts', function () {
    return gulp.src('./node_modules/materialize-css/fonts/roboto/**/*')
        .pipe(gulp.dest('./dist/fonts/roboto'));
});

gulp.task('clear', function () {
    return del(['./dist/**']).then(paths => {
        console.log('Deleted files and folders:\n', paths.join('\n'));
    })
});

gulp.task('sass', function () {
    return gulp.src('./src/sass/**/*.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('sass:watch', function () {
    gulp.watch('./src/sass/**/*.scss', ['sass']);
});

gulp.task('default', ['clear'], function () {
    gulp.start('fonts', 'sass', 'sass:watch');
});
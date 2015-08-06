var gulp        = require('gulp');
var ts          = require('gulp-typescript');
var plumber     = require('gulp-plumber');
var sourcemaps  = require('gulp-sourcemaps');
var merge       = require('merge2');

gulp.task('typescript', function() {
  var tsResult = gulp.src('src/**/*.ts')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(ts('tsconfig.json'));
    
  return merge([
    tsResult.js.pipe(gulp.dest('release'))
  ]);
});

gulp.task('default', ['typescript'], function() {
  gulp.watch('src/**/*.ts', ['typescript'])
});

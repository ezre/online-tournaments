var gulp        = require('gulp');
var ts          = require('gulp-typescript');
var plumber     = require('gulp-plumber');
var sourcemaps  = require('gulp-sourcemaps');
var merge       = require('merge2');

var tsProject = ts.createProject({
  declarationFiles: true,
  noExternalResolve: true
});

gulp.task('typescript', function() {
  var tsResult = gulp.src('src/**/*.ts')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(ts(tsProject));
    
  return merge([
    tsResult.js.pipe(gulp.dest('release'))
  ]);
});

gulp.task('default', ['typescript'], function() {
  gulp.watch('src/**/*.ts', ['typescript'])
});

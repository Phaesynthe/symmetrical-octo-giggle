var concat = require('gulp-concat-util');
var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('default', ['stage'])

  // Styles
  .task('stage', function () {
    return gulp.src(
      [
        'dist/**/*.scss'
      ])
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('dist/'));
  })
;

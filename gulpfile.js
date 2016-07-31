var concat = require('gulp-concat-util');
var embedTemplates = require('gulp-angular-embed-templates');
var gulp = require('gulp');
var rename = require('gulp-rename');
var sass = require('gulp-sass');

gulp.task('default', ['stage'])

  // Build
  .task('build', ['build:style', 'build:components'])

  // Build Styles
  .task('build:style', function () {
    return gulp.src(['dist/**/*.scss'])
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('dist/'));
  })

  // Build Components
  .task('build:components', function () {
    return gulp.src([
      'dist/**/*.js',
      '!dist/**/*.dist.js',
      '!dist/**/*.fixtures.js',
      '!dist/**/*.spec.js'
    ])
        .pipe(embedTemplates())
        .pipe(rename(function (path) {
          path.basename += ".dist";
        }))
        .pipe(gulp.dest('dist/'));
  })
;

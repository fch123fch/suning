const gulp = require('gulp');
const less = require('gulp-less');

const path = require('path');


gulp.task('less', function () {
  return gulp.src('./src/styles/**/*.less')
    .pipe(less({
      paths: [path.join(__dirname, 'less', 'includes')]
    }))
    .pipe(gulp.dest('./src/css'));
});

gulp.task('dev', () => {
  gulp.watch(
    ['./src/styles/**/*.less'],
    gulp.series('less')
  );
});
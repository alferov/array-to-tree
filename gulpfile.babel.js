import gulp from 'gulp';
import mocha from 'gulp-mocha';

const config = {
  src: './index.js',
  test: './test/**/*.js'
};

gulp.task('test', () => {
  return gulp.src(config.test, { read: false })
    .pipe(mocha({ reporter: 'nyan' }));
});

gulp.task('watch', () => {
  gulp.watch([config.src, config.test], ['test']);
});

gulp.task('default', ['watch']);

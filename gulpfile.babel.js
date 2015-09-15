import gulp from 'gulp';
import mocha from 'gulp-mocha';

const src = './index.js';

gulp.task('test', () => {
  return gulp.src('test.js', { read: false })
    .pipe(mocha({ reporter: 'nyan' }));
});

gulp.task('watch', () => {
  gulp.watch(src, ['test']);
});

gulp.task('default', ['watch']);

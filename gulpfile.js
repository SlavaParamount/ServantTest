var browserSync = require('browser-sync').create();

var paths = {
    styles: {
        src: 'prod/sass/style.scss',
        dest: 'prod/css'
    }
}

function reload() {
    browserSync.reload();
}

function style() {
    return (
        gulp
            .src(paths.styles.src)
            // Initialize sourcemaps before compilation starts
            .pipe(sourcemaps.init())
            .pipe(sass())
            .on('error', sass.logError)
            // Use postcss with autoprefixer and compress the compiled file using cssnano
            .pipe(postcss([autoprefixer(), cssnano()]))
            // Now add/write the sourcemaps
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(paths.styles.dest))
            .pipe(browserSync.stream())
    );
    reload();
}
 
function watch() {
    browserSync.init({
        // You can tell browserSync to use this directory and serve it as a mini-server
        // proxy: "127.0.0.1:8000"
        // If you are already serving your website locally using something like apache
        // You can use the proxy setting to proxy that instead
        // proxy: "yourlocal.dev"

        server: {
            baseDir: './prod/'
        }
    });
    gulp.watch('prod/sass/*.scss', style);
    gulp.watch('prod/*.html').on('change', reload);
}

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    cssnano = require('cssnano'),
    sourcemaps = require('gulp-sourcemaps');
    

exports.watch = watch;
exports.style = style;
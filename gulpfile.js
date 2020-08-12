"use strict";

var gulp = require("gulp");
var plumber = require("gulp-plumber");
var sourcemap = require("gulp-sourcemaps");
var sass = require("gulp-sass");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var csso = require("gulp-csso");
var rename = require("gulp-rename");

var imagemin = require("gulp-imagemin");
var webp = require("gulp-webp");
var svgstore = require("gulp-svgstore");

var del = require("del");

var server = require("browser-sync").create();

gulp.task("css", function () {
  return gulp.src("source/sass/style-*.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(rename(tap(file => {
      const path = file.path.toString();
      var a = path.split("\\");
      var b = a[a.length - 1].split(".")[0] + ".min.css";
      return b;
    })))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("source/css"))
    .pipe(server.stream());
});

gulp.task("startworking", function () {
  return gulp.src('*.*', {read: false})
    .pipe(gulp.dest('./source/css'))
    .pipe(gulp.dest('./source/sass'))
    .pipe(gulp.dest('./source/sass/blocks'))
    .pipe(gulp.dest('./source/img'))
    .pipe(gulp.dest('./source/fonts'))
    .pipe(gulp.dest('./source/js'));
});


gulp.task("server", function () {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/sass/**/*.scss", gulp.series("css"));
  gulp.watch("source/js/blocks/*.js", gulp.series("jscopy")).on("change", server.reload);
  gulp.watch("source/img/*", gulp.series("imgcopy")).on("change", server.reload);
  gulp.watch("source/*.html", gulp.series("htmlcopy")).on("change", server.reload);
});

gulp.task("images", function () {
  return gulp.src("source/img/**/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.optipng({
        optimizationLevel: 3,
        progressive: true
      }),
      imagemin.svgo({
        plugins: [
          {
            removeViewBox: false
          }
        ]
      })
    ]))
    .pipe(gulp.dest("build/img"));
});

gulp.task("jscopy", function () {
  return gulp.src("source/js/blocks/*.js")
    .pipe(gulp.dest("build/js/blocks"))
});

gulp.task("imgcopy", function () {
  return gulp.src("source/img/*")
    .pipe(gulp.dest("build/img"))
});

gulp.task("htmlcopy", function () {
  return gulp.src("source/*.html")
    .pipe(gulp.dest("build/"))
});

gulp.task("webp", function () {
  return gulp.src("source/img/**/*.{png,jpg}")
    .pipe(webp({quality: 80}))
    .pipe(gulp.dest("build/img"));
});

gulp.task("svgstore", function () {
  return gulp.src("source/img/**/icon-*.svg")
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));
});

gulp.task("copy", function () {
  return gulp.src([
    "source/fonts/**/*.{woff,woff2}",
    "source/img/**",
    "source/js/**",
    "source/*.ico",
    "source/*.html",
    "source/css/style.min.css"
  ], {
    base: "source",
    allowEmpty: true
  })
    .pipe(gulp.dest("build"));
});

gulp.task("clean", function () {
  return del("build");
});

gulp.task("build", gulp.series(
  "clean",
  "images",
  "webp",
  "copy",
  "css",
  "svgstore"
));
gulp.task("start", gulp.series("build", "server"));

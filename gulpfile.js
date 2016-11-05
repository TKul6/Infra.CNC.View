/**
 * Created by Tomer on 27/02/2016.
 */

    //Requirements

var gulp = require('gulp');
var server = require('gulp-connect'); // Creates a dev server
var open = require('gulp-open'); //Opens a URL in web browser
var browserify = require('browserify'); // Bundles JS
var source = require('vinyl-source-stream'); //
var concat = require('gulp-concat'); //Concates files
var eslint =require('gulp-eslint');//Lint JS file, including jsx

var babelify = require('babelify');


    //Config
var config = {
    baseUrl : "http://localhost",
    port: 9100,
    paths : {
        html : "./src/*.html",
        js: "./src/**/*.js",
        css : ["./src/style/main.css",
            "node_modules/react-treeview-component/build/react-tree.min.css"],

        images: "./src/images/*",
        favIcon: "./src/favicon.ico",
        dist : "./bin/",
        mainJs : "./src/app.js"
    }

};

//Start a web server

gulp.task('start-server',function(){
    server.server({
        root :config.paths.dist,
        base : config.baseUrl,
        port : config.port,
        livereload : true

    })
});

gulp.task('open',['start-server'],function(){
        gulp.src('dist/index.html')
        .pipe(open('',{url: config.baseUrl + ":" + config.port }))}
);

gulp.task('publish-html',function(){
    gulp.src(config.paths.html)
        .pipe(gulp.dest(config.paths.dist))
        .pipe(server.reload())
});


gulp.task('css',function(){
    gulp.src(config.paths.css).
        pipe(concat('bundle.css')).
        pipe(gulp.dest(config.paths.dist + "/css"))
});


gulp.task('images',function(){
    gulp.src(config.paths.images).
        pipe(gulp.dest(config.paths.dist + "/images"))
});

gulp.task('lint',function(){
    return gulp.src(config.paths.js).
        pipe(eslint({config: 'eslint.config.json'})).
        pipe(eslint.format());
});

gulp.task('watch',function(){
    gulp.watch(config.paths.html,['publish-html']);
    gulp.watch(config.paths.js,['bundle-js']);
    gulp.watch(config.paths.mainJs,['bundle-js']);
    gulp.watch(config.paths.css,['css']);
});

gulp.task('bundle-js',['lint'],function(){
    return  browserify({
        extensions: ['.js'],
        entries: config.paths.mainJs
    })
        .transform(babelify.configure({
            ignore: /(bower_components)|(node_modules)/,
            presets: ["es2015", "react"],
            plugins :["babel-plugin-transform-decorators-legacy"]
        }))
        .bundle()
        .on("error", function (err) { console.log("Error : " + err.message); })
        .pipe(source('bundle.js'))
        .pipe(gulp.dest(config.paths.dist  +"/Scripts"))
        .pipe(server.reload());


});

gulp.task('default',['open','publish-html','bundle-js','images','watch','css']);

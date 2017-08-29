/*
 * @Author: canaddy 
 * @Date: 2016-12-10 17:54:01 
 * @Last Modified by: canaddy
 * @Last Modified time: 2017-04-11 21:35:59
 */
var gulp = require('gulp');
var browserSync = require('browser-sync');


gulp.task('watch', ()=>{
    console.log('运行文件检测！');
    browserSync.init({
        server : "./"
    });

    // 检测当前项目的所有文件是否有变化
    // gulp.watch('*').on('change', browserSync.reload);

    gulp.watch('*', (event) => {
            // 输出改变的文件
            console.log('【update file】: ' + event.path);
            // 运行一个任务 
            // gulp.run('runProject');
        });
        
    gulp.watch('src/**/*.js').on('change', browserSync.reload);
    gulp.watch('res/**/*.*').on('change', browserSync.reload);
});

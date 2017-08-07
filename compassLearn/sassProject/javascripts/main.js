// 配置
requirejs.config({
    paths: {
        jquery: "../lib/node_modules/jquery/dist/jquery"
    }
});

// 引入
requirejs(["jquery", 'tools/backTop'], function($, backTop) {
    // 方法一：
    // new backTop.BackTop("#backTop", {
    //     mode:"move"
    // });

    // 方法二 使用jQuery插件的方法,mode分为move和go两种;
    $("#backTop").backTop({
        mode: 'move'
    });
});



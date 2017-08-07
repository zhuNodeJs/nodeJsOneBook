# nodeJsOneBook
这个是NodeJs入门经典图书的学习笔记
# ajax_liuyanben 是一个类留言本的实例
主文件是：index.html , miaov_guestbook_2014_01_08.sql是一个SQL程序,这个实例需要配合XAMPP服务器软件使用
# nodeBackbone
必须: mongoDB非关系数据库，mongojs,express, jade
Backbone.js带有一系列功能，包含数据验证和错误处理。同样也包含任务的删除。MongoDB作为数据的存储，而Backbone.js在客户端，主要学习了创建模型，集合和视图的方法并看到了使用Backbone.js创建一个基础的单页面应用程序的方法。
#### compassLearn是一个使用scss, compass等工具框架的编程的侧工具栏。实现一个侧边工具栏的效果
    A. 实现侧边工具栏的方法总共有三种：第一种是使用背景图片，第二种方式是使用iconFont方法，第三种方法是使用before，after的伪元素的方法通过定位的方式实现。
    B. 使用sass和compass的方法: $compass create 工程名
    $compass watch
    $compass compile --force
```
@charset "utf-8";

@import "mixin";
$default-background-size: cover;
@mixin hover_toolbar ($pos, $posHover, $hasChild) {
    background-position-y: $pos;
    &:hover {
            background-position-y: $posHover;
            @if $hasChild {
                .toolbar-layer {
                @include opacity(1);
                @include scale_toolbar(1);
             }    
            }            
        }
}
```
scss中的函数的写法：
```
@mixin transition_toolbar($transition, $transition_or) {
    // decide the number of the parames
    @if $transition_or == '' {
         -webkit-transition: $transition;
        -moz-transition: $transition;
        -o-transition: $transition;
        -ms-transition: $transition;
        transition: $transition;
    } @else {
        -webkit-transition: $transition, $transition_or;
        -moz-transition: $transition, $transition_or;
        -o-transition: $transition, $transition_or;
        -ms-transition: $transition, $transition_or;
        transition: $transition, $transition_or;
    }

}
```
此处的为iconFont的html的布局：
```
<a href="javascript:void(0);" class="toolbar-item">
            <div class="wrapper">
                <span class="toolbar-btn">
                    <i class="toolbar-icon iconfont icon-yijianfankui"></i>
                    <span class="toolbar-text">意见<br>反馈</span>
                </span>
            </div>
        </a>
```
#### scss和compass 常用的使用方法：
  1. @import 引入一个模块;
  2. @include 调用@mixin函数的方法;
  3. @extend 继承一个类的样式;
  4. @include background(image-url("toolbar.png"));
  5. 引入normalize替代reset, config.rb的配置如下：require 'compass-normalize', 引用为@import "normalize"; 要先安装：$gem install compass-normalize;


#### 熟练的使用requirejs的来进行的工程的加载
  1, 使用requirejs的中的必须要记住三种配置文件即可：分别为data-main,requirejs.config(), define();他们分别是requirejs的入口文件，配置别名， define是用来定义需要引入的模块, 需要注意的是：引入的文件，都是相对的data-mian的位置来定位;
  a. 入口文件
  ```
<script type="text/javascript" src="lib/node_modules/requirejs/require.js" data-main="javascripts/main.js"></script>
  ```
  b. requirejs的配置的文件
  ```
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
  ```
  c. requirejs的define定义模块, 下面是运动的模块：
  ```
  define(['jquery'], function($) {
      function ScrollTo(pos) {
          this.pos = $.extend({}, ScrollTo.DEFAULT, pos);
          this.$el = $("body, html");
      }

      ScrollTo.prototype.move = function () {
          // 通过设置局部变量来提升性能
          var post = this.pos,
              dest = post.des;
          if ($(window).scrollTop() > dest) {
                  if (!this.$el.is(":animated")) {
                      this.$el.animate({
                          scrollTop: dest      
                      }, post.speed);
              }
          }       
      }

      ScrollTo.prototype.go = function () {
          var post = this.pos,
              dest = post.des;
          if ($(window).scrollTop() != dest) {
              this.$el.scrollTop(dest);
          }   
      }
      ScrollTo.DEFAULT = {
          des: 0,
          speed: 1000
      }

      return {
          ScrollTo:ScrollTo
      }
  });
  ```
d.对jQuery的插件的书写：
```
// jQuery插件
    $.fn.extend({
        backTop: function (opts) {
            return this.each(function() {
                new BackTop(this, opts);
            })
        }
    })
```

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
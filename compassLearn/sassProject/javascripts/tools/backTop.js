define(["jquery","tools/moveTo"], function($, moveTo) {
    function BackTop(el, opts) {
        this.opts = $.extend({}, BackTop.DEFALUTS, opts);
        this.el = $(el);
        this.scroll = new moveTo.ScrollTo({
            des: this.opts.pos,
            speed: this.opts.speed
        });
        this._checkPosition();

        if (this.opts.mode === "move") {
            this.el.on("click", $.proxy(this._move, this));
        }else {
            this.el.on("click", $.proxy(this._go, this));
        }        
        $(window).on("scroll", $.proxy(this._checkPosition, this));

    }
    BackTop.DEFALUTS = {
        mode: "move",
        pos: $(window).height(),
        speed: 800
    }

    BackTop.prototype._move = function() {
        this.scroll.move();
    }

    BackTop.prototype._go = function() {
        this.scroll.go();
    }

    BackTop.prototype._checkPosition = function() {        
        if ($(window).scrollTop() > this.opts.pos) {
            $("#backTop").fadeIn();
        }else {
            $("#backTop").fadeOut();
        }
    }

    // jQuery插件
    $.fn.extend({
        backTop: function (opts) {
            return this.each(function() {
                new BackTop(this, opts);
            })
        }
    })
    
    return {
        BackTop: BackTop
    }
});
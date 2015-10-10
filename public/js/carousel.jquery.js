(function($){
    var defaults = {
        interval: 2000,
        duration: 1000,
        autoStart: true
    };
    
    $.fn.carousel = function(options){
        //기본값 + 옵션설정
        options = $.extend({}, defaults, options);
        var $carousel = $('.carousel'), index = 0, interval = options.interval;
        var $prev = $carousel.find('.prev'),
            $next = $carousel.find('.next');
        var $first = $carousel.find('ul > li:first-child');
        var $last = $carousel.find('ul > li:last-child');

        $carousel.find('ul').append($carousel.find('li'));
        $carousel.find('ul').append($first.clone()); //첫번째 ul 복사
//        $carousel.find('ul').append($last.clone()); //마지막 ul 복사

        $prev.on('click', function(event) {
            event.preventDefault();
            if( $first.is(':animated') ) return;
            var len = $carousel.find('li').length;
            if (index === 0) {
                index = len - 1;
                $first.css('margin-lefe', (-100*index)+'%');
            }

            index = (index - 1) % len;
            if (index < 0) index = len - 1;
            $first.animate({'margin-left': (-100*index)+'%'}, options.duration);     
        });

        $next.on('click', function(event) {
            event.preventDefault();
            if( $first.is(':animated') ) return;
            var len = $carousel.find('li').length;
            index = (index + 1) % len;
            $first.animate(
                {'margin-left': (-100*index)+'%'},
                function() {
                    if ( index == len -1) {
                        index = 0;
                        $first.css('margin', 0);
                    }
                }, options.duration
            );     
        });

        var intervalID;
        $carousel
            .on('mouseenter', function() {
                clearInterval(intervalID);
        })
            .on('mouseleave', function() {
                intervalID = setInterval(function() {
                $next.trigger('click');
        //        $next.click(); 축약형
            }, interval + options.duration);
        });

    //    $next.click(function(event) { }); 축약형
        if (options.autoStart) {
            $carousel.trigger('mouseleave');
        }
        return this;
    };
})(window.jQuery);
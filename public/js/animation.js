/**
 * Created by syedmuhammadtaha on 3/30/16.
 */

qecApp.animation('.slide-animation', function ($window) {
    return {

        enter: function (element, done) {
            var startPoint = $window.innerWidth * 0.5,
                tl = new TimelineLite();

            tl.fromTo(element, 3.5, { opacity:0}, {opacity: 1});

        },

        leave: function (element, done) {
            var tl = new TimelineLite();

            tl.to(element, 3.5, {opacity: 0, onComplete: done});
        }
    };
});

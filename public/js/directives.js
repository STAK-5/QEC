/*
 * Created by syedmuhammadtaha on 3/30/16.
 */

qecApp.directive('bgImage', function ($window) {
    return function (scope, element, attrs) {
        var resizeBG = function () {
            var bgwidth = element.width();
            var bgheight = element.height();

            var winwidth = $window.innerWidth;
            var winheight = $window.innerHeight;

            var widthratio = winwidth / bgwidth;
            var heightratio = winheight / bgheight;

            var widthdiff = heightratio * bgwidth;
            var heightdiff = widthratio * bgheight;

            if (heightdiff > winheight) {
                element.css({
                    width: winwidth + 'px',
                    height: heightdiff + 'px'
                });
            } else {
                element.css({
                    width: widthdiff + 'px',
                    height: winheight + 'px'
                });
            }
        };

        var windowElement = angular.element($window);
        windowElement.resize(resizeBG);

        element.bind('load', function () {
            resizeBG();
        });
    }
});
qecApp.directive('starRating', function() {
    return {
        restrict: 'EA',
        templateUrl: './templates/stars.html',
        scope: {
            ratingValue: '=ngModel',
            max: '=?', // optional (default is 5)
            onRatingSelect: '&?',
            readonly: '=?'
        },
        link: function (scope, element, attributes) {
            if (scope.max == undefined) {
                scope.max = 5;
            }
            function updateStars() {
                scope.stars = [];
                if (scope.ratingValue == 1) {
                    for (var i = 0; i < scope.max; i++) {
                        scope.stars.push({
                            filledRed: i < scope.ratingValue
                        });
                    }
                }
                else if (scope.ratingValue == 2) {
                    for (var i = 0; i < scope.max; i++) {
                        scope.stars.push({
                            filledOrange: i < scope.ratingValue
                        });
                    }
                }
                else if (scope.ratingValue == 3) {
                    for (var i = 0; i < scope.max; i++) {
                        scope.stars.push({
                            filledYellow: i < scope.ratingValue
                        });
                    }
                }
                else if (scope.ratingValue == 4) {
                    for (var i = 0; i < scope.max; i++) {
                        scope.stars.push({
                            filledDarkGreen: i < scope.ratingValue
                        });
                    }
                }
                else if (scope.ratingValue == 5) {
                    for (var i = 0; i < scope.max; i++) {
                        scope.stars.push({
                            filledGreen: i < scope.ratingValue
                        });
                    }
                }
                else {
                    for (var i = 0; i < scope.max; i++) {
                        scope.stars.push({
                            filled: i < scope.ratingValue
                        });
                    }
                }
            }
            scope.toggle = function (index) {

                scope.ratingValue = index + 1;
                scope.onRatingSelect({
                    rating: index + 1
                });
            };
            scope.$watch('ratingValue', function (newValue, oldValue) {
                if (newValue) {
                    updateStars();
                }
                //console.log(newValue);
            });
        }
    };
});


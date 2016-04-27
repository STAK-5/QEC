var app = angular.module('login_app',[]);


app.factory('QueueService', function ($rootScope) {
    var queue = new createjs.LoadQueue(true);

    function loadManifest(manifest) {
        queue.loadManifest(manifest);

        queue.on('progress', function (event) {
            $rootScope.$broadcast('queueProgress', event);
        });

        queue.on('complete', function () {
            $rootScope.$broadcast('queueComplete', manifest);
        });
    }

    return {
        loadManifest: loadManifest
    }
});

app.directive('bgImage', function ($window) {
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


app.controller('sliderController', ['$scope', '$timeout', 'QueueService', function ($scope, $timeout, QueueService) {


    var INTERVAL = 15000,
        slides = [
            { id: "image00", src: "./imgs/Slider/DUETFromMM.jpg" },
            //{id: "image00", src: "imgs/Slider/DUETFromMM.jpg"},
            { id: "image02", src: "./imgs/Slider/FlagMarch.jpg" },
            //{id: "image02", src: "imgs/Slider/FlagMarch.jpg"},
            { id: "image03", src: "./imgs/Slider/Audi.jpg" },
            //{id: "image03", src: "imgs/Slider/Audi.jpg"},
            { id: "image03", src: "./imgs/Slider/DUET.jpg" },
            //{id: "image03", src: "imgs/Slider/DUET.jpg"},
            { id: "image03", src: "./imgs/Slider/DUET2.jpg" },
            //{id: "image03", src: "imgs/Slider/DUET2.jpg"},
            { id: "image03", src: "./imgs/Slider/DUET3.jpg" },
            //{id: "image03", src: "imgs/Slider/DUET3.jpg"}

        ];

    function setCurrentSlideIndex(index) {
        $scope.currentIndex = index;
    }

    function isCurrentSlideIndex(index) {
        return $scope.currentIndex === index;
    }

    function nextSlide() {
        $scope.currentIndex = ($scope.currentIndex < $scope.slides.length - 1) ? ++$scope.currentIndex : 0;
        $timeout(nextSlide, INTERVAL);
    }

    function setCurrentAnimation(animation) {
        $scope.currentAnimation = animation;
    }

    function isCurrentAnimation(animation) {
        return $scope.currentAnimation === animation;
    }

    function loadSlides() {
        QueueService.loadManifest(slides);
    }

    $scope.$on('queueProgress', function (event, queueProgress) {
        $scope.$apply(function () {
            $scope.progress = queueProgress.progress * 100;
        });
    });

    $scope.$on('queueComplete', function (event, slides) {
        $scope.$apply(function () {
            $scope.slides = slides;
            $scope.loaded = true;

            $timeout(nextSlide, INTERVAL);
        });
    });

    $scope.progress = 0;
    $scope.loaded = false;
    $scope.currentIndex = 0;
    $scope.currentAnimation = 'slide-left-animation';

    $scope.setCurrentSlideIndex = setCurrentSlideIndex;
    $scope.isCurrentSlideIndex = isCurrentSlideIndex;
    $scope.setCurrentAnimation = setCurrentAnimation;
    $scope.isCurrentAnimation = isCurrentAnimation;

    loadSlides();
}]);

app.animation('.slide-animation', function ($window) {
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


app.controller('hodLoginController', ['$scope', '$log', '$http', '$location', '$timeout','$window',
    
    
    function ($scope, $log, $http, $location, $timeout, $window) {
        console.log('HOD login controller [INVOKED]');

        $scope.hodEmail = '';
        $scope.hodPassword = '';
        $scope.err = '';
        $scope.errclass = '';
        $scope.wait = false;
        $scope.attempts = 0;
        $scope.printMessage = function (errmsg, errclass) {
            $scope.msg = errmsg;
            $scope.errclass = errclass;
        };

        $scope.login = function () {
            console.log('$scope.attempts: ', $scope.attempts);
            $scope.err = ''; 
            $scope.wait = true;
            $scope.msg = 'Please Wait...';
            $scope.errclass = 'alert alert-info text-center';
            $log.info('ng-POST req to /api/hodLogin with ', $scope.hodEmail, $scope.hodPassword);

            $http.post('/api/hodlogin', {
                email: $scope.hodEmail,
                password: $scope.hodPassword
            }).success(function (result) {
                    $scope.wait = false;
                    $scope.err = 200;
                    $log.info (result + ' successfully logged in');
                    $location.path('/');
                    $window.location.reload();
               })
                .error(function (data, status) {
                    $scope.attempts = data.att;
                    $scope.wait =  false;
                    $log.error('err: ', data);
                    $scope.err = data.status;
                    $scope.hodPassword = '';
                    $timeout(function(){
                        $scope.err = '';
                    },5000) 
        })
        };
    }]);
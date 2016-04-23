qecAppStudent.controller('sliderController', ['$scope', '$timeout', 'QueueService', function ($scope, $timeout, QueueService) {


    var INTERVAL = 5000,
        slides = [
            { id: "image00", src: "imgs/Slider/DUETFromMM.jpg" },
            //{id: "image00", src: "imgs/Slider/DUETFromMM.jpg"},
            { id: "image02", src: "imgs/Slider/FlagMarch.jpg" },
            //{id: "image02", src: "imgs/Slider/FlagMarch.jpg"},
            { id: "image03", src: "imgs/Slider/Audi.jpg" },
            //{id: "image03", src: "imgs/Slider/Audi.jpg"},
            { id: "image03", src: "imgs/Slider/DUET.jpg" },
            //{id: "image03", src: "imgs/Slider/DUET.jpg"},
            { id: "image03", src: "imgs/Slider/DUET2.jpg" },
            //{id: "image03", src: "imgs/Slider/DUET2.jpg"},
            { id: "image03", src: "imgs/Slider/DUET3.jpg" },
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

qecAppStudent.controller('studentLoginController', ['$scope', '$routeParams', '$log', '$http', '$location', '$timeout','$window',
    function ($scope, $routeParams, $log, $http, $location, $timeout,$window) {
        
        console.info('This is student Login');

        $scope.accountid = '';
        $scope.password = '';
        $scope.msgclass = '';
        $scope.msg = 'LOGIN';

        $scope.printMessage = function (msg, msgclass) {
            $scope.msg = msg;
            $scope.msgclass = msgclass;
            $timeout(function () {
                $scope.msg = 'LOGIN';
                $scope.msgclass = '';
            }, 5000)
        }

        $scope.login = function () {
            $log.info('Login invoked..');
            $http.post('/api/login', {
                accountid: $scope.accountid,
                password: $scope.password
            }).success(function (result) {
                $window.location.reload();
            }).error(function (data, status) {
                $scope.printMessage(data.msg, 'alert alert-danger text-center')
            })
        }
    }]);

qecAppStudent.controller('studentDashboardController', ['$scope', '$routeParams', 'teacherParser', 'teacherMaker', function ($scope, $routeParams, teacherParser, teacherMaker) {

    $scope.teacherValue = $routeParams.value || 1;
    
    console.info('Got Student');

    $scope.teachers = teacherMaker;

    $scope.value = teacherParser.value;

    $scope.logTeacher = function (event) {
        if (event.target.name) {
            $scope.value = event.target.name;
            $scope.$watch('value', function () {
                teacherParser.value = event.target.name;
                console.log('On dashboard' + teacherParser.value);
            });
        }
    };


    $scope.pageValue = '1';
    $scope.changePage = function (event) {

        if (event.target.id) {
            $scope.pageValue = event.target.id;
        }

        //$scope.pageValue = event.target.id;
        console.info($scope.pageValue);
    }


    $scope.teacherImages = {

        firstColumn: {
            image1: { url: 'imgs/Slider/slider/slider5.jpg', value: '1' },
            image2: { url: 'imgs/Slider/slider/slider2.png', value: '2' },
            image3: { url: 'imgs/Slider/slider/slider3.png', value: '3' },
            image4: { url: 'imgs/Slider/slider/slider4.png', value: '4' },
            image5: { url: 'imgs/Slider/slider/slider5.jpg', value: '4' },
            image6: { url: 'imgs/Slider/slider/slider6.png', value: '4' }
        },
        secondColumn: {
            image5: { url: 'imgs/Slider/slider/slider7.png', value: '5' },
            image6: { url: 'imgs/Slider/slider/slider6.png', value: '6' },
            image7: { url: 'imgs/Slider/slider/slider5.jpg', value: '7' },
            image8: { url: 'imgs/Slider/slider/slider1.jpg', value: '8' },
            image4: { url: 'imgs/Slider/slider/slider3.png', value: '4' },
            image9: { url: 'imgs/Slider/slider/slider2.png', value: '4' }
        },
        /*  thirdColumn: {
         image9  : {url: 'imgs/Slider/slider/slider1.jpg',  value: '9'},
         image10 : {url: 'imgs/Slider/slider/slider2.png', value: '11'},
         image11 : {url: 'imgs/Slider/slider/slider3.png', value: '10'},
         image12 : {url: 'imgs/Slider/slider/slider4.png', value: '12'},
         image4 : {url: 'imgs/Slider/slider/slider5.jpg', value:'4'},
         image6 : {url: 'imgs/Slider/slider/slider6.png', value:'4'}
         },*/
    };


}]);


qecAppStudent.controller('questionnaireController', ['$scope', '$routeParams', 'questionMaker', 'starsParser', 'questionParser', 'teacherParser', '$log', '$http', '$timeout', '$location',

    function ($scope, $routeParams, questionMaker, starsParser, questionParser, teacherParser, $log, $http, $timeout, $location) {

        $scope.teacherValue = $routeParams.value || 1;

        $scope.teacher = teacherParser.value;

        $scope.questions = questionMaker;

        //$scope.teacher = teacherParser;

        console.info(($scope.teacher).toLowerCase());


        $scope.pageValue = 1;

        $scope.starsArray = [];
        $scope.$watch('pageValue', function () {

            questionParser.page = $scope.pageValue;
            console.log('New Page Value : ' + questionParser.page);

            $scope.stars = starsParser.newStars;

            $scope.$watch('stars', function () {
                $scope.stars = starsParser.newStars;
                console.log('Stars on question controller: ' + starsParser.newStars);

                ($scope.starsArray).splice($scope.pageValue - 2, 1, starsParser.newStars);
                console.log('Array: ' + $scope.starsArray);

            });
        });


        $scope.printMessage = function (errclass, errmsg) {
            $scope.errclass = errclass;
            $scope.errmsg = errmsg;
        };
        $scope.month = new Array();
        $scope.month[0] = "January";
        $scope.month[1] = "February";
        $scope.month[2] = "March";
        $scope.month[3] = "April";
        $scope.month[4] = "May";
        $scope.month[5] = "June";
        $scope.month[6] = "July";
        $scope.month[7] = "August";
        $scope.month[8] = "September";
        $scope.month[9] = "October";
        $scope.month[10] = "November";
        $scope.month[11] = "December";


        var value = 2.365;

        $log.info('rounded/ ', value.toFixed(1));
        $scope.updateDetails = function () {
            $scope.printMessage('alert alert-warning text-center', 'Please Wait! Result Being Uploaded.');
            $scope.name = $scope.teacher;
            $scope.survey = {
                date: new Date().getDate() + ', ' + $scope.month[new Date().getMonth()],
                data: $scope.starsArray
            };

            var total = 0;
            for (i = 0; i < $scope.survey.data.length; i++)
                total += $scope.survey.data[i];
            console.log('name: ', $scope.name);
            console.log('Data - Average: ', total / $scope.survey.data.length);
            console.log('Date: ', $scope.survey.date);
            console.log('Date - Survey: ', $scope.survey.date);
            $http.post('/api/submit_quiz', {
                name: $scope.name,
                survey: $scope.survey
            }).success(function (result) {
                $log.info('Update Success - CLIENT ');
                $scope.printMessage('alert alert-success text-center', result.msg);
                $location.path('/student-login');
                $timeout(function () {
                    $scope.printMessage('', '')
                }, 10000);
            }).error(function (data, status) {
                $log.error('RESPONSE ERR - CLIENT ', data);
                console.log(data);
                $scope.printMessage('alert alert-danger text-center', data.msg);
                $timeout(function () {
                    $scope.printMessage(undefined, undefined)
                }, 10000);
            });
        };


}]);


qecAppStudent.controller('sliderController', ['$scope', '$timeout', 'QueueService', function ($scope, $timeout, QueueService) {


    var INTERVAL = 15000,
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

qecAppStudent.controller('studentDashboardController', ['$scope', '$routeParams', 
'$http', '$log', '$location', '$timeout', '$window', 'teacherParser',
    function ($scope, $routeParams, $http, $log, $location, $timeout, $window, teacherParser) {

    //$scope.teacherValue = $routeParams.value || 1;
    
    console.info('Got Student');
    $scope.teachers = {
        firstRow: [],
        secondRow: []
    }
        
        
    $http.get('/api/getteachers')
        .success(function(response){
            // response is array of objects- while objects are teachers.;
            console.info('found something on get request', response);
            
            $scope.teachers.firstRow = response.slice(0, 6);
            if(response.length <= 12) {
                $scope.teachers.secondRow = response.slice(6, response.length);
            }
            else if(response.length > 12){
                $scope.teachers.secondRow = response.slice(6, 12);
            }
            console.info('found something on get request and  now is in scope', $scope.teachers); // test it
        }).error(function(data, status){
            console.error(status, data);
        });
    
    //     // $scope.value = teacherParser.value;
    //     // $scope.graphValue = null;

    // $scope.logout = function () {
    //     console.info('Logout function invoked');
    //     $http.get('/logout');
    //     $window.location.reload();
    // }

    $scope.logTeacher = function (event) {

        if (event.target.name) {
            $scope.value = event.target.name;
            $scope.$watch('value', function () {
                $scope.value = event.target.name;
                console.log('On dashboard' + $scope.value);

            });
        }
        $scope.name = $scope.value;
        
        $http.post('/api/getdetails', {
            name: $scope.name
        }).success(function(result){
            teacherParser.value = result;
            $location.path('/questionnaire');
        })
          .error(function(data , status){
              console.error('error @/api/getdetails: ', data);
          })        
}
    
    $scope.pageValue = '1';
    /*$scope.changePage = function (event) {

        if (event.target.id) {
            $scope.pageValue = event.target.id;
        }

        //$scope.pageValue = event.target.id;
        console.info($scope.pageValue);
    }*/

// $scope.teachers = $scope.teachers2;

}]);


qecAppStudent.controller('ratingController', ['$scope', 'starsParser', 'questionParser', function ($scope, starsParser, questionParser) {

    $scope.ratingValue = 1;

    $scope.starsArray = [];

    $scope.$watch('ratingValue', function (newValue, oldValue) {
        starsParser.newStars = $scope.ratingValue;
        console.log('Stars on rating controller', $scope.ratingValue);
    });

    $scope.text = ['Never', 'Sometimes', 'Usually', 'Most of time', 'Always'];

}]);


qecAppStudent.controller('questionnaireController', ['$scope', '$routeParams', 'questionMaker', 'starsParser', 'questionParser', 'teacherParser', '$log', '$http', '$timeout', '$location',

    function ($scope, $routeParams, questionMaker, starsParser, questionParser, teacherParser, $log, $http, $timeout, $location) {

        $scope.teacherValue = $routeParams.value || 1;

        $scope.teacher = teacherParser.value;
        console.info('Teacher is', $scope.teacher);

        $scope.questions = questionMaker;

        //$scope.teacher = teacherParser;



        $scope.pageValue = 1;

        $scope.starsArray = [];
        $scope.$watch('pageValue', function (newValue, oldValue) {

            questionParser.page = $scope.pageValue;
            console.log('New Page Value : ' + questionParser.page);

            $scope.stars = starsParser.newStars;

            $scope.$watch('stars', function () {
                $scope.stars = starsParser.newStars;
                console.log('Stars on question controller: ' + starsParser.newStars);

                if(newValue >= oldValue){
                    console.info('Next button pressed.');
                    console.info('Question Number : ', newValue - 2);
                    ($scope.starsArray).splice($scope.pageValue - 2, 1, starsParser.newStars);
                    console.log('Array: ' + $scope.starsArray);

                }

                else if(newValue <= oldValue){
                    console.info('Back button pressed.');
                    console.info('Question Number : ', oldValue - 1);
                    ($scope.starsArray).splice(oldValue - 1, 1, starsParser.newStars);
                    console.log('Array: ' + $scope.starsArray);

                }

            });/*


            if(newValue <= oldValue){
                console.info('Back button pressed.');
                console.info('newValue: ', newValue);
                $scope.$watch('stars', function () {
                    $scope.stars = starsParser.newStars;
                    console.log('Stars on question controller: ' + starsParser.newStars);
                    ($scope.starsArray).splice($scope.pageValue - 1, 1, starsParser.newStars);
                    console.log('Array: ' + $scope.starsArray);

                });
            }*/


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
            console.info('name details: ', $scope.teacher.name );
        $log.info('rounded/ ', value.toFixed(1));
        $scope.updateDetails = function () {
            $scope.printMessage('alert alert-warning text-center', 'Please Wait! Result Being Uploaded.');
            $scope.name = $scope.teacher.name;
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
                name: $scope.teacher.name,
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


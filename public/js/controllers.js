/**
 * Created by syedmuhammadtaha on 3/26/16.
 */


qecApp.controller('forgotLoginController', ['$scope', '$routeParams', function ($scope, $routeParams) {


}]);

qecApp.controller('hodDashboardController', ['$scope', '$routeParams', 'teacherMaker', 'teacherParser', '$http', '$log', '$location', '$timeout', 'graphDetails', '$window',
    function ($scope, $routeParams, teacherMaker, teacherParser, $http, $log, $location, $timeout, graphDetails, $window) {

        $scope.teachers = teacherMaker;

        $scope.value = teacherParser.value;
        $scope.graphValue = null;

        $scope.logout = function () {
            console.info('Logout function invoked');
            $http.get('/logout');
            $window.location.reload();
        }
        $scope.logTeacher = function (event) {

            if (event.target.name) {
                $scope.value = event.target.name;
                $scope.$watch('value', function () {
                    teacherParser.value = event.target.name;
                    console.log('On dashboard' + teacherParser.value);

                });
            }

            $scope.name = $scope.value;
            $http.post('/api/getdetails', {
                name: $scope.name
            }).success(function (result) {
                graphDetails.graph = result;
                $log.info(' got back as result', graphDetails.graph);

                $location.path('/graph/:' + $scope.value + '');

            }).error(function (data, status) {
                $log.info('err at getting details: ', data);
            })
        }
        $scope.error = 404;
        $scope.msg = "404. Not Foound";

    }]);

qecApp.controller('studentLoginController', ['$scope', '$routeParams', '$log', '$http', '$location', '$timeout',
    function ($scope, $routeParams, $log, $http, $location, $timeout) {

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
                $location.path('/student-dashboard');
            }).error(function (data, status) {
                $scope.printMessage(data.msg, 'alert alert-danger text-center')
            })
        }
    }]);

qecApp.controller('questionnaireController', ['$scope', '$routeParams', 'questionMaker', 'starsParser', 'questionParser', 'teacherParser', '$log', '$http', '$timeout', '$location',

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

qecApp.controller('sliderController', ['$scope', '$timeout', 'QueueService', function ($scope, $timeout, QueueService) {


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

qecApp.controller('hodLoginController', ['$scope', '$log', '$http', '$location', '$timeout',

    function ($scope, $log, $http, $location, $timeout) {

        console.log('hod Login Controller');


        $scope.hodEmail = '';
        $scope.hodPassword = '';
        $scope.msg = 'HOD Login';
        $scope.errclass = '';
        $scope.printMessage = function (errmsg, errclass) {
            $scope.msg = errmsg;
            $scope.errclass = errclass;

            $timeout(function () {
                $log.info('count down to 5');
                $scope.msg = 'HOD Login';
                $scope.errclass = '';
            }, 5000);

        };

        $scope.login = function () {
            $scope.msg = 'Please Wait...';
            $scope.errclass = 'alert alert-info text-center';
            $log.info('ng-POST req to /api/hodLogin with ', $scope.hodEmail, $scope.hodPassword);

            $http.post('/api/hodlogin', {
                email: $scope.hodEmail,
                password: $scope.hodPassword
            }).success(function (result) {
                $log.info(result + ' successfully logged in');
                $location.path('/dashboard')
            })
                .error(function (data, status) {
                    $log.error('err: ', data.msg);
                    $scope.printMessage(data.msg, 'alert alert-danger text-center no-gutter');
                })
        };
    }]);

qecApp.controller('ratingController', ['$scope', 'starsParser', 'questionParser', function ($scope, starsParser, questionParser) {

    $scope.ratingValue = 1;

    $scope.starsArray = [];

    $scope.$watch('ratingValue', function (newValue, oldValue) {
        starsParser.newStars = $scope.ratingValue;
        console.log('Stars on rating controller', $scope.ratingValue);
    });

    $scope.text = ['Never', 'Sometimes', 'Usually', 'Most of time', 'Always'];

}]);

qecApp.controller('graphController', ['$scope', '$routeParams', 'teacherParser', 'graphDetails', function ($scope, $routeParams, teacherParser, graphDetails) {

    $scope.teacherGraph = $routeParams.value || 1;

    $scope.teacher = teacherParser;

    //$scope.yAxisValues = "1.1, 2.2, 3.3, 4.4";


    /*$scope.$watch('value', function(){
     $scope.value = teacherParser.valuee;
     //(JSON.stringify($scope.value));
     $scope.value = angular.fromJson($scope.value);

     });*/
    console.info(($scope.teacher.value).toLowerCase());

    $scope.graph = graphDetails.graph;

    $scope.surveyResults = $scope.graph.survey_records;

    $scope.average = $scope.graph.total_averages;

    console.info('On Graph Result: ', $scope.graph.survey_records)
}]);


qecApp.controller('studentRegistrationController', ['$scope', '$log', '$location', '$http', '$timeout',
    function ($scope, $log, $location, $http, $timeout) {

        $log.info('student registration controller');
        $scope.accountid = '';
        $scope.password = '';
        $scope.conf_password = '';
        $scope.msg = 'REGISTRATION';
        $scope.errclass = '';
        $scope.printMessage = function (errmsg, errclass) {
            $scope.msg = errmsg;
            $scope.errclass = errclass;
            $scope.accountid = '';
            $scope.password = '';
            $scope.conf_password = '';
            $timeout(function () {
                $log.info('count down to 5');
                $scope.msg = 'REGISTRATION';
                $scope.errclass = '';
            }, 5000);

        };
        $scope.addLocalAccount = function () {
            $scope.errclass = 'alert alert-info text-center';
            $scope.msg = 'Please Wait...';
            $http.post('/api/registration', {
                accountid: $scope.accountid,
                password: $scope.password,
                conf_password: $scope.conf_password
            }).success(function (result) {
                console.log(result);
                $scope.printMessage(result.msg, 'alert alert-success text-center')
            }).error(function (error) {
                console.log(error.msg);
                $scope.printMessage(error.msg, 'alert alert-danger text-center')
            });
        }
    }]);


qecApp.controller('studentDashboardController', ['$scope', '$routeParams', 'teacherParser', 'teacherMaker', function ($scope, $routeParams, teacherParser, teacherMaker) {

    $scope.teacherValue = $routeParams.value || 1;

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


    /*

     $scope.teachers = {
     teacher1: {
     name: 'teacher1',
     age: 00,
     gender: 'unknown',
     subjects: [
     'First subject', 'Second Subject'
     ],
     projects: [
     'First Project', 'Second Project'
     ],
     Ratings: 0,
     image: 'imgs/Slider/1.jpg',
     },
     teacher2: {
     name: 'teacher2',
     age: 00,
     gender: 'unknown',
     subjects: [
     'First subject', 'Second Subject'
     ],
     projects: [
     'First Project', 'Second Project'
     ],
     Ratings: 0,
     image: 'imgs/Slider/2.jpg'
     },
     teacher3: {
     name: 'teacher3',
     age: 00,
     gender: 'unknown',
     subjects: [
     'First subject', 'Second Subject'
     ],
     projects: [
     'First Project', 'Second Project'
     ],
     Ratings: 0,
     image: 'imgs/Slider/3.jpg'
     },

     teacher4: {
     name: 'teacher4',
     age: 00,
     gender: 'unknown',
     subjects: [
     'First subject', 'Second Subject'
     ],
     projects: [
     'First Project', 'Second Project'
     ],
     Ratings: 0,
     image: 'imgs/Slider/4.jpg'
     },

     teacher5: {
     name: 'teacher5',
     age: 00,
     gender: 'unknown',
     subjects: [
     'First subject', 'Second Subject'
     ],
     projects: [
     'First Project', 'Second Project'
     ],
     Ratings: 0,
     image: 'imgs/Slider/5.jpg'
     },

     teacher6: {
     name: 'teacher6',
     age: 00,
     gender: 'unknown',
     subjects: [
     'First subject', 'Second Subject'
     ],
     projects: [
     'First Project', 'Second Project'
     ],
     Ratings: 0,
     image: 'imgs/Slider/6.jpg'
     },

     teacher7: {
     name: 'teacher7',
     age: 00,
     gender: 'unknown',
     subjects: [
     'First subject', 'Second Subject'
     ],
     projects: [
     'First Project', 'Second Project'
     ],
     Ratings: 0,
     image: 'imgs/Slider/7.jpg'
     },

     teacher8: {
     name: 'teacher8',
     age: 00,
     gender: 'unknown',
     subjects: [
     'First subject', 'Second Subject'
     ],
     projects: [
     'First Project', 'Second Project'
     ],
     Ratings: 0,
     image: 'imgs/Slider/8.jpg'
     },

     teacher9: {
     name: 'teacher9',
     age: 00,
     gender: 'unknown',
     subjects: [
     'First subject', 'Second Subject'
     ],
     projects: [
     'First Project', 'Second Project'
     ],
     Ratings: 0,
     image: 'imgs/Slider/9.jpg'
     },

     teacher10: {
     name: 'teacher10',
     age: 00,
     gender: 'unknown',
     subjects: [
     'First subject', 'Second Subject'
     ],
     projects: [
     'First Project', 'Second Project'
     ],
     Ratings: 0,
     image: 'imgs/Slider/10.jpg'
     },

     teacher11: {
     name: 'teacher11',
     age: 00,
     gender: 'unknown',
     subjects: [
     'First subject', 'Second Subject'
     ],
     projects: [
     'First Project', 'Second Project'
     ],
     Ratings: 0,
     image: 'imgs/Slider/11.jpg'
     },

     teacher12: {
     name: 'teacher12',
     age: 00,
     gender: 'unknown',
     subjects: [
     'First subject', 'Second Subject'
     ],
     projects: [
     'First Project', 'Second Project'
     ],
     Ratings: 0,
     image: 'imgs/Slider/12.jpg'
     }
     }
     */


}]);

qecApp.controller('teacherRegistrationController', ['$scope', '$log', '$location', '$http', '$timeout', 'Upload',
    function ($scope, $log, $location, $http, $timeout, Upload) {
        
        $scope.printMessage = function (msg, msgclass) {
            $scope.msg = msg;
            $scope.msgclass = msgclass;

            $timeout(function () {
                $scope.msg = '';
                $scope.msgclass = '';
            }, 5000)
        }
        $scope.register = function () {
            $scope.printMessage('Please Wait', 'alert-info text-center');
            $log.log('info', $scope.teacherName,
                $scope.teacherEmail,
                $scope.teacherContact,
                $scope.teacherDepartment);

            $http.post('/api/teacher_registration', {
                name: $scope.teacherName,
                email: $scope.teacherEmail,
                department: $scope.teacherDepartment,
                survey_records: [],
                total_averages: [],
                current_average: null,
                max_average: null,
                contact: $scope.teacherContact
            }).success(function (result) {
                $log.info('SAVE SUCCESS 200/OK', result);
                $scope.printMessage(result, 'alert-success text-center');
            }).error(function (err) {
                $log.error('ERROR AT SAVING TEACHER DATA', err);
                $scope.printMessage(err, 'alert-danger text-center');

            })
        }
    }]);


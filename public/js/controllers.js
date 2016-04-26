/**
 * Created by syedmuhammadtaha on 3/26/16.
 */



qecApp.controller('forgotLoginController', ['$scope', '$routeParams', function ($scope, $routeParams) {


}]);

qecApp.controller('hodDashboardController', ['$scope', '$routeParams', 'teacherMaker', 'teacherParser', 
'$http', '$log', '$location', '$timeout', 'graphDetails', '$window',
    function ($scope, $routeParams, teacherMaker, teacherParser, $http, $log, $location, $timeout, graphDetails, $window) {

        console.info("On HOD");
        $scope.teachers = '';
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
        $scope.msg = "404. Not Found";

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
f
    $scope.ratingValue = 1;

    $scope.starsArray = [];

    $scope.$watch('ratingValue', function (newValue, oldValue) {
        starsParser.newStars = $scope.ratingValue;
        console.log('Stars on rating controller', $scope.ratingValue);
    });

    $scope.text = ['Never', 'Sometimes', 'Usually', 'Most of time', 'Always'];

}]);

qecApp.controller('graphController', ['$scope', '$routeParams', 'teacherParser', 'questionMaker', 'graphDetails','$http','$window',
    function ($scope, $routeParams, teacherParser, questionMaker, graphDetails, $http, $window) {

    $scope.teacherGraph = $routeParams.value || 1;

    $scope.teacher = teacherParser;

    $scope.questions = questionMaker.questions;


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
    
    
    $scope.logout = function () {
            console.info('Logout function invoked');
            $http.get('/logout');
            $window.location.reload();
        }
}]);


qecApp.controller('studentRegistrationController', ['$scope', '$log', '$location', '$http', '$timeout',
    function ($scope, $log, $location, $http, $timeout) {

        $log.info('student registration controller');
        $scope.accountid = '';
        $scope.password = '';
        $scope.conf_password = '';
        $scope.msg = '';
        $scope.errclass = '';
        $scope.printMessage = function (errmsg, errclass) {
            console.info('error class: ', errclass);
            $scope.msg = errmsg;
            $scope.errclass = errclass;
            $scope.accountid = '';
            $scope.password = '';
            $scope.conf_password = '';
            $timeout(function () {
                $scope.msg = '';
            }, 5000);
        };
        $scope.addLocalAccount = function () {
            $scope.printMessage('Please Wait...', 'alert-info text-center');
            $http.post('/api/registration', {
                accountid: $scope.accountid,
                password: $scope.password,
                conf_password: $scope.conf_password
            }).success(function (result) {
                console.log(result);
                $scope.printMessage(result.msg, 'alert-success text-center');
            }).error(function (error) {
                console.log(error);
                $scope.printMessage(error, 'alert-danger text-center');
            });
        }
    }]);

qecApp.controller('teacherRegistrationController', ['$scope', '$log', '$location', '$http', '$timeout','Upload',
    function($scope, $log, $location, $http, $timeout, Upload) {
        
        console.info('ready to upload file.');
        
        $scope.f = '';
        $scope.uploadFiles = function(file, errFiles) {
        $scope.f = file;
        console.log('got file from form:' ,file)
        $scope.errFile = errFiles && errFiles[0];
        if (file) {
            file.upload = Upload.upload({
                url: 'http://localhost:3301/api/teacher_reg',
                data: {file: file}
            });

            file.upload.then(function (response) {
                $timeout(function () {
                    file.result = response.data;
                });
            }, function (response) {
                if (response.status > 0)
                    $scope.errorMsg = response.status + ': ' + response.data;
            }, function (evt) {
                file.progress = Math.min(100, parseInt(100.0 * 
                                         evt.loaded / evt.total));
            });
        }   
    }
    
        $scope.register = function(){
            console.info('sending file to server: ', $scope.f);
            $http.post('/api/teacher_reg',{
                file:$scope.f
            }).success(function(res){
                //do something
            }).error(function(data, status){
                
            })
        }
    }]);

        // $scope.printMessage = function (msg, msgclass) {
        //     $scope.msg = msg;
        //     $scope.msgclass = msgclass;

        //     $timeout(function () {
        //         $scope.msg = '';
        //         $scope.msgclass = '';
        //     }, 5000)
        // }
        // $scope.register = function () {
        //     $scope.printMessage('Please Wait', 'alert-info text-center');
        //     $log.log('info', $scope.teacherName,
        //         $scope.teacherEmail,
        //         $scope.teacherContact,
        //         $scope.teacherDepartment);

        //     $http.post('/api/teacher_registration', {
        //         name: $scope.teacherName,
        //         email: $scope.teacherEmail,
        //         department: $scope.teacherDepartment,
        //         survey_records: [],
        //         total_averages: [],
        //         current_average: null,
        //         max_average: null,
        //         contact: $scope.teacherContact
        //     }).success(function (result) {
        //         $log.info('SAVE SUCCESS 200/OK', result);
        //         $scope.printMessage(result, 'alert-success text-center');
        //     }).error(function (err) {
        //         $log.error('ERROR AT SAVING TEACHER DATA', err);
        //         $scope.printMessage(err, 'alert-danger text-center');

        //     })
        // }

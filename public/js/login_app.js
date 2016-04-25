var app = angular.module('login_app',[]);


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
                    $timeout(function(){
                        $scope.err = '';
                    },5000) 
        })
        };
    }]);
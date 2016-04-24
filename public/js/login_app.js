var app = angular.module('login_app',[]);


app.controller('hodLoginController', ['$scope', '$log', '$http', '$location', '$timeout','$window',
    
    
    function ($scope, $log, $http, $location, $timeout, $window) {

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
                    $log.info (result + ' successfully logged in');
                    $location.path('/');
                    $window.location.reload();
               })
                .error(function (data, status) {
                    $log.error('err: ', data.msg);
                    $scope.printMessage(data.msg, 'alert alert-danger text-center no-gutter');
                    $window.location.reload();    
            })
        };
    }]);
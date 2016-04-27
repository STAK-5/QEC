/**
 * Created by syedmuhammadtaha on 3/26/16.
 */

qecAppStudent.config(['$routeProvider', '$locationProvider', function($routeProvider /*, $locationProvider*/) {

    $routeProvider
       .otherwise({ redirectTo: '/'})
       
       .when('/questionnaire',{
           templateUrl: 'pages/student/questionnaire.html',
           controller: 'questionnaireController'
       })
       
       .when('/', {
           templateUrl: 'pages/student/studentDashboard.html',
           controller: 'studentDashboardController'
       })

        .when('/about', {
            templateUrl: 'pages/about.html',
        })

}]);

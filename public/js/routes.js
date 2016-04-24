/**
 * Created by syedmuhammadtaha on 3/26/16.
 */

qecApp.config(['$routeProvider', '$locationProvider', function($routeProvider /*, $locationProvider*/) {

    $routeProvider

        .when('/', {
            templateUrl: 'pages/hodDashboard.html',
            controller: 'hodDashboardController'
        })

        .when('/forgot', {
            templateUrl: 'pages/forgot.html',
            controller: 'forgotLoginController'
        })

        .when('/student-login', {
            templateUrl: 'pages/studentLogin.html',
            controller: 'studentLoginController'
        })

        .when('/questionnaire', {
            templateUrl: 'pages/questionnaire.html',
            controller: 'questionnaireController'
        })

        .when('/questionnaire/:value', {
            templateUrl: 'pages/questionnaire.html',
            controller: 'questionnaireController'
        })

        .when('/about', {
            templateUrl: 'pages/about.html',
            controller: 'sliderController'
        })

        .when('/graph', {
            templateUrl: 'pages/graph.html',
            controller: 'graphController'
        })

        .when('/graph/:value', {
            templateUrl: 'pages/graph.html',
            controller: 'graphController'
        })

        .when('/student-registration', {
            templateUrl: 'pages/studentRegistration.html',
            controller: 'studentRegistrationController'
        })

        .when('/student-dashboard', {
            templateUrl: 'pages/studentDashboard.html',
            controller: 'studentDashboardController'
        })

        .when('/add-teacher',{
            templateUrl: 'pages/addTeacher.html',
            controller: 'teacherRegistrationController'
        })
        .otherwise({ redirectTo: '/'});


    // $locationProvider.html5Mode(true)
}]);

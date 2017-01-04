(function (angular) {

    'use strict';

    var sharerrorApp = angular.module('sharerror');
    sharerrorApp
        .config(config);

    function config($stateProvider) {
        $stateProvider
            .state('register', {
                url: '/register',
                controller: 'registerController',
                controllerAs: 'vm',
                templateUrl: 'app/authorization/register/register.html'
            })
    }

}(angular));
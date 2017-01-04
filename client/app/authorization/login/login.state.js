(function (angular) {

    'use strict';

    var sharerrorApp = angular.module('sharerror');
    sharerrorApp
        .config(config);

    function config($stateProvider) {
        $stateProvider
            .state('login', {
                url: '/login',
                controller: 'logInController',
                controllerAs: 'vm',
                templateUrl: 'app/authorization/login/login.html'
            })
    }

}(angular));
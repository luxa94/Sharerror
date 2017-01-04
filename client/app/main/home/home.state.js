(function (angular) {

    'use strict';

    var sharerrorApp = angular.module('sharerror');
    sharerrorApp
        .config(config);

    function config($stateProvider) {
        $stateProvider
            .state('base.home', {
                url: '/home',
                controller: 'homeController',
                controllerAs: 'vm',
                templateUrl: 'app/main/home/home.html'
            })
    }

}(angular));
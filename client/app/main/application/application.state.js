(function (angular) {

    'use strict';

    var sharerrorApp = angular.module('sharerror');
    sharerrorApp
        .config(config);

    function config($stateProvider) {
        $stateProvider
            .state('base.application', {
                url: '/application/{id:string}',
                controller: 'applicationController',
                controllerAs: 'vm',
                templateUrl: 'app/main/application/application.html'
            })
    }

}(angular));
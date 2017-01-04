(function (angular) {

    'use strict';

    var sharerrorApp = angular.module('sharerror');
    sharerrorApp
        .config(config);

    function config($stateProvider) {
        $stateProvider
            .state('base', {
                url: '',
                abstract: true,
                controller: 'baseController',
                controllerAs: 'vm',
                templateUrl: 'app/main/base/base.html'
            })
    }

}(angular));
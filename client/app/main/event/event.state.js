(function (angular) {

    'use strict';

    var sharerrorApp = angular.module('sharerror');
    sharerrorApp
        .config(config);

    function config($stateProvider) {
        $stateProvider
            .state('base.event', {
                url: '/event/{id:string}',
                controller: 'eventController',
                controllerAs: 'vm',
                templateUrl: 'app/main/event/event.html'
            })
    }

}(angular));
(function (angular) {

    'use strict';

    angular.module('sharerror')
        .controller('baseController', ['$scope', '$http', '$state', 'authorizationService', baseController]);

    function baseController($scope, $http, $state, authorizationService) {
        var vm = this;

        vm.user = {};

        vm.logout = function () {
            authorizationService.logout();
        };

        vm.home = function () {
            $state.go('base.home');
        };
    }

}(angular));

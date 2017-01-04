(function (angular) {

    'use strict';

    angular.module('sharerror')
        .controller('homeController', ['$scope', '$state', '$mdDialog', 'applicationService', homeController]);

    function homeController($scope, $state, $mdDialog, applicationService) {
        var vm = this;

        vm.apps = [];

        applicationService.findAll().then(function (response) {
            vm.apps = response.data;
        });

        vm.clearSearch = function () {
            vm.query = '';
        };

        vm.openApplication = function (id) {
            $state.go('base.application', {id: id});
        };

    }

}(angular));
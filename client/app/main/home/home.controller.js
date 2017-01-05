(function (angular) {

    'use strict';

    angular.module('sharerror')
        .controller('homeController', ['$scope', '$state', '$mdDialog', 'applicationService', homeController]);

    function homeController($scope, $state, $mdDialog, applicationService) {
        var vm = this;

        vm.apps = [];

        function refresh() {
            applicationService.findAll().then(function (response) {
                vm.apps = response.data;
            });
        }

        refresh();

        vm.addApplication = function () {
            $mdDialog.show({
                controller: 'newApplicationController',
                controllerAs: 'vm',
                templateUrl: '/app/main/home/dialog/newApplication.html',
                parent: angular.element(document.body)
            }).then(function () {
                refresh();
            }).catch(function () {
                console.log('Canceled.')
            });
        };

        vm.openApplication = function (id) {
            $state.go('base.application', {id: id});
        };

    }

}(angular));
(function (angular) {

    'use strict';

    angular.module('sharerror')
        .controller('applicationController', ['$scope', '$state', 'userService', '$stateParams', 'applicationService', '$localStorage', applicationController]);

    function applicationController($scope, $state, userService, $stateParams, applicationService, $localStorage) {
        var vm = this;
        var appId = $stateParams.id;

        vm.app = {};
        vm.otherUsers = [];

        vm.userId = $localStorage.userId;

        function refreshApplication() {
            applicationService.findOne(appId)
                .then(function (response) {
                    vm.app = response.data;
                })
                .catch(function (response) {
                    console.log(response);
                });
        }

        function refreshOtherUsers() {
            applicationService.findOtherUsers(appId)
                .then(function (response) {
                    vm.otherUsers = response.data;
                })
                .catch(function (response) {
                    console.log(response);
                });
        }

        function refreshAll() {
            refreshApplication();
            refreshOtherUsers();
        }

        refreshAll();

        vm.openEvent = function (id) {
            $state.go('base.event', {id: id});
        };

        vm.addUser = function (userId) {
            userService.registerForApp(userId, appId)
                .then(function (response) {
                    refreshAll();
                })
                .catch(function (response) {
                    console.log(response);
                });
        };
    }

}(angular));
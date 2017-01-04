(function (angular) {

    'use strict';

    angular.module('sharerror')
        .controller('applicationController', ['$scope', '$state', '$mdDialog', '$stateParams', 'applicationService', applicationController]);

    function applicationController($scope, $state, $mdDialog, $stateParams, applicationService) {
        var vm = this;

        vm.app = {};

        applicationService.findOne($stateParams.id)
            .then(function (response) {
                vm.app = response.data;
            })
            .catch(function (response) {
                console.log(response);
            });

        vm.openEvent = function (id) {
            console.log(id);
        }
    }

}(angular));
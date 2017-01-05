(function (angular) {

    'use strict';

    angular.module('sharerror')
        .controller('newApplicationController', ['$mdDialog', 'applicationService', newApplicationController]);

    function newApplicationController($mdDialog, applicationService) {
        var vm = this;

        vm.app = {};

        vm.save = function () {
            applicationService.create(vm.app)
                .then(function () {
                    $mdDialog.hide();
                })
                .catch(function (response) {
                    console.log(response);
                    alertify.error(response.data.message || 'Unable to create the application.');
                });
        };

        vm.cancel = function () {
            $mdDialog.cancel();
        };
    }

}(angular));
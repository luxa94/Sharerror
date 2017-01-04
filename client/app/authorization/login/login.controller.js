(function (angular) {

    'use strict';

    angular.module('sharerror')
        .controller('logInController', ['$scope', '$http', '$state', '$mdDialog', 'authorizationService', logInController]);

    function logInController($scope, $http, $state, $mdDialog, authorizationService) {
        var vm = this;

        vm.user = {};

        vm.goToRegister = function () {
            $state.go('register');
        };

        vm.login = function () {
            authorizationService.login(vm.user, function (successful) {
                if (!successful) {
                    $mdDialog.show(
                        $mdDialog.alert()
                            .clickOutsideToClose(true)
                            .title('Error')
                            .textContent('Invalid credentials.')
                            .ok('Ok')
                    );
                }
            })
        };
    }

}(angular));

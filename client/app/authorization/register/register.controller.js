(function (angular) {

    'use strict';

    angular.module('sharerror')
        .controller('registerController', ['$scope', '$http', '$state', '$mdDialog', 'userService', registerController]);

    function registerController($scope, $http, $state, $mdDialog, userService) {
        var vm = this;
        vm.user = {};

        vm.goToLogin = function () {
            $state.go('login');
        };

        vm.register = function () {
            userService.register(vm.user)
                .then(function (response) {
                    alertify.success('Successful registration.');
                    $state.go('login');
                })
                .catch(function (response) {
                    debugger;
                    $mdDialog.show(
                        $mdDialog.alert()
                            .clickOutsideToClose(true)
                            .title('Error')
                            .textContent(response.data)
                            .ok('Ok')
                    );
                });
        };
    }

}(angular));

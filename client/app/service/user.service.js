(function (angular) {

    'use strict';
    var BASE_URL = '/api/users';

    angular
        .module('sharerror')
        .service('userService', ['$http', userService]);

    function userService($http) {
        return {
            register: register,
            findAll: findAll,
            registerForApp: registerForApp
        };

        function register(registerDTO) {
            return $http.post(BASE_URL, registerDTO);
        }

        function findAll() {
            return $http.get(BASE_URL);
        }

        function registerForApp(userId, applicationId) {
            return $http.put(BASE_URL + '/' + userId + '/applications/' + applicationId);
        }
    }

}(angular));
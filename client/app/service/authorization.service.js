(function (angular) {

    'use strict';

    angular
        .module('sharerror')
        .service('authorizationService', ['$http', '$localStorage', '$state', authorizationService]);

    function authorizationService($http, $localStorage, $state) {
        return {
            login: login,
            logout: logout
        };

        function login(loginDTO, callback) {
            $http.post('/api/users/login', loginDTO)
                .then(function (response) {
                    console.log(response);
                    var token = response.data.token;
                    if (token) {
                        $http.defaults.headers.common.Authorization = token;
                        $localStorage.token = token;

                        if (callback) {
                            callback(true);
                        }
                        $state.go('base.home');
                    }
                })
                .catch(function (reason) {
                    console.log(reason);
                    if (callback) {
                        callback(false);
                    }
                });
        }

        function logout() {
            delete $localStorage.token;
            $http.defaults.headers.common.Authorization = '';
            $state.go('login');
        }
    }

}(angular));
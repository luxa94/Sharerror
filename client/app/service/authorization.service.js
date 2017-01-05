(function (angular) {

    'use strict';

    angular
        .module('sharerror')
        .service('authorizationService', ['$http', '$localStorage', '$state', 'jwtHelper', authorizationService]);

    function authorizationService($http, $localStorage, $state, jwtHelper) {
        return {
            login: login,
            logout: logout
        };

        function login(loginDTO, callback) {
            $http.post('/api/users/login', loginDTO)
                .then(function (response) {
                    var token = response.data.token;
                    if (token) {
                        var tokenPayload = jwtHelper.decodeToken(token);

                        $http.defaults.headers.common.Authorization = token;
                        $localStorage.token = token;
                        $localStorage.userId = tokenPayload.id;

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
            $localStorage.userId = '';
            $state.go('login');
        }
    }

}(angular));
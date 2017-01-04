(function (angular) {

    'use strict';

    var sharerrorApp = angular.module('sharerror', ['ngStorage', 'ngRoute', 'ui.router', 'ngMaterial', 'angular-jwt']);
    sharerrorApp.factory('authenticationResponseInterceptor', ['$q', '$location', authenticationResponseInterceptor]);
    sharerrorApp
        .config(config)
        .run(run);

    function authenticationResponseInterceptor($q, $location, authorizationService) {
        return {
            response: function (response) {
                if (response.status === 401) {
                    console.log("Response 401");
                }
                return response || $q.when(response);
            },
            responseError: function (rejection) {
                if (rejection.status === 401) {
                    console.log("Response Error 401", rejection);
                    authorizationService.removeUser();
                    $location.path('/login');
                }
                return $q.reject(rejection);
            },
            request: function (config) {
                return config;
            }
        }
    }

    function config($httpProvider, $urlRouterProvider, $mdThemingProvider) {
        $urlRouterProvider.otherwise('/login');
        $mdThemingProvider.theme('default').primaryPalette('pink').accentPalette('purple');
        $httpProvider.interceptors.push('authenticationResponseInterceptor');
        $httpProvider.interceptors.push(function ($q) {
            return {
                'response': function (response) {
                    return response;
                },
                'responseError': function (rejection) {
                    if (rejection.status === 500) {
                        alert('server error!');
                    }
                    return $q.reject(rejection);
                }
            };
        });
    }

    function run($http, $localStorage, $state, $rootScope) {
        if ($localStorage.token) {
            $http.defaults.headers.common.Authorization = $localStorage.token;
        }

        var publicStates = ['login', 'register'];

        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {

            var restrictedState = publicStates.indexOf(toState.name) === -1;
            if (restrictedState && !$localStorage.token) {
                $state.go('login');
            } else if (!restrictedState && $localStorage.token) {
                $state.go('base.home');
            }
        });
    }
}(angular));
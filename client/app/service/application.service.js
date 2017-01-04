(function (angular) {

    'use strict';

    angular
        .module('sharerror')
        .service('applicationService', ['$http', applicationService]);

    var BASE_URL = '/api/applications';

    function urlAndId(id) {
        return BASE_URL + '/' + id;
    }

    function applicationService ($http) {
        return {
            create: create,
            findAll: findAll,
            findOne: findOne,
            deleteOne: deleteOne
        };

        function create(applicationDTO) {
            return $http.post(BASE_URL, applicationDTO);
        }

        function findAll() {
            return $http.get(BASE_URL);
        }

        function findOne(applicationId) {
            return $http.get(urlAndId(applicationId));
        }

        function deleteOne(loginDTO) {
            return $http.delete(urlAndId(applicationId));
        }
    }

}(angular));
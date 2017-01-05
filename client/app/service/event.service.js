(function (angular) {

    'use strict';
    angular
        .module('sharerror')
        .service('eventService', ['$http', eventService]);

    var BASE_URL = '/api/events';

    function urlAndId(id) {
        return BASE_URL + '/' + id;
    }

    function eventService ($http) {
        return {
            findOne: findOne,
            createComment: createComment
        };

        function findOne(eventId) {
            return $http.get(urlAndId(eventId));
        }

        function createComment(eventId, commentDTO) {
            return $http.post(urlAndId(eventId) + '/comments', commentDTO);
        }
    }

}(angular));
(function (angular) {

    'use strict';

    angular
        .module('sharerror')
        .service('commentService', ['$http', commentService]);

    var BASE_URL = '/api/comments';

    function urlAndId(id) {
        return BASE_URL + '/' + id;
    }

    function commentService ($http) {
        return {
            findOne: findOne,
            createComment: createComment
        };

        function findOne(commentId) {
            return $http.get(urlAndId(commentId));
        }

        function createComment(commentId, commentDTO) {
            return $http.post(urlAndId(commentId) + '/comments', commentDTO);
        }
    }

}(angular));
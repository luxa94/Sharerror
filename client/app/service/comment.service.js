(function (angular) {

    'use strict';

    angular
        .module('sharerror')
        .service('commentService', ['$http', commentService]);

    var BASE_URL = '/api/comments/';

    function urlAndId(id) {
        return BASE_URL + '/' + id;
    }

    function commentService ($http) {
        return {
            createComment: createComment
        };

        function createComment(commentId, commentDTO) {
            return $http.post(urlAndId(commentId) + '/comments', commentDTO);
        }
    }

}(angular));
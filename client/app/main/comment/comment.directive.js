(function (angular) {

    'use strict';

    angular.module('sharerror')
        .directive('customComments', commentDirective);

    function commentDirective() {
        return {
            scope: {
                commentId: "@"
            },
            restrict: "E",
            templateUrl: "app/main/comment/comment.html",
            controller: 'commentController',
            controllerAs: 'vm'
        }
    }

}(angular));
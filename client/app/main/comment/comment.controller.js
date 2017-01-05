(function (angular) {

    'use strict';

    angular.module('sharerror')
        .controller('commentController', ['$scope', 'commentService', commentController]);

    function commentController($scope, commentService) {
        var vm = this;

        vm.comment = {};

        vm.commentId = $scope.commentId;

        function fetchComment() {
            commentService.findOne(vm.commentId)
                .then(function (response) {
                    vm.comment = response.data;
                })
                .catch(function (response) {
                    console.log(response);
                });
        }
        fetchComment();

        vm.addComment = function () {
            if (vm.commentText) {
                var comment = {text: vm.commentText};
                vm.commentText = "";
                commentService.createComment(vm.commentId, comment)
                    .then(function () {
                        alertify.success('Comment created.');
                        fetchComment();
                    });
            } else {
                alertify.error('Comment can not be empty.');
            }
        };
    }

}(angular));
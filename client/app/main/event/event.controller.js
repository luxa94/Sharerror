(function (angular) {

    'use strict';

    angular.module('sharerror')
        .controller('eventController', ['$scope', '$state', '$mdDialog', '$stateParams', 'eventService', eventController]);

    function eventController($scope, $state, $mdDialog, $stateParams, eventService) {
        var vm = this;

        vm.event = {};

        function fetchEvent() {
            eventService.findOne($stateParams.id)
                .then(function (response) {
                    vm.event = response.data;
                })
                .catch(function (response) {
                    console.log(response);
                });
        }

        fetchEvent();

        vm.addComment = function () {
            if (vm.commentText) {
                var comment = {text: vm.commentText};
                vm.commentText = "";
                eventService.createComment(vm.event._id, comment)
                    .then(function () {
                        alertify.success('Comment created.');
                        fetchEvent();
                    });
            } else {
                alertify.error('Comment can not be empty.');
            }
        }
    }

}(angular));
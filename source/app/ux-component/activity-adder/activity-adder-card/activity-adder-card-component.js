(function () {
    'use strict'

    angular
        .module('otusjs.otus.uxComponent')
        .component('otusActivityAdderCard', {
            templateUrl: 'app/ux-component/activity-adder/activity-adder-card/activity-adder-card-template.html',
            controller: Controller,
            bindings: {
                activityDtos: '='
            }
        });
    //binding = activityDto
    Controller.$inject = [];

    function Controller() {
        var self = this;
    }

})();
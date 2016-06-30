(function() {
    'use strict';

    angular
        .module('otus.dashboard')
        .controller('OtusDashboardMenu', OtusDashboardMenu);

    OtusDashboardMenu.$inject = ['$mdSidenav'];

    function OtusDashboardMenu($mdSidenav) {
        var self = this;
        self.open = open;

        function open() {
            $mdSidenav('left').toggle();
        }

        function openHome() {
            $mdSidenav('left').toggle();
        }
    }

}());

(function() {
    'use strict';

    angular
        .module('otus.dashboard')
        .controller('OtusDashboardToolbar', OtusDashboardToolbar);

    OtusDashboardToolbar.$inject = ['$mdSidenav'];

    function OtusDashboardToolbar($mdSidenav) {
        var self = this;
        self.open = open;

        function open() {
            $mdSidenav('left').toggle();
        }
    }

}());

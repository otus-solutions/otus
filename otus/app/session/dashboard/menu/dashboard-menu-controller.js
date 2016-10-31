(function() {
    'use strict';

    angular
        .module('otusjs.otus.dashboard')
        .controller('OtusDashboardMenu', OtusDashboardMenu);

    OtusDashboardMenu.$inject = ['$mdSidenav', 'LogoutService'];

    function OtusDashboardMenu($mdSidenav, LogoutService) {
        var self = this;
        self.open = open;
        self.logout = logout;

        function open() {
            $mdSidenav('left').toggle();
        }

        function openHome() {
            $mdSidenav('left').toggle();
        }

        function logout(){
            LogoutService.logout();
        }
    }

}());

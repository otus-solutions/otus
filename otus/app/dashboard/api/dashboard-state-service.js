(function() {
    'use strict';

    angular
        .module('otus.dashboard')
        .service('DashboardStateService', DashboardStateService);

    DashboardStateService.$inject = [
        '$location',
        '$http',
        'APP_STATE',
        'OtusRestResourceService'
    ];

    function DashboardStateService($location, $http, APP_STATE, OtusRestResourceService) {
        var self = this;

        var HOSTNAME_REST = 'http://' + window.location.hostname;

        /*Public Interface*/
        self.goToLogin = goToLogin;
        self.goToInstaller = goToInstaller;

        init();

        function init() {
            self.currentState = 'Login';
        }

        function goToLogin() {
            self.currentState = 'Login';
            $location.url(APP_STATE.LOGIN);
        }

        function goToInstaller() {
            self.currentState = 'Instalador do Sistema';
            $location.url(APP_STATE.INSTALLER);
        }
    }
}());

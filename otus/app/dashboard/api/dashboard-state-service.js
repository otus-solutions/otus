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
        self.goToHome = goToHome;
        self.goToSignup = goToSignup;
        self.goToSignupResult = goToSignupResult;

        init();

        function init() {
            self.currentState = 'Login';
        }

        function goToLogin() {
            self.currentState = 'Login';
            $location.url(APP_STATE.LOGIN);
        }

        function goToHome() {
            self.currentState = 'Home';
            $location.url(APP_STATE.HOME);
        }

        function goToInstaller() {
            self.currentState = 'Instalador do Sistema';
            $location.url(APP_STATE.INSTALLER);
        }

        function goToSignup() {
            self.currentState = 'Instalador do Sistema';
            $location.url(APP_STATE.SIGNUP);
        }

        function goToSignupResult() {
            self.currentState = 'Instalador do Sistema';
            $location.url(APP_STATE.SIGNUP_RESULT);
        }
    }
}());

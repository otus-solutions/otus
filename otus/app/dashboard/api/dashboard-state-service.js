(function() {
    'use strict';

    angular
        .module('otus.dashboard')
        .service('DashboardStateService', DashboardStateService);

    DashboardStateService.$inject = [
        '$state',
        '$http',
        'APP_STATE',
        'OtusRestResourceService'
    ];

    function DashboardStateService($state, $http, APP_STATE, OtusRestResourceService) {
        var self = this;

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
            $state.go(APP_STATE.LOGIN);
        }

        function goToHome() {
            self.currentState = 'Home';
            $state.go(APP_STATE.HOME);
        }

        function goToInstaller() {
            self.currentState = 'Instalador do Sistema';
            $state.go(APP_STATE.INSTALLER);
        }

        function goToSignup() {
            self.currentState = 'Instalador do Sistema';
            $state.go(APP_STATE.SIGNUP);
        }

        function goToSignupResult() {
            self.currentState = 'Instalador do Sistema';
            $state.go(APP_STATE.SIGNUP_RESULT);
        }
    }
}());

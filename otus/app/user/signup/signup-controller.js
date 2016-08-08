(function() {
    'use strict';

    angular
        .module('otusjs.otus.singup')
        .controller('SignupController', SignupController);

    SignupController.$inject = [
        '$scope',
        'DashboardStateService',
        'SignupService'
    ];

    function SignupController($scope, DashboardStateService, SignupService) {
        var self = this;

        /* Public methods */
        self.signup = signup;
        self.back = back;
        self.agree = agree;

        function signup(user) {
            self.isWaiting = true;
            SignupService.executeSignup(user).then(function() {
                DashboardStateService.goToSignupResult();
            }, function() {
                $scope.signupForm.email.$setValidity('email', false);
                self.isWaiting = false;
            });
        }

        function back() {
            DashboardStateService.goToLogin();
        }

        function agree() {
            DashboardStateService.goToLogin();
        }
    }

}());

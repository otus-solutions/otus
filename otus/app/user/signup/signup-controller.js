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
        self.resetEmailValidation = resetEmailValidation;

        function signup(user) {
            self.isWaiting = true;
            SignupService.executeSignup(user).then(function() {
                DashboardStateService.goToSignupResult();
            }, function() {
                $scope.signupForm.email.$setValidity('emailInUse', false);
                self.isWaiting = false;
            });
        }

        function resetEmailValidation() {
            $scope.signupForm.email.$setValidity('emailInUse', true);
            $scope.signupForm.$setValidity('emailInUse', true);
        }

        function back() {
            DashboardStateService.goToLogin();
        }

        function agree() {
            DashboardStateService.goToLogin();
        }
    }

}());

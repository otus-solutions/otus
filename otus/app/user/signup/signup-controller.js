(function() {
    'use strict';

    angular
        .module('otusjs.otus.singup')
        .controller('SignupController', SignupController);

    SignupController.$inject = [
        '$scope',
        '$q',
        'DashboardStateService',
        'OtusRestResourceService'
    ];

    function SignupController($scope, $q, DashboardStateService, OtusRestResourceService) {
        var self = this;

        /* Public methods */
        self.signup = signup;
        self.back = back;
        self.agree = agree;

        function signup(user) {
            self.isWaiting = true;
            executeSignup(user).then(function() {
                DashboardStateService.goToSignupResult();
            }, function() {
                self.isWaiting = false;
            });
        }

        function executeSignup(user) {
            var userResource = OtusRestResourceService.getUserResource();
            var deferred = $q.defer();

            userResource.create(user, function(response) {
                if (!response.hasErrors) {
                    deferred.resolve(true);
                } else {
                    $scope.signupForm.email.$setValidity('email', false);
                    deferred.reject(false);
                }
            });

            return deferred.promise;
        }

        function back() {
            DashboardStateService.goToLogin();
        }

        function agree() {
            DashboardStateService.goToLogin();
        }
    }

}());

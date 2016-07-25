(function() {
    'use strict';

    angular
        .module('otusjs.otus.singup')
        .controller('SignupController', SignupController);

    SignupController.$inject = [
        'DashboardStateService',
        'OtusRestResourceService'
    ];

    function SignupController(DashboardStateService, OtusRestResourceService) {
        var self = this;

        /* Public methods */
        self.signup = signup;
        self.back = back;
        self.agree = agree;

        function signup(user) {
            var userResource = OtusRestResourceService.getUserResource();
            userResource.create(user, function(response) {
                DashboardStateService.goToSignupResult();
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

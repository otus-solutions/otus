(function() {
    'use strict';

    angular
        .module('otusjs.otus.singup')
        .controller('SignupController', SignupController);

    SignupController.$inject = [
        'DashboardStateService',
        'otus.client.RestResourceService'
    ];

    function SignupController(DashboardStateService, RestResourceService) {
        var self = this;

        /* Public methods */
        self.signup = signup;
        self.back = back;
        self.agree = agree;

        function signup() {
            var userResource = RestResourceService.getUserResource();
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

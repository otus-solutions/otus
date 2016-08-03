(function() {
    'use strict';

    angular
        .module('otusjs.otus.singup')
        .service('SignupService', DashboardStateService);

    DashboardStateService.$inject = [
        '$q',
        'OtusRestResourceService'
    ];

    function DashboardStateService($q, OtusRestResourceService) {
        var self = this;

        /* Public Interface */
        self.executeSignup = executeSignup;

        function executeSignup(user) {
            var userResource = OtusRestResourceService.getUserResource();
            var deferred = $q.defer();

            userResource.create(user, function(response) {
                if (!response.hasErrors) {
                    deferred.resolve(response);
                } else {
                    deferred.reject(response);
                }
            });

            return deferred.promise;
        }
    }
}());

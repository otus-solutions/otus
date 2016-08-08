(function() {
    'use strict';

    angular
        .module('otus')
        .service('RouteRulesResolver', RouteRulesResolver);

    RouteRulesResolver.$inject = ['$rootScope', '$state', '$q', 'APP_STATE', 'OtusRestResourceService'];

    function RouteRulesResolver($rootScope, $state, $q, APP_STATE, OtusRestResourceService) {
        var self = this;
        self.loggedUser = loggedUser;
        self.alreadyLogged = alreadyLogged;
        self.initialConfiguration = initialConfiguration;
        self.onlyOneConfiguration = onlyOneConfiguration;

        function loggedUser() {
            var deferred = $q.defer();

            if (!OtusRestResourceService.isLogged()) {
                deferred.reject({
                    redirectTo: APP_STATE.LOGIN
                });
            } else {
                deferred.resolve();
            }

            return deferred.promise;
        }

        function alreadyLogged() {
            var deferred = $q.defer();

            if (OtusRestResourceService.isLogged()) {
                deferred.reject({
                    redirectTo: APP_STATE.HOME
                });
            } else {
                deferred.resolve();
            }

            return deferred.promise;
        }

        function initialConfiguration() {
            var deferred = $q.defer();

            var installerResource = OtusRestResourceService.getOtusInstallerResource();
            installerResource.ready(function(response) {
                if (response.data) {
                    deferred.resolve();
                } else {
                    deferred.reject({
                        redirectTo: APP_STATE.INSTALLER
                    });
                }
            });

            return deferred.promise;
        }

        function onlyOneConfiguration() {
            var deferred = $q.defer();

            var installerResource = OtusRestResourceService.getOtusInstallerResource();
            installerResource.ready(function(response) {
                if (response.data) {
                    deferred.reject({
                        redirectTo: APP_STATE.LOGIN
                    });
                } else {
                    deferred.resolve();
                }
            });

            return deferred.promise;
        }

        $rootScope.$on('$stateChangeError', function(evt, to, toParams, from, fromParams, error) {
            evt.preventDefault();
            if (error.redirectTo) {
                $state.go(error.redirectTo);
            } else {
                $state.go('error', {
                    status: error.status
                });
            }
        });
    }

}());

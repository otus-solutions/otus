(function() {
    'use strict';

    angular
        .module('otus.installer')
        .controller('InitialConfigController', InitialConfigController);

    InitialConfigController.$inject = ['DashboardStateService', 'OtusRestResourceService', 'RestResourceService', '$http', '$scope', '$mdToast', '$q', '$mdDialog'];

    function InitialConfigController(DashboardStateService, OtusRestResourceService, RestResourceService, $http, $scope, $mdToast, $q, $mdDialog) {

        var self = this;
        var MESSAGE_CONFIGURATIONS_ERROR = 'Erro ao adicionar novas configurações';
        var MESSAGE_CONNECTION_ERROR = 'Erro ao conectar no domínio.';
        var MESSAGE_SUCCESS = 'Suas configurações foram realizadas com sucesso! Você vai ser redirecionado para a tela de login.';
        var installerResource;
        var domainUrlResource;
        self.register = register;

        init();

        function init() {
            installerResource = OtusRestResourceService.getOtusInstallerResource();
        }

        function register(project) {
            $scope.isLoading = true;
            delete project.userPasswordConfirm;
            _validateEmailService(project).then(function success() {
                _isDomain(project.domainRestUrl).then(function success() {
                    installerResource.config(project, function success(response) {
                        if (response.hasErrors) {
                            showMessage(MESSAGE_CONFIGURATIONS_ERROR);
                        } else {
                            showConfirmationDialog();
                        }
                    }, function err() {
                        showMessage(MESSAGE_CONNECTION);
                    });
                });
            }, function() {
                $scope.isLoading = false;
            });
        }

        function _isDomain(url) {
            RestResourceService.setHostname(url);
            domainUrlResource = RestResourceService.getUrlResource();

            var deferred = $q.defer();
            domainUrlResource.isValidDomain(function success(response) {
                deferred.resolve(true);

            }, function err() {
                $scope.initialConfigForm.urlProject.$setValidity('domainAccess', false);
                deferred.reject(false);
            });

            return deferred.promise;
        }

        function _validateEmailService(systemConf) {
            var deferred = $q.defer();

            installerResource.validation(systemConf, function(response) {
                if (response.data) {
                    _resetValidationEmail();
                    deferred.resolve(true);
                } else {
                    $scope.initialConfigForm.email.$setValidity('email', false);
                    deferred.reject(false);
                }
            });
            return deferred.promise;
        }

        function _resetValidationEmail() {
            $scope.initialConfigForm.email.$setValidity('email', true);
            $scope.initialConfigForm.$setValidity('email', true);
        }

        function _resetValidationDomain() {
            $scope.initialConfigForm.urlProject.$setValidity('domainAccess', true);
            $scope.initialConfigForm.$setValidity('domainAccess', true);
        }

        function showConfirmationDialog() {
            alert = $mdDialog.alert()
                .title('Informação')
                .content(MESSAGE_SUCCESS)
                .ok('ok');

            $mdDialog
                .show(alert)
                .finally(function() {
                    DashboardStateService.goToLogin();
                });
        }

        function showMessage(message) {
            $mdToast.show(
                $mdToast.simple()
                .textContent(message)
            );
        }
    }
})();

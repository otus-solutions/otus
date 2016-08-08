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
            _validateEmailService(project).then(function () {
                _isDomain(project.domain.domainRestUrl).then(function () {
                    installerResource.config(project, function (response) {
                        if (response.hasErrors) {
                            showMessage(MESSAGE_CONFIGURATIONS_ERROR);
                        } else {
                            showConfirmationDialog();
                        }
                    }, function () {
                        showMessage(MESSAGE_CONNECTION_ERROR);
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
            domainUrlResource.isValidDomain(function () {
                deferred.resolve(true);

            }, function () {
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
                    if (response.data.errorType === 'ADM_USER_EMAIL') {
                        $scope.initialConfigForm.email.$setValidity('email', false);
                    }

                    if (response.data.errorType === 'SENDER_EMAIL') {
                        $scope.initialConfigForm.email.$setValidity('emailSenderEmail', false);
                    }
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
            var alert = $mdDialog.alert()
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

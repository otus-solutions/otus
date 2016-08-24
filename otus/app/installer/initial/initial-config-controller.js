(function() {
    'use strict';

    angular
        .module('otus.installer')
        .controller('InitialConfigController', InitialConfigController);

    InitialConfigController.$inject = ['DashboardStateService', 'OtusRestResourceService', 'RestResourceService', '$http', '$scope', '$mdToast', '$q', '$mdDialog'];

    function InitialConfigController(DashboardStateService, OtusRestResourceService, RestResourceService, $http, $scope, $mdToast, $q, $mdDialog) {
        var MESSAGE_CONFIGURATIONS_ERROR = 'Erro ao adicionar novas configurações. Contate a equipe de desenvolvimento';
        var MESSAGE_SUCCESS = 'Suas configurações foram realizadas com sucesso! Você vai ser redirecionado para a tela de login.';
        var installerResource;
        var domainUrlResource;

        var self = this;
        self.register = register;
        self.validateDomain = validateDomain;
        self.resetValidationEmail = resetValidationEmail;
        self.resetValidationDomain = resetValidationDomain;

        init();

        function init() {
            installerResource = OtusRestResourceService.getOtusInstallerResource();
        }

        function register(project) {
            $scope.isLoading = true;
            delete project.userPasswordConfirm;

            installerResource.config(project, function(response) {
                if (response.data) {
                    showConfirmationDialog();
                } else {
                    _showErrorMessage(response);
                }
                $scope.isLoading = false;
            });
        }

        function validateDomain(domainUrl) {
            RestResourceService.setHostname(domainUrl);
            domainUrlResource = RestResourceService.getUrlResource();

            domainUrlResource.isValidDomain(function(response) {
                if (!response.data) {
                    _showDomainComunicationError();
                }
            });
        }

        function _showErrorMessage(response) {
            switch (response.STATUS) {
                case 'CONFLICT':
                    _showAlreadyExistError();
                    break;
                case 'PRECONDITION_FAILED':
                    _showEmailCommunicationError();
                    break;
                default:
                    _showInternalError();
                    break;
            }
        }

        function _showAlreadyExistError() {
            $scope.initialConfigForm.email.$setValidity('email', false);
            $scope.initialConfigForm.$setValidity('email', false);
        }

        function _showEmailCommunicationError() {
            $scope.initialConfigForm.emailSenderEmail.$setValidity('emailService', false);
            $scope.initialConfigForm.$setValidity('emailService', false);
        }

        function _showDomainComunicationError() {
            $scope.initialConfigForm.urlProject.$setValidity('domainAccess', false);
            $scope.initialConfigForm.$setValidity('domainAccess', false);
        }

        function _showInternalError() {
            _showMessage(MESSAGE_CONFIGURATIONS_ERROR);
        }

        function resetValidationEmail() {
            $scope.initialConfigForm.emailSenderEmail.$setValidity('emailService', true);
            $scope.initialConfigForm.$setValidity('emailService', true);
        }

        function resetValidationDomain() {
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

        function _showMessage(message) {
            $mdToast.show(
                $mdToast.simple()
                .textContent(message)
            );
        }
    }
})();

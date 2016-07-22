(function() {
    'use strict';

    angular
        .module('otus.installer')
        .controller('InitialConfigController', InitialConfigController);

    InitialConfigController.$inject = ['DashboardStateService', 'OtusRestResourceService', 'RestResourceService', '$http', '$scope', '$mdToast', '$q', '$mdDialog'];

    function InitialConfigController(DashboardStateService, OtusRestResourceService, RestResourceService, $http, $scope, $mdToast, $q, $mdDialog) {

        var self = this;
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
            console.log(project);

            validateEmailService(project).then(function success() {
                isDomain(project.domainRestUrl).then(function success() {
                    installerResource.config(project, function success(response) {
                        if (response.hasErrors) {
                            showMessage('Erro ao adicionar novas configurações');
                        } else {
                            showConfirmationDialog();
                        }
                    }, function err() {
                        showMessage('Erro ao conectar no domínio.');
                    });
                });
            }, function() {
                $scope.isLoading = false;
            });
        }

        function isDomain(url) {
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

        function validateEmailService(systemConf) {
            var deferred = $q.defer();

            installerResource.validation(systemConf, function(response) {
                if (response.data) {
                    $scope.resetValidationEmail();
                    deferred.resolve(true);
                } else {
                    $scope.initialConfigForm.email.$setValidity('email', false);
                    deferred.reject(false);
                }
            });

            return deferred.promise;
        }

        $scope.resetValidationEmail = function() {
            $scope.initialConfigForm.email.$setValidity('email', true);
            $scope.initialConfigForm.$setValidity('email', true);
        };

        $scope.resetValidationDomain = function() {
            $scope.initialConfigForm.urlProject.$setValidity('domainAccess', true);
            $scope.initialConfigForm.$setValidity('domainAccess', true);
        };

        function showConfirmationDialog() {
            alert = $mdDialog.alert()
                .title('Informação')
                .content('Suas configurações foram realizadas com sucesso! Você vai ser redirecionado para a tela de login.')
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

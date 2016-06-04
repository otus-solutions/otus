(function() {
    'use strict';

    angular
        .module('otus.installer')
        .controller('InitialConfigController', InitialConfigController);

    InitialConfigController.$inject = ['DashboardStateService', 'OtusRestResourceService', '$http', '$scope', '$mdToast'];

    function InitialConfigController(DashboardStateService, OtusRestResourceService, $http, $scope, $mdToast) {

        var self = this;
        var installerResource;
        self.register = register;

        init();

        function init() {
            installerResource = OtusRestResourceService.getOtusInstallerResource();
        }

        function register(project) {
            installerResource.config(project, function(response) {
                if (response.hasErrors) {
                    $mdToast.show(
                        $mdToast.simple()
                        .textContent('Erro ao adicionar novas configurações')
                    );
                }
            });
        }
    }
})();

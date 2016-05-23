(function() {
    'use strict';

    angular
        .module('otus.installer')
        .controller('InitialConfigController', InitialConfigController);

    InitialConfigController.$inject = ['$q', '$scope', '$mdDialog', 'DashboardStateService', 'RestResourceService'];

    function InitialConfigController($q, $scope, $mdDialog, DashboardStateService, RestResourceService) {
        var installerResource;

        //var self = this;
        //self.register = register;

        init();

        function init() {
            installerResource = RestResourceService.getInstallerResource();
        }

        $scope.register = function(project) {
            $scope.isLoading = true;
            //validação do nome do Domain

        }

        function register(project) {
            //post
        }
    }

})();

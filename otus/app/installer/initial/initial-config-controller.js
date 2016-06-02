(function() {
    'use strict';

    angular
        .module('otus.installer')
        .controller('InitialConfigController', InitialConfigController);

    InitialConfigController.$inject = ['DashboardStateService', 'OtusRestResourceService', '$http', '$scope'];

    function InitialConfigController(DashboardStateService, OtusRestResourceService, $http, $scope) {

        var self = this;
        var installerResource;
        self.register = register;

        init();

        function init(){
            installerResource = OtusRestResourceService.getOtusInstallerResource();
        }

        function register(project) {
            $http.get(project.url + '-rest/v01/url')
                .then(function(data) {
                    installerResource.config(project, function(response) {
                    }, function(){
                    });
                }, function(){
                 $scope.initialConfigForm.urlProject.$setValidity('url', false);
                });
        }
    }
})();

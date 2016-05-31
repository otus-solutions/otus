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
            //http://studio-dev.ccem.ufrgs.br/
            $http.get(project.url + '-rest/v01/url')
                .then(function(data) {
                    console.log(data);
                    installerResource.config(project, function(response) {
                        console.log("SUCESSO");
                        //console.log(response);
                    }, function(){
                        console.log("ERRO");
                    });
                }, function(){
                 $scope.initialConfigForm.urlProject.$setValidity('url', false);
                });
        }
    }
})();

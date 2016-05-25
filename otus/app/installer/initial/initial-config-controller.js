(function() {
    'use strict';

    angular
        .module('otus.installer')
        .controller('InitialConfigController', InitialConfigController);

    InitialConfigController.$inject = ['DashboardStateService', 'RestResourceService', '$http', '$scope'];

    function InitialConfigController(DashboardStateService, RestResourceService, $http, $scope) {
        var otusDomainUrlResource;

        var self = this;
        self.register = register;

        function register(project) {
            //http://studio-dev.ccem.ufrgs.br/
            $http.get(project.url + '-rest/v01/url')
                .then(function(data) {
                    console.log(data);
                }, function(){
                    $scope.initialConfigForm.urlProject.$setValidity('url', false);
                });
        }
    }

})();

(function() {
    'use strict';

    angular
        .module('otus')
        .factory('otus.ResponseInterceptor', factory);

    factory.$inject = ['$injector'];

    function factory($injector) {
        var self = this;

        self.responseError = responseError;

        function responseError(response) {
            var dashboard = $injector.get('DashboardStateService');
            // TODO Desabilitado
            //if (response.status === -1) {
                //dashboard.goToErrorOffline();
            //}
            return response;
        }

        return self;
    }

}());

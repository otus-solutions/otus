(function() {
  'use strict';

  angular
    .module('otusjs.otus.configuration.http')
    .factory('otusjs.otus.configuration.http.ResponseInterceptor', Factory);

  Factory.$inject = [
    // 'otusjs.otus.configuration.state.ApplicationStateService'
  ];

  function Factory() {
    var self = this;

    self.responseError = responseError;

    function responseError(response) {
      // TODO Desabilitado
      //if (response.status === -1) {
      //  ApplicationStateService.activateErrorOffline();
      //}
      return response;
    }

    return self;
  }
}());

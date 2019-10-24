(function() {
  'use strict';

  angular
    .module('otusjs.application.http')
    .factory('otusjs.application.http.ResponseInterceptor', Factory);

  Factory.$inject = [
    // 'otusjs.application.state.ApplicationStateService'
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

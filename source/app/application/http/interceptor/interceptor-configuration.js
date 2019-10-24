(function() {
  'use strict';

  angular
    .module('otusjs.application.http')
    .config(Configuration);

  Configuration.$inject = [
    '$httpProvider'
  ]

  function Configuration($httpProvider) {
    // $httpProvider.interceptors.push('otusjs.configuration.http.ResponseInterceptor');
  }
}());

(function() {
  'use strict';

  angular
    .module('otusjs.otus.configuration.http')
    .config(Configuration);

  Configuration.$inject = [
    '$httpProvider'
  ]

  function Configuration($httpProvider) {
    // $httpProvider.interceptors.push('otusjs.otus.configuration.http.ResponseInterceptor');
  }
}());

(function() {
  'use strict';

  angular
    .module('otusjs.deploy')
    .service('otusjs.deploy.TokenRestService', Service);

  Service.$inject = [
    'OtusRestResourceService'
  ];

  function Service(OtusRestResourceService) {
    var self = this;
    var _rest = null;

    /* Public methods */
    self.initialize = initialize;
    self.getExtractionToken = getExtractionToken;

    function initialize() {
      _rest = OtusRestResourceService.getExtractionResource();
    }

    function getExtractionToken() {
      if (!_rest) {
        throw new Error('REST resource is not initialized.');
      }
      return _rest.extractionToken();


    }
  }
}());

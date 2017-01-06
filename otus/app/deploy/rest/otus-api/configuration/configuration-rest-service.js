(function() {
  'use strict';

  angular
    .module('otusjs.deploy')
    .service('otusjs.deploy.ProjectConfigurationRestService', Service);

  Service.$inject = [
    'OtusRestResourceService'
  ];

  function Service(OtusRestResourceService) {
    var self = this;
    var _rest = null;

    /* Public methods */
    self.initialize = initialize;
    self.getSurveys = getSurveys;

    function initialize() {
      _rest = OtusRestResourceService.getProjectConfigurationResource();
    }

    function getSurveys() {
      if (!_rest) {
        throw new Error('REST resource is not initialized.');
      }
      return _rest.getSurveys().$promise;
    }
  }
}());

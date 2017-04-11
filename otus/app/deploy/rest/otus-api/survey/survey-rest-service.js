(function() {
  'use strict';

  angular
    .module('otusjs.deploy')
    .service('otusjs.deploy.SurveyRestService', Service);

  Service.$inject = [
    'OtusRestResourceService'
  ];

  function Service(OtusRestResourceService) {
    var self = this;
    var _rest = null;

    /* Public methods */
    self.initialize = initialize;

    function initialize() {
      _rest = OtusRestResourceService.getSurveyResource();
    }
  }
}());

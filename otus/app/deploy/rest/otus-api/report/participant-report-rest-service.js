(function () {
  'use strict';

  angular
    .module('otusjs.deploy')
    .service('otusjs.deploy.ParticipantReportRestService', Service);

  Service.$inject = [
    'OtusRestResourceService'
  ];

  function Service(OtusRestResourceService) {
    var self = this;
    var _rest = null;

    /* Public methods */
    self.initialize = initialize;
    self.getAvailableReports = getAvailableReports;

    function initialize() {
      // _rest = OtusRestResourceService.getExamLotResource();

    }

    function getAvailableReports(center) {
      if (!_rest) {
        throw new Error('REST resource is not initialized.');
      }
      return _rest.getAvailableReports({center: center}).$promise;
    }
  }
}());

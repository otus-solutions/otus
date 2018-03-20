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
    self.list = list;
    self.getReport = getReport;

    function initialize() {
      _rest = OtusRestResourceService.getReportResourceFactory();
    }

    function list(rn) {
      console.log('list');
      if (!_rest) {
        throw new Error('REST resource is not initialized.');
      }
      return _rest.listAll({rn:rn}).$promise;
    }

    //returns full participant report
    function getReport(rn, id){
      if (!_rest) {
        throw new Error('REST resource is not initialized.');
      }
      return _rest.getById({rn:rn, id: id}).$promise;
    }
  }
}());

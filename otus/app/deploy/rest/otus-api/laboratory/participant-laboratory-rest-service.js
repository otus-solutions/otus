(function() {
  'use strict';

  angular
    .module('otusjs.deploy')
    .service('otusjs.deploy.ParticipantLaboratoryRestService', Service);

  Service.$inject = [
    'OtusRestResourceService'
  ];

  function Service(OtusRestResourceService) {
    var self = this;
    var _rest = null;

    /* Public methods */
    self.initialize = initialize;
    self.create = create;
    self.initializeLaboratory = initializeLaboratory;
    self.getLaboratory = getLaboratory;

    function initialize() {
      _rest = OtusRestResourceService.getLaboratoryParticipantResource();
    }

    function create() {
      _rest.create();
    }

    function initializeLaboratory(recruitmentNumber) {
      if (!_rest) {
        throw new Error('REST resource is no initialized.');
      }
      return _rest.initialize({
        rn: recruitmentNumber
      }).$promise;
    }

    function getLaboratory(recruitmentNumber) {
      if (!_rest) {
        throw new Error('REST resource is no initialized.');
      }
      return _rest.getLaboratory({
        rn: recruitmentNumber
      }).$promise;
    }
  }
}());

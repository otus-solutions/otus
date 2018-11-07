(function () {
  'use strict';

  angular
    .module('otusjs.deploy')
    .service('otusjs.deploy.ParticipantMonitoringRestService', Service);

  Service.$inject = [
    'OtusRestResourceService'
  ];

  function Service(OtusRestResourceService) {
    var self = this;
    var _rest = null;

    /* Public methods */
    self.initialize = initialize;
    self.getStatusOfActivities = getStatusOfActivities;
    self.updateObservation = updateObservation;

    function initialize() {
      _rest = OtusRestResourceService.getParticipantMonitoringResource();
    }

    function getStatusOfActivities(recruitmentNumber) {
      if (!_rest) {
        throw new Error('REST resource is no initialized.');
      }
      return _participantRest.getStatusOfActivities({
        rn: recruitmentNumber
      }).$promise;
    }

    function updateObservation(data) {
      if (!_rest) {
        throw new Error('REST resource is not initialized.');
      }
      return _rest.updateObservation({}, data).$promise;
    }
  }
}());

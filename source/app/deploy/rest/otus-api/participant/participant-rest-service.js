(function () {
  'use strict';

  angular
    .module('otusjs.deploy')
    .service('otusjs.deploy.ParticipantRestService', Service);

  Service.$inject = [
    'OtusRestResourceService'
  ];

  function Service(OtusRestResourceService) {
    var self = this;
    var _rest, _followUpRest = null;

    /* Public methods */
    self.initialize = initialize;
    self.list = list;
    self.create = create;
    self.getByRecruitmentNumber = getByRecruitmentNumber;
    self.getFollowUps = getFollowUps;
    self.activateFollowUpEvent = activateFollowUpEvent;
    self.deactivateFollowUpEvent = deactivateFollowUpEvent;

    function initialize() {
      _rest = OtusRestResourceService.getParticipantResource();
      _followUpRest = OtusRestResourceService.getFollowUpResourceFactory();
    }

    function getByRecruitmentNumber(rn) {
      if (!_rest) {
        throw new Error('REST resource is not initialized.');
      }
      return _rest.getByRecruitmentNumber({rn}).$promise;
    }

    function list() {
      if (!_rest) {
        throw new Error('REST resource is not initialized.');
      }
      return _rest.list().$promise;
    }

    function create(participant) {
      if (!_rest) {
        throw new Error('REST resource is not initialized.');
      }
      return _rest.create({}, participant).$promise;
    }

    function getFollowUps(recruitmentNumber) {
      if (!_rest) {
        throw new Error('REST resource is not initialized.');
      }
      return _followUpRest.listParticipantsFollowUps({rn: recruitmentNumber}).$promise;
    }

    function activateFollowUpEvent(recruitmentNumber, event) {
      return _followUpRest.activateFollowUpEvent({
        rn: recruitmentNumber
      }, event).$promise;
    }

    function deactivateFollowUpEvent(followUpId) {
      return _followUpRest.deactivateFollowUpEvent({
        followUpId: followUpId
      }).$promise;
    }
  }
}());

(function () {
  'use strict';

  angular
    .module('otusjs.participant.repository')
    .service('otusjs.participant.repository.ParticipantRepositoryService', Service);

  Service.$inject = [
    'otusjs.participant.core.ModuleService'
  ];

  function Service(ModuleService) {
    var self = this;
    let _remoteDataSource = ModuleService.getParticipantContactRemoteStorage();

    /* Public methods */
    self.listIdexers = listIdexers;
    self.create = create;
    self.update = update;
    self.getAllowNewParticipants = getAllowNewParticipants;
    self.getFollowUps = getFollowUps;
    self.activateFollowUpEvent = activateFollowUpEvent;
    self.deactivateFollowUpEvent = deactivateFollowUpEvent;
    self.createParticipantContact = createPaticipantContact;
    self.getParticipantContact = getParticipantContact;
    self.getByRecruitmentNumberPaticipantContact = getByRecruitmentNumberPaticipantContact;
    self.updateMainContact = updateMainContact;
    self.addSecondaryContact = addSecondaryContact;
    self.updateSecondaryContact = updateMainContact;
    self.swapMainContactWithSecondary = swapMainContactWithSecondary;
    self.deleteParticipantContact = deleteParticipantContact;
    self.deleteSecondaryContact = deleteSecondaryContact;

    function create(participant) {
      var _dataSource = ModuleService.DataSource.Participant;
      if (_dataSource) {
        return _dataSource.create(participant);
      }
    }

    function update(participant) {
      var _dataSource = ModuleService.DataSource.Participant;
      if (_dataSource) {
        return _dataSource.update(participant);
      }
    }

    function getFollowUps(recruitmentNumber) {
      var _dataSource = ModuleService.DataSource.Participant;
      if (_dataSource) {
        return _dataSource.getFollowUps(recruitmentNumber);
      }
    }

    function activateFollowUpEvent(recruitmentNumber, event) {
      var _dataSource = ModuleService.DataSource.Participant;
      if (_dataSource) {
        return _dataSource.activateFollowUpEvent(recruitmentNumber, event);
      }
    }

    function deactivateFollowUpEvent(followUpId) {
      var _dataSource = ModuleService.DataSource.Participant;
      if (_dataSource) {
        return _dataSource.deactivateFollowUpEvent(followUpId);
      }
    }

    function getAllowNewParticipants() {
      var _dataSource = ModuleService.DataSource.Participant;
      if (_dataSource) {
        return _dataSource.getAllowNewParticipants();
      }
    }

    function listIdexers() {
      var _dataSource = ModuleService.DataSource.Participant;
      if (_dataSource) {
        return _dataSource.listIndexers();
      }
    }

    function createPaticipantContact(partcipantContact) {
      return _remoteDataSource.whenReady()
        .then(remoteDataSource => remoteDataSource.createParticipantContact(partcipantContact.toJSON()))
        .then(response => response.data);
    }

    function getParticipantContact(id) {
      return _remoteDataSource.whenReady()
        .then(remoteDataSource => remoteDataSource.getParticipantContact(id))
        .then(response => response.data);
    }

    function getByRecruitmentNumberPaticipantContact(rn) {
      return _remoteDataSource.whenReady()
        .then(remoteDataSource => remoteDataSource.getByRecruitmentNumberPaticipantContact(rn))
        .then(response => response.data);
    }

    function updateMainContact(partcipantContact) {
      return _remoteDataSource.whenReady()
        .then(remoteDataSource => remoteDataSource.updateMainContact(partcipantContact.toJSON()))
        .then(response => response.data);
    }

    function addSecondaryContact(partcipantContact) {
      return _remoteDataSource.whenReady()
        .then(remoteDataSource => remoteDataSource.addSecondaryContact(partcipantContact.toJSON()))
        .then(response => response.data);
    }

    function updateSecondaryContact(partcipantContact) {
      return _remoteDataSource.whenReady()
        .then(remoteDataSource => remoteDataSource.updateSecondaryContact(partcipantContact.toJSON()))
        .then(response => response.data);
    }

    function swapMainContactWithSecondary(partcipantContact) {
      return _remoteDataSource.whenReady()
        .then(remoteDataSource => remoteDataSource.swapMainContactWithSecondary(partcipantContact.toJSON()))
        .then(response => response.data);
    }

    function deleteParticipantContact(id) {
      return _remoteDataSource.whenReady()
        .then(remoteDataSource => remoteDataSource.deleteParticipantContact(id))
        .then(response => response.data);
    }

    function deleteSecondaryContact(id) {
      return _remoteDataSource.whenReady()
        .then(remoteDataSource => remoteDataSource.deleteSecondaryContact(id))
        .then(response => response.data);
    }
  }
}());

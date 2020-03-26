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
    self.createParticipantContact = createParticipantContact;
    self.getParticipantContact = getParticipantContact;
    self.getParticipantContactByRecruitmentNumber = getParticipantContactByRecruitmentNumber;
    self.addNonMainEmail = addNonMainEmail;
    self.addNonMainAddress = addNonMainAddress;
    self.addNonMainPhoneNumber = addNonMainPhoneNumber;
    self.updateEmail = updateEmail;
    self.updateAddress = updateAddress;
    self.updatePhoneNumber = updatePhoneNumber;
    self.swapMainContact = swapMainContact;
    self.deleteParticipantContact = deleteParticipantContact;
    self.deleteNonMainContact = deleteNonMainContact;

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

    function createParticipantContact(participantContact) {
      return _remoteDataSource.whenReady()
        .then(remoteDataSource => remoteDataSource.createParticipantContact(participantContact.toJSON()))
        .then(response => response.data);
    }

    function getParticipantContact(id) {
      return _remoteDataSource.whenReady()
        .then(remoteDataSource => remoteDataSource.getParticipantContact(id))
        .then(response => response.data);
    }

    function getParticipantContactByRecruitmentNumber(rn) {
      return _remoteDataSource.whenReady()
        .then(remoteDataSource => remoteDataSource.getParticipantContactByRecruitmentNumber(rn))
        .then(response => response.data);
    }

    function addNonMainEmail(newContactDto) {
      return _remoteDataSource.whenReady()
        .then(remoteDataSource => remoteDataSource.addNonMainEmail(newContactDto))
        .then(response => response.data);
    }

    function addNonMainAddress(newContactDto) {
      return _remoteDataSource.whenReady()
        .then(remoteDataSource => remoteDataSource.addNonMainAddress(newContactDto))
        .then(response => response.data);
    }

    function addNonMainPhoneNumber(newContactDto) {
      return _remoteDataSource.whenReady()
        .then(remoteDataSource => remoteDataSource.addNonMainPhoneNumber(newContactDto))
        .then(response => response.data);
    }

    function updateEmail(updateContactDto) {
      return _remoteDataSource.whenReady()
        .then(remoteDataSource => remoteDataSource.updateEmail(updateContactDto))
        .then(response => response.data);
    }

    function updateAddress(updateContactDto) {
      return _remoteDataSource.whenReady()
        .then(remoteDataSource => remoteDataSource.updateAddress(updateContactDto))
        .then(response => response.data);
    }

    function updatePhoneNumber(updateContactDto) {
      return _remoteDataSource.whenReady()
        .then(remoteDataSource => remoteDataSource.updatePhoneNumber(updateContactDto))
        .then(response => response.data);
    }

    function swapMainContact(participantContact) {
      return _remoteDataSource.whenReady()
        .then(remoteDataSource => remoteDataSource.swapMainContact(participantContact.toJSON()))
        .then(response => response.data);
    }

    function deleteParticipantContact(id) {
      return _remoteDataSource.whenReady()
        .then(remoteDataSource => remoteDataSource.deleteParticipantContact(id))
        .then(response => response.data);
    }

    function deleteNonMainContact(participantContact) {
      return _remoteDataSource.whenReady()
        .then(remoteDataSource => remoteDataSource.deleteNonMainContact(participantContact))
        .then(response => response.data);
    }
  }
}());

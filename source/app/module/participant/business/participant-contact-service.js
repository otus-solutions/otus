(function() {
  'use strict';

  angular
    .module('otusjs.participant.business')
    .service('otusjs.participant.business.ParticipantContactService', Service);

  Service.$inject = [
    'otusjs.participant.repository.ParticipantContactRepositoryService'
  ];

  function Service(ParticipantContactRepositoryService) {
    const self = this;

    self.createParticipantContact = createPaticipantContact;
    self.getParticipantContactList = getParticipantContactList;
    self.getParticipantContact = getParticipantContact;
    self.getByRecruitmentNumber = getByRecruitmentNumber;
    self.updateMainContact = updateMainContact;
    self.addSecondaryContact = addSecondaryContact;
    self.updateSecondaryContact = updateMainContact;
    self.swapMainContactWithSecondary = swapMainContactWithSecondary;
    self.deleteParticipantContact = deleteParticipantContact;

    function createPaticipantContact() {

    }

    function getParticipantContactList() {

    }

    function getParticipantContact() {

    }

    function getByRecruitmentNumber() {

    }

    function updateMainContact() {

    }

    function addSecondaryContact() {

    }

    function updateSecondaryContact() {

    }

    function swapMainContactWithSecondary() {

    }

    function deleteParticipantContact() {

    }

  }
});
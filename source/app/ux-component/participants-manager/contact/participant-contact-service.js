(function () {
  'use strict';

  angular.module('otusjs.otus.uxComponent')
    .service('otusjs.participantManager.contact.ParticipantContactService', Service);

  Service.$inject = [
    '$http',
    'otusjs.model.participantContact.ParticipantContactFactory',
    'otusjs.participant.business.ParticipantManagerService',
    '$mdToast'

  ];

  function Service($http, ParticipantContactFactory, ParticipantManagerService,$mdToast ) {
    const self = this;
    const MessageError = 'Model factory is not initialized.';

    self.createParticipantContact = createParticipantContact;
    self.getParticipantContact = getParticipantContact;
    self.getParticipantContactByRecruitmentNumber = getParticipantContactByRecruitmentNumber;
    // self.addNonMainEmail = addNonMainEmail;
    // self.addNonMainAddress = addNonMainAddress;
    // self.addNonMainPhoneNumber = addNonMainPhoneNumber;
    self.swapMainContact = swapMainContact;
    self.deleteParticipantContact = deleteParticipantContact;
    self.deleteNonMainContact = deleteNonMainContact;
    self.participantContactFactoryJson = participantContactFactoryJson;
    self.participantContactFactoryCreate = participantContactFactoryCreate;
    self.getAddressByCep = getAddressByCep;
    self.createContactDto = createContactDto;
    self.dinamicUpdateContact = dinamicUpdateContact;
    self.callMsgbyToast = callMsgbyToast;
    self.dinamicNewContactCreate = dinamicNewContactCreate;

    function createParticipantContact(participantContact) {
      return ParticipantManagerService.createParticipantContact(participantContact);
    }

    function getParticipantContact(id) {
      return ParticipantManagerService.getParticipantContact(id);
    }

    function getParticipantContactByRecruitmentNumber(recruitmentNumber) {
      return ParticipantManagerService.getParticipantContactByRecruitmentNumber(recruitmentNumber);
    }

    // function addNonMainEmail(participantContact) {
    //   return ParticipantManagerService.addNonMainEmail(participantContact);
    // }

    // function addNonMainAddress(participantContact) {
    //   return ParticipantManagerService.addNonMainAddress(participantContact);
    // }
    //
    // function addNonMainPhoneNumber(participantContact) {
    //   return ParticipantManagerService.addNonMainPhoneNumber(participantContact);
    // }


    function swapMainContact(participantContact) {
      return ParticipantManagerService.swapMainContact(participantContact);
    }

    function deleteParticipantContact(id) {
      return ParticipantManagerService.deleteParticipantContact(id);
    }

    function deleteNonMainContact(participantContact) {
      return ParticipantManagerService.deleteNonMainContact(participantContact);
    }

    function participantContactFactoryCreate(participantContact) {
      try {
        return ParticipantContactFactory.create(participantContact)
      } catch (e) {
        throw new Error(MessageError);
      }
    }

    function participantContactFactoryJson(participantContact) {
      try {
        return ParticipantContactFactory.fromJson(participantContact);
      } catch (e) {
        throw new Error(MessageError);
      }
    }

    function getAddressByCep(cep) {
      let formatedCep = cep.replace(/\D/g, '');
      let viaCepUrl = `https://viacep.com.br/ws/${formatedCep}/json/`;
      return $http.get(viaCepUrl);
    }

    function createContactDto(contactId, position, contactItem) {
      return {
        "_id": contactId,
        "position": position,
        "contactItem": contactItem
      }
    }

    function dinamicUpdateContact(updateContactDto, type) {
      switch (type) {
        case "phoneNumber":
          return ParticipantManagerService.updatePhoneNumber(updateContactDto);
          break;

        case "email":
          return ParticipantManagerService.updateEmail(updateContactDto);
          break;

        case "address":
          return ParticipantManagerService.updateAddress(updateContactDto);
          break;
      }
    }


    function dinamicNewContactCreate(newContactDto, type) {
      switch (type) {
        case "phoneNumber":
          return ParticipantManagerService.addNonMainPhoneNumber(newContactDto);
          break;

        case "email":
          return ParticipantManagerService.addNonMainEmail(newContactDto);
          break;

        case "address":
          return ParticipantManagerService.addNonMainAddress(newContactDto);
          break;
      }
    }

    function callMsgbyToast(msg) {
      $mdToast.show($mdToast.simple()
        .position('bottom left')
        .textContent(msg)
        .hideDelay(4000));
    }
  }
}());

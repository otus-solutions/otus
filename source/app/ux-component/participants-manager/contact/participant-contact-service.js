(function () {
  'use strict';

  angular.module('otusjs.otus.uxComponent')
    .service('otusjs.participantManager.contact.ParticipantContactService', Service);

  Service.$inject = [
    '$http',
    'otusjs.model.participantContact.ParticipantContactFactory',
    'otusjs.participant.business.ParticipantManagerService',
    'otusjs.application.dialog.DialogShowService',
    'ParticipantContactValues',
    '$mdDialog'

  ];

  function Service($http, ParticipantContactFactory, ParticipantManagerService, DialogShowService, ParticipantContactValues, $mdDialog ) {
    const self = this;
    const MessageError = 'Model factory is not initialized.';

    self.createParticipantContact = createParticipantContact;
    self.getParticipantContact = getParticipantContact;
    self.getParticipantContactByRecruitmentNumber = getParticipantContactByRecruitmentNumber;
    self.swapMainContact = swapMainContact;
    self.deleteParticipantContact = deleteParticipantContact;
    self.deleteNonMainContact = deleteNonMainContact;
    self.participantContactFactoryJson = participantContactFactoryJson;
    self.participantContactFactoryCreate = participantContactFactoryCreate;
    self.getAddressByCep = getAddressByCep;
    self.createContactDto = createContactDto;
    self.dinamicUpdateContact = dinamicUpdateContact;
    self.dinamicNewContactCreate = dinamicNewContactCreate;
    self.createDeleteContactDto = createDeleteContactDto;
    self.showDeleteDialog = showDeleteDialog;

    function createParticipantContact(participantContact) {
      return ParticipantManagerService.createParticipantContact(participantContact);
    }

    function getParticipantContact(id) {
      return ParticipantManagerService.getParticipantContact(id);
    }

    function getParticipantContactByRecruitmentNumber(recruitmentNumber) {
      return ParticipantManagerService.getParticipantContactByRecruitmentNumber(recruitmentNumber);
    }

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

    function deleteNonMainContact(deleteContactDto){
        return ParticipantManagerService.deleteNonMainContact(deleteContactDto);
    }

    function createDeleteContactDto(contactId, type, position) {
      return {
        "_id": contactId,
        "type": type,
        "position": position
      }
    }

    function showDeleteDialog() {
      let _deleteDialog = {
        dialogToTitle: ParticipantContactValues.msg.delete,
        titleToText: ParticipantContactValues.msg.massegeTextDelete,
        textDialog: ParticipantContactValues.msg.massegeDialogDelete,
        ariaLabel: ParticipantContactValues.msg.contactDelete,
        buttons: [
          {
            message: ParticipantContactValues.msg.yes,
            action:function(){$mdDialog.hide()},
            class:'md-raised md-primary'
          },
          {
            message: ParticipantContactValues.msg.not,
            action:function(){$mdDialog.cancel()},
            class:'md-raised md-no-focus'
          }
        ]
      };

      return DialogShowService.showDialog(_deleteDialog);

    }

  }
}());

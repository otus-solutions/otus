(function () {
  'use strict';

  angular.module('otusjs.otus.uxComponent')
    .component('otusParticipantUpdateContact', {
      controller: 'participantUpdateContactCtrl as $ctrl',
      templateUrl: 'app/ux-component/participants-manager/contact/participant-update-contact/participant-update-contact-template.html',
      bindings: {
        contact: '=',
        contactId: '@',
        type: '@',
        loadParticipantContact: '&'
      }
    }).controller('participantUpdateContactCtrl', Controller);

  Controller.$inject = [
    'ParticipantContactValues',
    'otusjs.participantManager.contact.ParticipantContactService',
    'otusjs.participant.business.ParticipantMessagesService'
  ];

  function Controller(ParticipantContactValues, ParticipantContactService, ParticipantMessagesService) {
    const self = this;

    self.addContactInput = addContactInput;
    self.enableEditMode = enableEditMode;
    self.updateContact = updateContact;
    self.restoreContact = restoreContact;
    self.findAddressByCep = findAddressByCep;
    self.createNewContact = createNewContact;
    self.deleteNonMainContact = deleteNonMainContact;
    self.enableSwapMainContactMode = enableSwapMainContactMode;
    self.swapMainContact = swapMainContact;
    self.confirmedDisabled = confirmedDisabled;

    /* Lifecycle hooks */
    self.$onInit = onInit;

    /* Public methods */
    function onInit() {
      self.ParticipantContactValues = ParticipantContactValues;
      self.editMode = {};
      self.newContactMode = {};
      self.form = {};
      self.backupContact = {};
      self.swapMainContactMode = {};
    }

 function confirmedDisabled(key) {
      if(self.editMode[key]){
        if(!self.form.address[key].postalCode.$modelValue){
          return true;
        } else {
          return false;
        }
      } else {
        return true;
      }
    }

    function addContactInput() {
      for (let key in self.contact) {
        if (self.contact[key] === null) {
          self.editMode[key] = true;
          self.newContactMode[key] = true;
          self.contact[key] = {value: {}};
          break;
        }
      }
    }

    function enableEditMode(position) {
      self.backupContact[position] = angular.copy(self.contact[position]);
      self.editMode[position] = true;
    }

    function restoreContact(position) {
      self.contact[position] = angular.copy(self.backupContact[position]);
      self.editMode[position] = false;
      delete self.backupContact[position];
    }

    function updateContact(updatedContactItem, position, type) {
      let updateContactDto = ParticipantContactService.createContactDto(self.contactId, position, updatedContactItem);
      ParticipantContactService.dinamicUpdateContact(updateContactDto, type)
        .then(self.editMode[position] = false)
        .then(() => ParticipantMessagesService.showToast(ParticipantContactValues.msg.updateSuccess))
        .then(self.loadParticipantContact())
    }


    function findAddressByCep(addressContact) {
      ParticipantContactService.getAddressByCep(addressContact.value.postalCode)
        .then(address => {
          addressContact.value = {
            postalCode: address.data.cep,
            street: address.data.logradouro,
            neighbourhood: address.data.bairro,
            city: address.data.localidade,
            state: address.data.uf,
            country: ParticipantContactValues.msg.country
          }
        }).catch((e) => ParticipantMessagesService.showToast(ParticipantContactValues.msg.postalCodeNotFound));
    }

    function createNewContact(newContactItem, position, type) {
      let newContactDto = ParticipantContactService.createContactDto(self.contactId, position, newContactItem);

      ParticipantContactService.dinamicNewContactCreate(newContactDto, type)
        .then(self.editMode[position] = false)
        .then(self.newContactMode[position] = false)
        .then(() => ParticipantMessagesService.showToast(ParticipantContactValues.msg.createSuccess))
        .then(() => self.loadParticipantContact());
    }

    function deleteNonMainContact(type, position) {
      let deleteContactDto = ParticipantContactService.createPositionContactDto(self.contactId, type, position);
      if (deleteContactDto.position !== "main") {
        ParticipantContactService.showDeleteDialog()
          .then(() => {
            ParticipantContactService.deleteNonMainContact(deleteContactDto)
              .then(self.contact[position] = null)
              .then(self.loadParticipantContact())
              .then(() => ParticipantMessagesService.showToast(ParticipantContactValues.msg.contactDelete))
              .catch(() => ParticipantMessagesService.showToast(ParticipantContactValues.msg.contactFail))
          })
      }
    }

    function enableSwapMainContactMode(type) {
      self.swapMainContactMode[type] = true;
    }

    function swapMainContact(type, position) {
      let swapMainContactDto = ParticipantContactService.createPositionContactDto(self.contactId, type, position);
      ParticipantContactService.swapMainContact(swapMainContactDto)
        .then(self.loadParticipantContact())
        .then(self.swapMainContactMode[type] = false)
        .then(() => ParticipantMessagesService.showToast(ParticipantContactValues.msg.swapMainContactSucess))
        .catch(() => ParticipantMessagesService.showToast(ParticipantContactValues.msg.swapMainContactFail))
    }

  }
}());

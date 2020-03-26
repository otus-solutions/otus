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
    '$mdToast'
  ];

  function Controller(ParticipantContactValues, ParticipantContactService, $mdToast) {
    const self = this;

    self.addContactInput = addContactInput;
    self.enableEditMode = enableEditMode;
    self.updateContact = updateContact;
    self.restoreContact = restoreContact;
    self.findAddressByCep = findAddressByCep;

    /* Lifecycle hooks */
    self.$onInit = onInit;

    /* Public methods */
    function onInit() {
      self.ParticipantContactValues = ParticipantContactValues;
      self.editMode = {};
      self.form = {};
      self.editableContact = angular.copy(self.contact);
    }

    function addContactInput() {
      for (let key in self.editableContact) {
        if (self.editableContact[key] === null) {
          self.editableContact[key] = {value: {}};
          break;
        }
      }
    }

    function enableEditMode(type) {
      self.editMode[type] = true;
    }

    function updateContact(updatedContactItem, position, type) {
      let updateContactDto = ParticipantContactService.createUpdateContactDto(self.contactId, position, updatedContactItem);

      ParticipantContactService.dinamicUpdateContact(updateContactDto, type)
        .then(self.editMode[position] = false)
        .then(() => ParticipantContactService.callMsgbyToast(ParticipantContactValues.msg.updateSuccess))
        .then(self.loadParticipantContact())
    }

    function restoreContact(position) {
      self.editableContact = angular.copy(self.contact);
      self.editMode[position] = false;
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
        }).catch(() => ParticipantContactService.callMsgbyToast(ParticipantContactValues.msg.postalCodeNotFound));
    }

  }
}());
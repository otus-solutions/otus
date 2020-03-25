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
      let updateContactDto = {
        "_id": self.contactId,
        "position": position,
        "contactItem": updatedContactItem
      };
      console.log(updateContactDto)

      _simulateParticipantContactServiceDinamicUpdateContact(updateContactDto, type)
        .then(self.editMode[position] = false)
        .then(() => _callMsgbyToast(ParticipantContactValues.msg.updateSuccess))
        .then(self.loadParticipantContact())
    }

    function _simulateParticipantContactServiceDinamicUpdateContact(updateContactDto, type){
      switch (type) {
        case "phoneNumber":
          return ParticipantContactService.updatePhoneNumber(updateContactDto);
          break;

        case "email":
          return ParticipantContactService.updateEmail(updateContactDto);
          break;
      }
    }

    function restoreContact(position) {
      //self.editableContact = angular.copy(self.contact);
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
        }).catch(() => _callMsgbyToast(ParticipantContactValues.msg.postalCodeNotFound));
    }

    function _callMsgbyToast(msg) {
      $mdToast.show($mdToast.simple()
        .position('bottom left')
        .textContent(msg)
        .hideDelay(4000));
    }
  }
}());
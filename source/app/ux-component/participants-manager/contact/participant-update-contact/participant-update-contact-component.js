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
    '$mdDialog',
    'ParticipantContactValues',
    'otusjs.participantManager.contact.ParticipantContactService',
    'otusjs.participant.business.ParticipantMessagesService',
    'otusjs.application.dialog.DialogShowService'
  ];

  function Controller($mdDialog, ParticipantContactValues, ParticipantContactService, ParticipantMessagesService, DialogShowService) {
    const self = this;

    self.addContactInput = addContactInput;
    self.enableEditMode = enableEditMode;
    self.updateContact = updateContact;
    self.restoreContact = restoreContact;
    self.findAddressByCep = findAddressByCep;
    self.createNewContact = createNewContact;
    self.deleteParticipantContact = deleteParticipantContact;

    /* Lifecycle hooks */
    self.$onInit = onInit;

    /* Public methods */
    function onInit() {
      self.ParticipantContactValues = ParticipantContactValues;
      self.editMode = {};
      self.newContactMode = {};
      self.form = {};
      self.editableContact = angular.copy(self.contact);
    }

    function addContactInput() {
      for (let key in self.editableContact) {
        if (self.editableContact[key] === null) {
          self.editMode[key] = true;
          self.newContactMode[key] = true;
          self.editableContact[key] = {value: {}};
          break;
        }
      }
    }

    function enableEditMode(type) {
      self.editMode[type] = true;
    }

    function updateContact(updatedContactItem, position, type) {
      let updateContactDto = ParticipantContactService.createContactDto(self.contactId, position, updatedContactItem);

      ParticipantContactService.dinamicUpdateContact(updateContactDto, type)
        .then(self.editMode[position] = false)
        .then(() => ParticipantMessagesService.showToast(ParticipantContactValues.msg.updateSuccess))
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
        }).catch(() => ParticipantMessagesService.showToast(ParticipantContactValues.msg.postalCodeNotFound));
    }

    function createNewContact(newContactItem, position, type){
      let newContactDto = ParticipantContactService.createContactDto(self.contactId, position, newContactItem);

      ParticipantContactService.dinamicNewContactCreate(newContactDto, type)
        .then(self.editMode[position] = false)
        .then(self.newContactMode[position] = false)
        .then(() => ParticipantMessagesService.showToast(ParticipantContactValues.msg.createSuccess))
        .then(self.loadParticipantContact());
    }

    function _showDeleteDialog() {

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

    function deleteParticipantContact() {
      _showDeleteDialog()
      .then(() =>
        ParticipantContactService.deleteParticipantContact(self.contactId)
        .then(self.loadParticipantContact())
        .then(() => {
          ParticipantMessagesService.showToast(ParticipantContactValues.msg.contactDelete);
        })
        .catch(() => {
          ParticipantMessagesService.showToast(ParticipantContactValues.msg.contactFail);
        })
      )
    }
  }
}());
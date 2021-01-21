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
        permissions: '=',
        loadParticipantContact: '&'
      }
    }).controller('participantUpdateContactCtrl', Controller);

  Controller.$inject = [
    '$mdDialog',
    'ParticipantContactValues',
    'otusjs.participantManager.contact.ParticipantContactService',
    'otusjs.participant.business.ParticipantMessagesService',
    'otusjs.participant.repository.ParticipantContactAttemptService',
    'otusjs.application.dialog.DialogShowService'
  ];

  function Controller($mdDialog, ParticipantContactValues, ParticipantContactService, ParticipantMessagesService, ParticipantContactAttemptService, DialogShowService) {
    const self = this;

    self.dialogData = {
      dialogToTitle: "Alterar ou corrigir endereço?",
      titleToText: "Alterar ou corrigir endereço?",
      textDialog: "Alterar ou corrigir endereço?",
      ariaLabel: "Alterar ou corrigir endereço?",
      buttons: _getDialogButtons(),
      cancel: $mdDialog.cancel()
    }

    self.addContactInput = addContactInput;
    self.enableEditMode = enableEditMode;
    self.updateContact = updateContact;
    self.restoreContact = restoreContact;
    self.findAddressByCep = findAddressByCep;
    self.createNewContact = createNewContact;
    self.deleteNonMainContact = deleteNonMainContact;
    self.enableSwapMainContactMode = enableSwapMainContactMode;
    self.swapMainContact = swapMainContact;
    self.confirmedDisabledButtomPostalCode = confirmedDisabledButtomPostalCode;


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
      self.addContactMode = {
        phoneNumber: true,
        email: true,
        address: true
      }
      _isNewContact(angular.copy(self.contact));
    }

    function addContactInput() {
      for (let key in self.contact) {
        if (self.contact[key] == null) {
          self.editMode[key] = true;
          self.newContactMode[key] = true;
          self.contact[key] = {value: {}};
          self.addContactMode[self.type] = false;
          break;
        }
      }
    }

    function enableEditMode(position) {
      self.backupContact[position] = angular.copy(self.contact[position]);
      self.addContactMode[self.type] = false;
      self.editMode[position] = true;
    }

    function restoreContact(position) {
      self.contact[position] = angular.copy(self.backupContact[position]);
      self.editMode[position] = false;
      self.addContactMode[self.type] = true;
      delete self.backupContact[position];
    }

    function updateContact(updatedContactItem, position, type) {
      let updateContactDto = ParticipantContactService.createContactDto(self.contactId, position, updatedContactItem);
      DialogShowService.showCustomizedDialog(
        self.dialogData,
        DialogController,
        "app/ux-component/participants-manager/contact/participant-update-contact/participant-update-contact-modal/participant-update-contact-modal-template.html",
        true,
        '$ctrl',
        {},
        false
      ).then(() => {
        ParticipantContactService.dinamicUpdateContact(updateContactDto, type)
          .then(() => self.editMode[position] = false)
          .then(() => ParticipantMessagesService.showToast(ParticipantContactValues.msg.updateSuccess))
          .then(() => ParticipantContactService.isLastContact(self, position, "updateContact"))
          .then(() => self.loadParticipantContact());
      })
    }

    function findAddressByCep(addressContact) {
      ParticipantContactService.getAddressByCep(addressContact.value.postalCode)
        .then(address => {
          if (address.data.erro) ParticipantMessagesService.showToast(ParticipantContactValues.msg.postalCodeNotFound);
          else {
            addressContact.value = {
              postalCode: address.data.cep,
              street: address.data.logradouro,
              neighbourhood: address.data.bairro,
              city: address.data.localidade,
              state: address.data.uf,
              country: ParticipantContactValues.msg.country
            }
          }
        });
    }

    function createNewContact(newContactItem, position, type) {
      let newContactDto = ParticipantContactService.createContactDto(self.contactId, position, newContactItem);

      ParticipantContactService.dinamicNewContactCreate(newContactDto, type)
        .then(() => self.editMode[position] = false)
        .then(() => self.newContactMode[position] = false)
        .then(() => ParticipantMessagesService.showToast(ParticipantContactValues.msg.createSuccess))
        .then(() => ParticipantContactService.isLastContact(self, position, "createNewContact"))
        .then(() => self.loadParticipantContact());
    }

    function deleteNonMainContact(type, position) {
      let deleteContactDto = ParticipantContactService.createPositionContactDto(self.contactId, type, position);
      if (deleteContactDto.position !== "main") {
        try {
          ParticipantContactService.showDeleteDialog()
            .then(() => ParticipantContactService.deleteNonMainContact(deleteContactDto).then(() => self.contact[position] = null)
              .then(() => self.addContactMode[self.type] = true)
              .then(() => self.loadParticipantContact())
              .then(() => ParticipantMessagesService.showToast(ParticipantContactValues.msg.contactDelete)))
            .catch(self.loadParticipantContact())
        } catch (e) {
          ParticipantMessagesService.showToast(ParticipantContactValues.msg.errorContactDelete)
        }
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

    function confirmedDisabledButtomPostalCode(key) {
      if (self.editMode[key]) {
        return (!self.form.address[key].postalCode.$modelValue);
      }
      return true;
    }

    function _isNewContact(contact) {
      if (contact.main.value.content === "" || contact.main.value.street === "") enableEditMode("main");
    }

    function DialogController(
      $scope,
      $mdDialog
    ) {
      var $ctrl = this;
      $ctrl.cancel = cancel;
      $scope.cancel = cancel;
      $scope.hide = hide;

      function hide() {
        $mdDialog.hide();
      }

      function cancel() {
        $mdDialog.cancel();
      }
    }

    function _getDialogButtons() {
      return [
        {
          message: "voltar",
          action: function() {
            $mdDialog.cancel()
          },
          class: "md-raised md-no-focus"
        },
        {
          message: "alterar",
          action: function() {
            $mdDialog.cancel()
          },
          class: "md-raised md-primary"
        },
        {
          message: "corrigir",
          action: function() {
            $mdDialog.cancel()
          },
          class: "md-raised md-primary"
        }
      ]
    }
  }
}());

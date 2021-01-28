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
    'otusjs.application.dialog.DialogShowService',
    'otusjs.participant.business.ParticipantManagerService'
  ];

  function Controller($mdDialog, ParticipantContactValues, ParticipantContactService, ParticipantMessagesService, ParticipantContactAttemptService, DialogShowService, ParticipantManagerService) {
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
    self.confirmedDisabledButtomPostalCode = confirmedDisabledButtomPostalCode;

    // Dialog-related objects
    self.dialogSelection = "corrigir"

    self.dialogData = {
      dialogToTitle: "Alterar ou corrigir o endereço?",
      titleToText: "Alterar ou corrigir o endereço?",
      textDialog: "Alterar ou corrigir o endereço?",
      ariaLabel: "Alterar ou corrigir o endereço?",
      buttons: _getDialogButtons(),
      cancel: $mdDialog.cancel(),
      selection: self.dialogSelection
    }

    /* Lifecycle hooks */
    self.$onInit = onInit;

    /* Public methods */
    function onInit() {
      self.ParticipantContactValues = ParticipantContactValues;
      self.participant = ParticipantManagerService.getSelectedParticipant();
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
      self.oldContact = angular.copy(self.contact);
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
      let updatedDialogData = {
        ...self.dialogData,
        position: position
      }
      if(self.oldContact.main.value.census) {
        DialogShowService.showCustomizedDialog(
          updatedDialogData,
          DialogController,
          "app/ux-component/participants-manager/contact/participant-update-contact/participant-update-contact-modal/participant-update-contact-modal-template.html",
          true,
          '$ctrl',
          {},
          false
        ).then(() => {
          _saveContact(updateContactDto, position, type)
        })
      } else {
        _saveContact(updateContactDto, position, type)
        self.oldContact = angular.copy(self.contact)
      }
    }

    function _saveContact(updateContactDto, position,type) {
      ParticipantContactService.dinamicUpdateContact(updateContactDto, type)
        .then(() => self.editMode[position] = false)
        .then(() => ParticipantMessagesService.showToast(ParticipantContactValues.msg.updateSuccess))
        .then(() => ParticipantContactService.isLastContact(self, position, "updateContact"))
        .then(() => self.loadParticipantContact());
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

    function DialogController($scope, data) {
      var $ctrl = this;
      $ctrl.data = data;
      $scope.cancel = cancel;

      function cancel() {
        $mdDialog.cancel()
      }

      function hide() {
        $mdDialog.hide()
      }

      const translatedPos = {
        "main": () => "Principal",
        "second": () => "Segundo",
        "third": () => "Terceiro",
        "fourth": () => "Quarto",
        "fifth": () => "Quinto"
      }

      $ctrl.buttons = _getDialogButtons({
        position: data.position
      }, cancel, hide)

      $ctrl.translatePosition = function (pos) {
        return translatedPos[pos]();
      }
    }

    function _getDialogButtons(data, cancel, hide) {
      return [
        {
          message: "confirmar",
          action: function(option) {
            // Perform update/change
            if(option === 'alterar') {
              ParticipantContactAttemptService.changeAttemptAddress(
                self.participant.recruitmentNumber,
                self.type,
                data.position
              )
            }

            if(option === 'corrigir') {
              ParticipantContactAttemptService.updateAttemptAddress(
                self.participant.recruitmentNumber,
                self.type,
                data.position,
                self.contact[data.position].value
              )
            }

            // Hide the dialog
            hide()
          },
          class: "md-primary"
        },
        {
          message: "cancelar",
          action: cancel,
          class: "md-no-focus"
        }
      ]
    }
  }
}());

(function () {
  'use strict';

  angular.module('otusjs.otus.uxComponent')
    .component('otusParticipantUpdateContact', {
      controller: 'participantUpdateContactCtrl as $ctrl',
      templateUrl: 'app/ux-component/participants-manager/contact/participant-update-contact/participant-update-contact-template.html',
      bindings: {
        contact: '=',
        type: '@'
      }
    }).controller('participantUpdateContactCtrl', Controller);

  Controller.$inject = ['ParticipantContactValues', '$q', '$http'];

  function Controller(ParticipantContactValues, $q, $http) {
    const self = this;
    self.ParticipantContactValues = ParticipantContactValues;
    self.editMode = {};
    self.editableContact = angular.copy(self.contact);

    self.addContactInput = addContactInput;
    self.enableEditMode = enableEditMode;
    self.updateContact = updateContact;
    self.restoreContact = restoreContact;
    self.findAddressByCep = findAddressByCep;

    function addContactInput() {
      for (let key in self.editableContact) {
        if (self.editableContact[key] === null) {
          self.editableContact[key] = {value: {}}
          break;
        }
      }
    }

    function enableEditMode(type) {
      self.editMode[type] = true;
      console.log(self.editMode)
    }

    function updateContact(updatedContactItem, type) {
      //promisse here!!!
      console.log(updatedContactItem);
      self.editMode[type] = false;
    }

    function restoreContact(type) {
      self.editableContact = angular.copy(self.contact);
      self.editMode[type] = false;
    }

    function findAddressByCep(addressContact) {
      console.log(addressContact);
      _getAddressByCep(addressContact.value.postalCode)
        .then(address => {
          addressContact.value = {
            postalCode: address.data.cep,
            street: address.data.logradouro,
            neighbourhood:address.data.bairro,
            city: address.data.localidade,
            country: address.data.uf
          }
        })
        .catch(err => console.log(e))
    }

    //enviar para service
    function _getAddressByCep(cep) {
      let formatedCep = cep.replace(/\D/g, '');
      let viaCepUrl = `https://viacep.com.br/ws/${formatedCep}/json/`;
      return $http.get(viaCepUrl);
    }
  }
}());
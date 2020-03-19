(function(){
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

  Controller.$inject = ['ParticipantContactValues'];

  function Controller(ParticipantContactValues) {
    const self = this;
    self.ParticipantContactValues = ParticipantContactValues;
    self.editMode = {};


    self.addContactInput = addContactInput;
    self.enableEditMode = enableEditMode;
    self.updateContact = updateContact;

    function addContactInput() {
      for (let key in self.contact){
        if(self.contact[key] === null){
         self.contact[key]= {value: {}}
         break;
        }
      }
    }

    function enableEditMode(type){
      self.editMode[type] = true;
      console.log(self.editMode)
    }

    function updateContact(updatedContactItem, type) {
      //promisse here!!!
      console.log(updatedContactItem);
      self.editMode[type] = false;
    }
  }
}());
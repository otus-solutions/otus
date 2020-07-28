(function () {
  'use strict';

  angular.module('otusjs.otus.uxComponent')
    .component('otusParticipantLoginEmail', {
      controller: 'participantLoginEmailCtrl as $ctrl',
      templateUrl: 'app/ux-component/participants-manager/contact/participant-login-email/participant-login-email-template.html',
      bindings: {
        participant: '=',
      }
    }).controller('participantLoginEmailCtrl', Controller);

  Controller.$inject = [
    'ParticipantContactValues',
    'otusjs.participant.business.ParticipantManagerService',
    'otusjs.participant.business.ParticipantMessagesService',
  ];

  function Controller(ParticipantContactValues, ParticipantManagerService, ParticipantMessagesService) {
    const self = this;

    self.enableEditMode = enableEditMode;
    self.loginEmailConfirmation = loginEmailConfirmation;
    self.cancelEditLoginEmail = cancelEditLoginEmail;
    self.querySearch = querySearch;


    /* Lifecycle hooks */
    self.$onInit = onInit;

    /* Public methods */
    function onInit() {
      self.ParticipantContactValues = ParticipantContactValues;
      self.updatedLoginEmail = angular.copy(self.participant.email);
      self.form = {name: "loginEmailForm"};
      self.editMode = false;
      self.mockEmails = [
        'alexandre.severino@hotmail.com',
        'barbara.silva@bol.com.br',
        'carlos.augusto2020@yahoo.com.br',
        'daniela.suricato@gmail.com',
        'emerson.maclaren@ferrari.com'
      ]
    }

    function enableEditMode() {
      self.editMode = true;
    }

    function loginEmailConfirmation(scenario) {
      ParticipantMessagesService.showLoginEmailDialog(ParticipantContactValues.dialogScene[scenario])
        .then(() => _selectServiceMethodByScenario(scenario))
        .catch(() => {
          cancelEditLoginEmail();
        });
    }

    function _selectServiceMethodByScenario(scenario) {
      switch (scenario) {
        case 'update':
          _updateLoginEmail();
          break;
        case 'delete':
          _removeEmailByParticipantId();
          break;
      }
    }

    function _updateLoginEmail() {
      ParticipantManagerService.updateLoginEmail(self.participant._id, self.updatedLoginEmail)
        //ParticipantManagerService.editLoginEmail("5ea343bdb174c405c9bba6cd", self.updatedLoginEmail)
        .then(() => ParticipantManagerService.updateEmailParticipantSessionStorage(self.participant, self.updatedLoginEmail))
        .then(() => self.editMode = false)
        .catch((e) => alert(e));
    }

    function _removeEmailByParticipantId() {
      ParticipantManagerService.removeEmailByParticipantId(self.participant._id)
        //ParticipantManagerService.removeEmailByParticipantId("5ea343bdb174c405c9bba6cd")
        .then(() => ParticipantManagerService.updateEmailParticipantSessionStorage(self.participant, undefined))
        .then(() => self.updatedLoginEmail = undefined)
        .then(() => self.editMode = false)
        .catch((e) => alert(e));
    }

    function cancelEditLoginEmail() {
      self.updatedLoginEmail = angular.copy(self.participant.email);
      self.editMode = false;
    }

    //Suggestive implementation of material design for autocompleteInput behavior(loginEmail)
    function querySearch(query){
      let result = query ? self.mockEmails.filter(_candidateLoginEmailFilter(query)): self.mockEmails
      return result;
    }

    function _candidateLoginEmailFilter(query){
      let lowercaseQuery = query.toLowerCase().trim();

      return function filterFn(item) {
        return(item.value.indexOf(lowercaseQuery) === 0);
      }
    }
    function selectedItemChange(item){
      self.updatedLoginEmail = item;
    }
  //end


  }

}());
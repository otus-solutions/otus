(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusParticipantAttempt', {
      controller: Controller,
      templateUrl: 'app/ux-component/participant-attempt/participant-attempt-template.html',
    });

  Controller.$inject = [
    '$mdToast',
    'otusjs.participant.repository.ParticipantContactAttemptService',
    'otusjs.participantManager.contact.ParticipantContactService',
    'otusjs.participant.core.EventService',
    'otusjs.application.dialog.DialogShowService'
  ];

  function Controller($mdToast,
                      AttemptService,
                      ParticipantContactService,
                      EventService,
                      DialogService) {
    var self = this;
    /*variables*/
    self.selectedAddress = {};
    self.selectedStatus = "";
    self.statusAddress = {};
    self.addresses = [];
    self.attempts = [];
    self.now = new Date();
    self.attemptDate = new Date();

    /*Methods*/
    self.$onInit = onInit;
    self.getAttempts = getAttempts;
    self.parseToDateWithTime = parseToDateWithTime;
    self.remove = remove;
    self.save = save;

    function onInit() {
      EventService.onParticipantLoaded(_loadSelectedParticipant);
    }

    function save() {
      const attemptStructure = {
        objectType: 'address',
        recruitmentNumber: self.selectedParticipant.recruitmentNumber,
        address: { [self.selectedAddress.pos]: self.selectedAddress.address } ,
        attemptDateTime: self.attemptDate,
        attemptStatus: self.selectedStatus
      }
      if(self.attempts.length < self.addressConfiguration.numberOfAttempts) {
        DialogService.showConfirmationDialog(
          'Confirmar',
          'Deseja salvar as alterações?',
          'Confirmação de finalização')
          .then(() => {
            AttemptService.create(attemptStructure)
              .then(res => {
                getAttempts();
                showToast('Registrado com sucesso!');
              })
              .catch(() => showToast('Ocorreu algum erro, tente novamente'))
          })
      } else {
        showToast('Limite de tentativas por endereço atingido');
      }
    }

    function remove(id) {
      DialogService.showConfirmationDialog(
        'Confirmar',
        'Deseja remover a tentativa selecionada?',
        'Confirmação de remoção')
        .then(res => {
          AttemptService
            .deleteContactAttempt(id)
            .then(() => {
              getAttempts();
              showToast('Tentativa de contato removida');
            })
            .catch(() => showToast('Ocorreu algum erro, tente novamente'))
        })
    }

    function getAttempts() {
      AttemptService
        .findByRnByContactTypeByPosition(self.selectedParticipant.recruitmentNumber, 'address', self.selectedAddress.pos)
        .then(attempts => self.attempts = attempts);
    }

    function _getAddresses(participant) {
      ParticipantContactService
        .getParticipantContactByRecruitmentNumber(participant.recruitmentNumber)
        .then(response => {
          const posLabels = ['main', 'second', 'third', 'fourth', 'fifth']

          posLabels.map((p) => response.address[p] && self.addresses.push({
            census: response.address[p].value.census,
            street: response.address[p].value.street,
            streetNumber: response.address[p].value.streetNumber,
            city: response.address[p].value.city,
            state: response.address[p].value.state,
            country: response.address[p].value.country,
            pos: p
          }))
        })
    }

    function _getAddressStatusList() {
      AttemptService.findAttemptConfigurationByObjectType("AddressMetadata")
        .then(metadataObj => self.addressConfiguration = metadataObj);
    }

    function _loadSelectedParticipant(participant) {
      if (participant) {
        self.selectedParticipant = participant;
        _getAddresses(participant);
        _getAddressStatusList();
      }
    }

    function parseToDateWithTime(dateString) {
      const toDate = new Date(dateString);
      const localDate = toDate.toLocaleDateString();
      return localDate + " " + toDate.getHours() + ":" + toDate.getMinutes() + ':' + toDate.getSeconds();
    }

    function showToast(msg) {
      $mdToast.show(
        $mdToast.simple()
          .textContent(msg)
          .position("right bottom")
          .hideDelay(3000)
      );
    }
  }
}());

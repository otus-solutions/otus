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
    self.statusColor = {
      aceite: () => "#24bd4d",
      arrolado: () => "#d1c324",
      ausente: () => "#e6edec",
      recusa: () => "#bf2102",
      vago: () => "#96e0de"
    }

    /*Methods*/
    self.$onInit = onInit;
    self.getAttempts = getAttempts;
    self.parseToDateWithTime = parseToDateWithTime;
    self.remove = remove;
    self.save = save;
    self.statusColorParser = statusColorParser;

    function onInit() {
      EventService.onParticipantLoaded(_loadSelectedParticipant);
    }

    function statusColorParser(status) {
      return self.statusColor[status.toLowerCase()]()
    }

    function save() {
      const attemptStructure = {
        objectType: 'address',
        recruitmentNumber: self.selectedParticipant.recruitmentNumber,
        address: { [self.selectedAddress.pos]: self.selectedAddress.address } ,
        attemptDateTime: self.attemptDate,
        attemptStatus: self.selectedStatus
      }
      if(self.attempts.length < 3) {
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
        showToast('limite de tentativas por endereço atingido');
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
          self.addresses = [
            {address: response.address.main, pos: 'main', posValue: "principal"},
            {address: response.address.second, pos: 'second', posValue: "segundo"},
            {address: response.address.third, pos: 'third', posValue: "terceiro"},
            {address: response.address.fourth, pos: 'fourth', posValue: "quarto"},
            {address: response.address.fifth, pos: 'fifth', posValue: "quinto"}
          ]
        })
    }

    function _getAddressStatusList() {
      AttemptService.findMetadataAttemptByObjectType("metadata_for_address")
        .then(metadataObj => self.statusAddress = metadataObj);
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
